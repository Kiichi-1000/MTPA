/*
  # 診断結果とフィードバックテーブルの作成

  ## 新規テーブル
  
  ### 1. `diagnosis_results` - 診断結果の保存
    - `id` (uuid, primary key) - 診断結果の一意識別子
    - `result_type` (text, not null) - 診断結果のタイプコード（例: SFCP, MBGQ）
    - `answers` (jsonb) - 全ての回答データ（質問ID: 回答レベルのマップ）
    - `scores` (jsonb) - 各軸のスコア（tension, position, distance, workの各スコア）
    - `created_at` (timestamptz, default now()) - 作成日時
  
  ### 2. `feedback` - ユーザーフィードバックの保存
    - `id` (uuid, primary key) - フィードバックの一意識別子
    - `diagnosis_result_id` (uuid, nullable) - 関連する診断結果ID（オプション）
    - `rating` (integer) - 満足度評価（1-5の範囲）
    - `comment` (text, nullable) - コメント
    - `created_at` (timestamptz, default now()) - 作成日時

  ## セキュリティ設定
  
  ### Row Level Security (RLS)
  両テーブルでRLSを有効化します。
  
  ### RLSポリシー
  このアプリは認証なしのパブリックアプリケーションであるため：
  
  #### diagnosis_results
  - SELECT: 統計分析のため誰でも閲覧可能
  - INSERT: 診断結果を記録するため誰でも挿入可能
  - UPDATE/DELETE: セキュリティのため制限
  
  #### feedback
  - SELECT: 統計分析のため誰でも閲覧可能
  - INSERT: フィードバックを記録するため誰でも挿入可能
  - UPDATE/DELETE: セキュリティのため制限
  
  ## 注意事項
  1. 個人を特定できる情報は保存しません
  2. すべてのデータは匿名で収集されます
  3. データは統計分析とサービス改善のみに使用されます
*/

-- diagnosis_resultsテーブルの作成
CREATE TABLE IF NOT EXISTS diagnosis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  result_type text NOT NULL,
  answers jsonb DEFAULT '{}'::jsonb,
  scores jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- feedbackテーブルの作成
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_result_id uuid REFERENCES diagnosis_results(id) ON DELETE SET NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- RLSを有効化
ALTER TABLE diagnosis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- diagnosis_resultsのRLSポリシー
CREATE POLICY "Anyone can view diagnosis results"
  ON diagnosis_results
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert diagnosis results"
  ON diagnosis_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- feedbackのRLSポリシー
CREATE POLICY "Anyone can view feedback"
  ON feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- インデックスの作成（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_result_type ON diagnosis_results(result_type);
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_created_at ON diagnosis_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_diagnosis_result_id ON feedback(diagnosis_result_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
