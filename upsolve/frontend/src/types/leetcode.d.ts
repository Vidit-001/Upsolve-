export interface SubmissionStat {
  difficulty: string;
  count: number;
  submissions: number;
}

export interface QuestionSuggestion {
  id: number;
  problem_name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string;
  similarity?: number;
}

export interface LeetCodeProfile {
  username: string;
  avatar?: string | null;
  profile: {
    realName: string;
    userSlug: string;
    avatar?: string | null;
    countryName?: string | null;
    company?: string | null;
    school?: string | null;
    ranking?: number | null;
  };
  submitStats: {
    acSubmissionNum: SubmissionStat[];
    totalSubmissionNum: SubmissionStat[];
  };
  submissionCalendar: string;
}
