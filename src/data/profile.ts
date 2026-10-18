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
  name: "김클로", // TODO: 실제 이름
  bio: "세계 최강 바이브코더", // TODO: 실제 한 줄 소개
  image: "/profile.svg", // TODO: 실제 사진을 public/ 에 넣고 경로 변경
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/username" }, // TODO: 실제 주소
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/username" }, // TODO: 실제 주소
  { id: "blog", title: "Blog", url: "https://example.com" }, // TODO: 실제 주소
];
