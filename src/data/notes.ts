export interface NoteMeta {
  slug: string; // e.g. "useful"
  title: string;
  description: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt?: string; // YYYY-MM-DD
}

export const NOTES: NoteMeta[] = [
  {
    slug: 'useful',
    title: '仮面診断結果の有益な利用方法',
    description:
      '仮面診断の結果（4軸×16タイプ）を、自己理解・コミュニケーション・働き方の改善に活かすための具体的な使い方をまとめた実践ガイド。',
    publishedAt: '2025-12-28',
    updatedAt: '2025-12-28',
  },
];


