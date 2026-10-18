// 페이지에 표시할 프로필과 링크 목록입니다.
// TODO: 아래 값은 모두 보여주기용 더미 데이터입니다. 실제 내용으로 바꿔 주세요.

export type LinkItem = {
  id: string; // 클릭 수 집계에 쓰이는 고유 값 (바꾸면 집계가 새로 시작됩니다)
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string; // public/ 기준 경로 또는 외부 URL
};

export const profile: Profile = {
  name: "고덕동불개미",
  bio: "경제적 자유를 누리고 싶은 개미입니다.",
  image: "/profile.jpeg", // 다운로드 폴더의 불개미.jpeg를 public/ 에 복사
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/username" }, // TODO: 실제 주소
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/username" }, // TODO: 실제 주소
  { id: "blog", title: "Blog", url: "https://example.com" }, // TODO: 실제 주소
];
