
import axios from "axios";
import QuestionsClient from "./QuestionsClient";
import { LeetCodeAllProblemsResponse, LeetCodeQuestion } from "../../types/questions";

// Server Component
export default async function QuestionsPage() {
  const res = await axios.get<LeetCodeAllProblemsResponse>("https://leetcode.com/api/problems/all/");
  const data = res.data;

  // Extract the array of questions
  const questions: LeetCodeQuestion[] = data.stat_status_pairs.map((q) => ({
    id: q.stat.frontend_question_id,
    title: q.stat.question__title,
    slug: q.stat.question__title_slug,
    difficulty:
      q.difficulty.level === 1
        ? "Easy"
        : q.difficulty.level === 2
        ? "Medium"
        : "Hard",
    paid_only: q.paid_only,
  }));

  return <QuestionsClient questions={questions} />;
}
