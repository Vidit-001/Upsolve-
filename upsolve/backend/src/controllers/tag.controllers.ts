
type Problem = {
  titleSlug: string;
  topicTags: string[];
};
// Import as any[] for now, replace with actual data import
const problems: Problem[] = [];
import { Request, Response, NextFunction } from "express";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const userSubmissionsQuery = `
query getUserSubmissions($username: String!) {
  matchedUser(username: $username) {
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    recentAcSubmissionList {
      titleSlug
      timestamp
    }
  }
}
`;

export const getUserTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;

  try {
    // Fetch user's solved problems from LeetCode
    const body = {
      operationName: "getUserSubmissions",
      variables: { username },
      query: userSubmissionsQuery,
    };

    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "LeetProfileFetcher/1.0",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "LeetCode API error", details: await response.text() });
    }

    const data = await response.json();

    if (!data?.data?.matchedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const solvedProblems = data.data.matchedUser.recentAcSubmissionList || [];

  const tagsSolved: { [key: string]: number } = {};
    problems.forEach((p: Problem) => {
      p.topicTags.forEach((t: string) => {
        if (!tagsSolved[t]) tagsSolved[t] = 0;
      });
    });

    // Count tags from solved problems
    solvedProblems.forEach((p: any) => {
      const problem = problems.find((pr: Problem) => pr.titleSlug === p.titleSlug);
      if (problem) {
        problem.topicTags.forEach((t: string) => {
          tagsSolved[t]++;
        });
      }
    });

    res.json({ username, tagsSolved });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error", details: String(err) });
    }
  }
};
