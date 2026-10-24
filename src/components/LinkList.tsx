"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

// 클릭 시 /api/clicks 로 기록을 보냅니다.
// sendBeacon은 페이지를 떠나는 중에도 요청이 끝까지 전송되도록 보장합니다.
function recordClick(id: string) {
  const body = JSON.stringify({ id });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 보여 줍니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => res.json())
      .then((data: { counts?: Record<string, number> }) => {
        if (data.counts) setCounts(data.counts);
      })
      .catch(() => {}); // 실패하면 0회 그대로 둡니다.
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    recordClick(id);
    // 서버 응답을 기다리지 않고 화면의 숫자를 바로 1 올립니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
