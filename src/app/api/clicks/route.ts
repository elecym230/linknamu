import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

const validIds = new Set(links.map((l) => l.id));

// POST /api/clicks  { id: string }  → 해당 링크의 클릭 수를 1 늘립니다.
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해서 임의의 값이 DB에 쌓이지 않게 합니다.
  if (typeof id !== "string" || !validIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    return Response.json({ ok: false, reason: "MONGODB_URI 미설정" }, { status: 503 });
  }

  try {
    const client = await clientPromise;
    await client
      .db(process.env.MONGODB_DB ?? "linknamu")
      .collection<{ _id: string; count: number }>("clicks")
      .updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
