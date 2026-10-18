import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

// wireframe.png 구성: 큰 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pt-16 pb-12">
      <ProfileHeader profile={profile} />

      <ul className="mt-6 flex w-full flex-col gap-6">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
