import { supabase } from './supabase';
import { MaskTypeCode, Answers, Scores } from '../types/diagnosis';

export interface DiagnosisResult {
  id: string;
  result_type: MaskTypeCode;
  answers: Answers;
  scores: Scores;
  created_at: string;
}

export interface Feedback {
  id: string;
  diagnosis_result_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

export async function saveDiagnosisResult(
  resultType: MaskTypeCode,
  answers: Answers,
  scores: Scores
): Promise<{ data: DiagnosisResult | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('diagnosis_results')
      .insert({
        result_type: resultType,
        answers,
        scores,
      })
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function saveFeedback(
  rating: number,
  comment: string | null,
  diagnosisResultId: string | null = null
): Promise<{ data: Feedback | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        diagnosis_result_id: diagnosisResultId,
        rating,
        comment,
      })
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function getResultTypeStats(): Promise<{
  data: Record<string, number> | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from('diagnosis_results')
      .select('result_type');

    if (error) {
      throw error;
    }

    const stats: Record<string, number> = {};
    data?.forEach((result) => {
      const type = result.result_type;
      stats[type] = (stats[type] || 0) + 1;
    });

    return { data: stats, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
