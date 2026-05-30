const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const recentSubmissionsQuery = `
query getRecentSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    timestamp
    lang
    statusDisplay
  }
}
`;

const problemNumberQuery = `
query getProblemDetails($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    title
    titleSlug
    questionFrontendId
  }
}
`;

import { Request, Response, NextFunction } from "express";

export const getRecentSubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  const limit = req.query.limit ? parseInt(String(req.query.limit)) : 50;

  try {
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "LeetProfileFetcher/1.0",
      },
      body: JSON.stringify({
        operationName: "getRecentSubmissions",
        variables: { username, limit },
        query: recentSubmissionsQuery,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "LeetCode API error" });
    }

    const data = await response.json();
    const submissions = data.data.recentAcSubmissionList || [];

    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ New function: fetch problem numbers
export const getRecentProblemNumbers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  const limit = req.query.limit ? parseInt(String(req.query.limit)) : 20;

  try {
    // Step 1: Get recent submissions
    const submissionRes = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "LeetProfileFetcher/1.0",
      },
      body: JSON.stringify({
        operationName: "getRecentSubmissions",
        variables: { username, limit },
        query: recentSubmissionsQuery,
      }),
    });

    const submissionData = await submissionRes.json();
    const submissions = submissionData.data.recentAcSubmissionList || [];
    const titleSlugs = submissions.map((s: any) => s.titleSlug);

    if (titleSlugs.length === 0) {
      return res.json([]);
    }

    // Step 2: Fetch problem details for each titleSlug individually
    const problems = [];
    
    for (const titleSlug of titleSlugs) {
      try {
        const numberRes = await fetch(LEETCODE_GRAPHQL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
            "User-Agent": "LeetProfileFetcher/1.0",
          },
          body: JSON.stringify({
            operationName: "getProblemDetails",
            variables: { titleSlug },
            query: problemNumberQuery,
          }),
        });

        const numberData = await numberRes.json();
        
        // Add error handling for GraphQL response
        if (numberData.data && numberData.data.question) {
          problems.push(numberData.data.question.questionFrontendId);
        } else {
          console.log(`Failed to fetch details for ${titleSlug}:`, numberData);
        }
      } catch (error) {
        console.log(`Error fetching details for ${titleSlug}:`, error);
      }
    }

    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
