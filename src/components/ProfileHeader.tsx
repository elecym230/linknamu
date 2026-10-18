import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 하얀 테두리 + 따뜻한 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-gradient-to-b from-white to-white/40 p-1.5 shadow-[0_18px_40px_-14px_rgba(150,80,40,0.45),0_4px_12px_-4px_rgba(150,80,40,0.18)] dark:from-white/25 dark:to-white/5 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={144}
          height={144}
          priority
          // 외부 이미지(placehold.co는 SVG)는 Next 이미지 최적화를 거치지 않고 그대로 표시
          unoptimized={profile.image.startsWith("http")}
          className="size-32 rounded-full object-cover sm:size-36"
        />
      </div>
      <h1 className="mt-7 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{profile.bio}</p>
    </header>
  );
}
