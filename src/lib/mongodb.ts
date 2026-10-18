import { MongoClient } from "mongodb";

// 개발 중 핫 리로드마다 새 연결이 생기지 않도록 전역에 한 번만 만들어 재사용합니다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null; // 환경변수가 없으면 클릭 집계만 건너뜁니다.

  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo.mongoClientPromise;
}
