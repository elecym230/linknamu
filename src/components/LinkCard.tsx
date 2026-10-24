import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      // 글래스모피즘: 반투명 흰 배경 + 배경 흐림 + 얇은 밝은 테두리. 호버는 살짝 밝아지고 떠오르는 정도만.
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-16 py-[18px] text-center text-[15px] font-semibold shadow-[0_8px_24px_-12px_rgba(150,80,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_14px_30px_-14px_rgba(150,80,40,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/10"
    >
      {link.title}
      {/* 클릭 수: 제목은 가운데 그대로 두고 오른쪽 끝에 작게 표시 */}
      <span className="absolute inset-y-0 right-6 flex items-center text-xs font-medium tabular-nums text-muted">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
