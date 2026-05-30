"use client";

import type { FC, SVGProps } from "react";
import { LeetCodeProfile, SubmissionStat } from "../../types/leetcode"

const SearchIcon: FC<SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const BookIcon: FC<SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>);
const LoadingSpinner = () => ( <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const BriefcaseIcon: FC<SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);
const GraduationCapIcon: FC<SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.66 4 3 10 0v-5"></path></svg>);
const GlobeIcon: FC<SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);

interface Props {
  profileData: LeetCodeProfile;
  onQuestionSuggestion: (type: 'similar' | 'new', username: string) => void;
  similarLoading: boolean;
  differentLoading: boolean;
}

export default function ProfileCard({ profileData, onQuestionSuggestion, similarLoading, differentLoading }: Props) {
  const totalSolved = profileData.submitStats.acSubmissionNum.reduce((acc: number, s: SubmissionStat) => acc + s.count, 0);

  const profileDetails = [
    { Icon: GlobeIcon, label: profileData.profile.countryName },
    { Icon: BriefcaseIcon, label: profileData.profile.company },
    { Icon: GraduationCapIcon, label: profileData.profile.school },
  ];

  return (
    <div className="flex flex-col p-6 h-full relative overflow-hidden">
      {/* Background decorative pattern */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 rounded-full" style={{backgroundColor: '#5BC8AF10'}}></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-12 w-48 h-48 rounded-full" style={{backgroundColor: '#5FB0B710'}}></div>

      <div className="flex flex-col text-center z-10">
        <div className="flex flex-col items-center">
          <div className="relative p-1 rounded-full" style={{background: 'linear-gradient(to top right, #5BC8AF, #5FB0B7)'}}>
            <img
              src={profileData.profile.avatar || profileData.avatar || '/default-avatar.png'}
              alt={profileData.profile.realName}
              className="w-24 h-24 rounded-full border-4 border-gray-800 bg-gray-800"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white">{profileData.profile.realName}</h2>
            <a
              href={`https://leetcode.com/${profileData.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md text-gray-400 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#5BC8AF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              @{profileData.username}
            </a>
          </div>
        </div>
        
        <div className="mt-6 w-full space-y-3 text-left">
          {profileDetails.map(({ Icon, label }, index) =>
            label ? (
              <div key={index} className="flex items-center gap-3 text-gray-300 text-sm bg-gray-700/20 p-2 rounded-lg">
                <Icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ) : null
          )}
        </div>

        <hr className="w-full border-t border-gray-700/50 my-6" />

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-700/20 p-3 rounded-lg">
            <span className="text-3xl font-bold text-white">
              {profileData.profile.ranking && profileData.profile.ranking > 0 ? profileData.profile.ranking.toLocaleString() : "N/A"}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider block">Rank</span>
          </div>
          <div className="bg-gray-700/20 p-3 rounded-lg">
            <span className="text-3xl font-bold text-white">
              {totalSolved.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider block">Total Submissions</span>
          </div>
        </div>

        <div className="mt-auto pt-6 space-y-3">
          <button
            onClick={() => onQuestionSuggestion('similar', profileData.username)}
            disabled={similarLoading || differentLoading}
            className="w-full flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-lg disabled:opacity-50 transition-transform transform hover:scale-105"
            style={{backgroundColor: '#5BC8AF20', color: '#5BC8AF'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5BC8AF30'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5BC8AF20'}
          >
            {similarLoading ? <LoadingSpinner/> : <SearchIcon className="w-4 h-4" />}
            Suggest Similar Problems
          </button>
          <button
            onClick={() => onQuestionSuggestion('new', profileData.username)}
            disabled={similarLoading || differentLoading}
            className="w-full flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-lg disabled:opacity-50 transition-transform transform hover:scale-105"
            style={{backgroundColor: '#6C91BF20', color: '#6C91BF'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6C91BF30'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6C91BF20'}
          >
            {differentLoading ? <LoadingSpinner/> : <BookIcon className="w-4 h-4" />}
            Suggest New Topics
          </button>
        </div>
      </div>
    </div>
  );
}

