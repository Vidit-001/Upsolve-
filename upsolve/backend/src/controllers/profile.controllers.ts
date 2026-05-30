
const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";
console.log("LEETCODE_GRAPHQL:", LEETCODE_GRAPHQL);
const profileQuery = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      realName
      userSlug
      countryName
      company
      school
      ranking
    }
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    submissionCalendar
  }
}
`;

import { Request, Response, NextFunction } from "express";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;

  try {
    const body = {
      operationName: "getUserProfile",
      variables: { username },
      query: profileQuery,
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

    res.json(data.data.matchedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
