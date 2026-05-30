import axios from "axios";
import { LeetCodeProfile, QuestionSuggestion } from "../../types/leetcode";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
const RECOMMENDATION_API_BASE = process.env.NEXT_PUBLIC_ML_API_URL || "https://ml-backend-leetcodehelper.onrender.com";

export const fetchProfile = async (username: string): Promise<LeetCodeProfile> => {
  try {
    const res = await axios.get(`${API_BASE}/profile/${username}`);
    return res.data as LeetCodeProfile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`LeetCode profile not found for username "${username}"`);
      } else if (error.response?.status === 500) {
        throw new Error('Server error occurred while fetching profile');
      } else if (error.code === 'NETWORK_ERROR') {
        throw new Error('Network connection failed. Please check your internet connection.');
      }
    }
    throw new Error('Failed to fetch profile data');
  }
};

export const fetchQuestionSuggestions = async (
  username: string, 
  type: 'similar' | 'different'
): Promise<QuestionSuggestion[]> => {
  try {
    const endpoint = type === 'similar'
      ? `${RECOMMENDATION_API_BASE}/recommend/similar?username=${username}`
      : `${RECOMMENDATION_API_BASE}/recommend/diff?username=${username}`;    const response = await axios.get(endpoint);

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Unexpected API response format');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(`No ${type} questions found for user "${username}"`);
      } else if (error.response?.status === 500) {
        throw new Error('Recommendation service temporarily unavailable. Please try again later.');
      } else if (error.code === 'NETWORK_ERROR') {
        throw new Error('Network connection failed. Please check your internet connection.');
      }
    }
    throw new Error(`Failed to fetch ${type} question suggestions`);
  }
};
