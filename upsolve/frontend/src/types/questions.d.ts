// LeetCode API response types
export interface LeetCodeQuestion {
  id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  paid_only: boolean;
}

export interface LeetCodeStatStatusPair {
  stat: {
    frontend_question_id: number;
    question__title: string;
    question__title_slug: string;
  };
  difficulty: {
    level: number;
  };
  paid_only: boolean;
}

export interface LeetCodeAllProblemsResponse {
  stat_status_pairs: LeetCodeStatStatusPair[];
}