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
      // 글래스모피즘: 반투명 흰 배경 + 배경 흐림 + 얇은 밝은 테두리. 호버는 살짝 밝아지고 떠오르는 정도만.
      className="block w-full rounded-3xl border border-white/70 bg-white/45 px-6 py-[18px] text-center text-[15px] font-semibold shadow-[0_8px_24px_-12px_rgba(150,80,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_14px_30px_-14px_rgba(150,80,40,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/10"
    >
      {link.title}
    </a>
  );
}
