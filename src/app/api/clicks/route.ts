import { connection } from "next/server";
import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number };

const validIds = new Set(links.map((l) => l.id));

async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB ?? "linknamu").collection<ClickDoc>("clicks");
}

// GET /api/clicks → { counts: { github: 42, ... } }  등록된 모든 링크의 클릭 수를 한 번에 돌려줍니다.
export async function GET() {
  // 빌드 때 미리 만들어 두지 않고, 요청이 올 때마다 최신 값을 읽게 합니다.
  await connection();

  const counts: Record<string, number> = Object.fromEntries(links.map((l) => [l.id, 0]));

  try {
    const clicks = await getClicksCollection();
    if (!clicks) {
      return Response.json({ counts, reason: "MONGODB_URI 미설정" }, { status: 503 });
    }
    const docs = await clicks.find({ _id: { $in: [...validIds] } }).toArray();
    for (const doc of docs) counts[doc._id] = doc.count;
    return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ counts }, { status: 500 });
  }
}

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

  try {
    const clicks = await getClicksCollection();
    if (!clicks) {
      return Response.json({ ok: false, reason: "MONGODB_URI 미설정" }, { status: 503 });
    }
    await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
