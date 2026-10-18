"use client";

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

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="block w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-emerald-400"
    >
      {link.title}
    </a>
  );
}
