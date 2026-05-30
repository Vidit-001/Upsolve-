"use client";

import { useState } from "react";
import { fetchProfile, fetchQuestionSuggestions } from "../../lib/api/leetcodeApi";
import { LeetCodeProfile, QuestionSuggestion } from "../../types/leetcode";
import ProfileCard from "../../components/profile/profileCard";
import SubmissionStats from "../../components/profile/submissionStats";
import SubmissionHeatmap from "../../components/profile/submissionHeatmaps";
import ComparisonSummary from "../../components/profile/comparisonSummary";
import QuestionSuggestions from "../../components/profile/questionSuggestions";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// A reusable card component for the dark theme
const DarkCard = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6">
        {children}
    </div>
);


export default function ProfilePage() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [profile1, setProfile1] = useState<LeetCodeProfile | null>(null);
  const [profile2, setProfile2] = useState<LeetCodeProfile | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Question suggestion states
  const [suggestions, setSuggestions] = useState<QuestionSuggestion[]>([]);
  const [loadingStates, setLoadingStates] = useState<{
    [username: string]: {
      similar: boolean;
      different: boolean;
    }
  }>({});
  const [suggestionsModalOpen, setSuggestionsModalOpen] = useState(false);
  const [suggestionType, setSuggestionType] = useState<'similar' | 'different'>('similar');

  const handleFetchUser1 = async () => {
    if (!username1) return;
    setLoading1(true);
    setProfile1(null);
    setProfile2(null);
    setUsername2("");
    setError(null);
    try {
      const data1 = await fetchProfile(username1);
      setProfile1(data1);
    } catch (err) {
      setError(`Could not find a LeetCode profile for "${username1}". Please check the username and try again.`);
      setProfile1(null);
    } finally {
      setLoading1(false);
    }
  };
  
  const handleFetchUser2 = async () => {
      if (!username2 || !profile1) return;
      setLoading2(true);
      setProfile2(null);
      setError(null);
      try {
          const data2 = await fetchProfile(username2);
          setProfile2(data2);
      } catch (err) {
          setError(`Could not find a LeetCode profile for "${username2}". Please check the username and try again.`);
          setProfile2(null);
      } finally {
          setLoading2(false);
      }
  };

  const handleReset = () => {
    setProfile1(null);
    setProfile2(null);
    setUsername1("");
    setUsername2("");
    setError(null);
    setSuggestions([]);
    setSuggestionsModalOpen(false);
  };

  const handleQuestionSuggestion = async (type: 'similar' | 'new', username: string) => {
    const loadingType = type === 'similar' ? 'similar' : 'different';
    
    // Set loading state for this specific user and button type
    setLoadingStates(prev => ({
      ...prev,
      [username]: {
        ...prev[username],
        [loadingType]: true
      }
    }));
    
    setSuggestionType(type === 'similar' ? 'similar' : 'different');
    setError(null);
    
    try {
      const apiType = type === 'similar' ? 'similar' : 'different';
      const suggestedQuestions = await fetchQuestionSuggestions(username, apiType);
      setSuggestions(suggestedQuestions);
      setSuggestionsModalOpen(true);
    } catch (err) {
      console.error('Error fetching question suggestions:', err);
      setError(`Failed to fetch question suggestions. Please try again later.`);
    } finally {
      // Clear loading state for this specific user and button type
      setLoadingStates(prev => ({
        ...prev,
        [username]: {
          ...prev[username],
          [loadingType]: false
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            LeetCode Profile Analyzer
          </h1>
          <p className="text-lg text-gray-400">
            Analyze your performance or compare with another developer.
          </p>
        </div>

        {!profile1 && (
          <div className="max-w-xl mx-auto bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6 md:p-8">
            <label htmlFor="username1" className="block text-sm font-medium text-gray-300 mb-2">
              LeetCode Username
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="username1"
                type="text"
                placeholder="Enter a LeetCode username..."
                value={username1}
                onChange={(e) => setUsername1(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                onKeyPress={(e) => e.key === "Enter" && handleFetchUser1()}
              />
              <button
                onClick={handleFetchUser1}
                disabled={loading1 || !username1}
                className="w-full sm:w-auto flex justify-center items-center bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                {loading1 ? <LoadingSpinner /> : 'Analyze'}
              </button>
            </div>
          </div>
        )}
        
        {error && (
            <div className="max-w-xl mx-auto mt-4 text-center p-4 bg-red-900/50 text-red-400 border border-red-500/30 rounded-lg">
                {error}
            </div>
        )}

        {profile1 && (
          <div className="space-y-8">
            {profile2 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* User 1 Column */}
                  <div className="space-y-6">
                    <DarkCard>
                      <ProfileCard 
                        profileData={profile1} 
                        onQuestionSuggestion={handleQuestionSuggestion}
                        similarLoading={loadingStates[profile1.username]?.similar || false}
                        differentLoading={loadingStates[profile1.username]?.different || false}
                      />
                    </DarkCard>
                    <DarkCard><SubmissionStats profileData={profile1} /></DarkCard>
                    <DarkCard><SubmissionHeatmap profileData={profile1} /></DarkCard>
                  </div>
                  {/* User 2 Column */}
                  <div className="space-y-6">
                     <DarkCard>
                       <ProfileCard 
                         profileData={profile2} 
                         onQuestionSuggestion={handleQuestionSuggestion}
                         similarLoading={loadingStates[profile2.username]?.similar || false}
                         differentLoading={loadingStates[profile2.username]?.different || false}
                       />
                     </DarkCard>
                     <DarkCard><SubmissionStats profileData={profile2} /></DarkCard>
                     <DarkCard><SubmissionHeatmap profileData={profile2} /></DarkCard>
                  </div>
                </div>
                <DarkCard>
                    <ComparisonSummary profile1={profile1} profile2={profile2} />
                </DarkCard>
              </div>
            ) : (
              <div className="space-y-8">
                <DarkCard>
                  <ProfileCard 
                    profileData={profile1} 
                    onQuestionSuggestion={handleQuestionSuggestion}
                    similarLoading={loadingStates[profile1.username]?.similar || false}
                    differentLoading={loadingStates[profile1.username]?.different || false}
                  />
                </DarkCard>
                <DarkCard><SubmissionStats profileData={profile1} /></DarkCard>
                <DarkCard><SubmissionHeatmap profileData={profile1} /></DarkCard>

                {/* Compare Input Section */}
                <div className="max-w-xl mx-auto bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-t-green-500">
                    <h3 className="text-xl font-semibold text-white mb-4">Compare with another user</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Enter another username..."
                            value={username2}
                            onChange={(e) => setUsername2(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            onKeyPress={(e) => e.key === 'Enter' && handleFetchUser2()}
                        />
                        <button
                            onClick={handleFetchUser2}
                            disabled={loading2 || !username2}
                            className="w-full sm:w-auto flex justify-center items-center bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors shadow-md"
                        >
                            {loading2 ? <LoadingSpinner /> : 'Compare'}
                        </button>
                    </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center pt-4">
                <button 
                    onClick={handleReset}
                    className="text-gray-400 hover:text-white font-semibold transition-colors"
                >
                    Start New Analysis
                </button>
            </div>
          </div>
        )}

        {!profile1 && !loading1 && !error && (
          <div className="text-center pt-16">
            <SearchIcon className="mx-auto h-16 w-16 text-gray-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-200">Ready to Analyze</h3>
            <p className="mt-1 text-gray-500">
              Enter a LeetCode username above to view detailed profile statistics.
            </p>
          </div>
        )}
      </div>

      {/* Question Suggestions Modal */}
      {suggestionsModalOpen && (
        <QuestionSuggestions
          suggestions={suggestions}
          type={suggestionType}
          onClose={() => setSuggestionsModalOpen(false)}
        />
      )}
    </div>
  );
}