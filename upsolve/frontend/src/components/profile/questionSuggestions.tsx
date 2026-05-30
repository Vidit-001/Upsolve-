"use client";

import { QuestionSuggestion } from "../../types/leetcode";
import jsPDF from 'jspdf';

const generateLeetCodeURL = (problemName: string): string => {
  const slug = problemName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `https://leetcode.com/problems/${slug}/`;
};

interface Props {
  suggestions: QuestionSuggestion[];
  type: 'similar' | 'different';
  onClose: () => void;
}
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-300 bg-green-900/50 border-green-500/30';
    case 'Medium':
      return 'text-yellow-300 bg-yellow-900/50 border-yellow-500/30';
    case 'Hard':
      return 'text-red-300 bg-red-900/50 border-red-500/30';
    default:
      return 'text-gray-300 bg-gray-700/50 border-gray-500/30';
  }
};

const generatePDF = (suggestions: QuestionSuggestion[], type: string) => {
  const doc = new jsPDF();
  
  // Set title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const title = type === 'similar' ? 'Similar Questions' : 'Challenge Questions';
  doc.text(title, 20, 30);
  
  // Set subtitle
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const subtitle = type === 'similar' 
    ? 'Personalized suggestions based on your solving patterns'
    : 'New challenges to expand your skills and knowledge';
  doc.text(subtitle, 20, 40);
  
  // Add generation date
  doc.setFontSize(10);
  doc.text(`Created on: ${new Date().toLocaleDateString()}`, 20, 50);
  
  let yPosition = 70;
  
  suggestions.forEach((question, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Question number and name
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${question.id}. ${question.problem_name}`, 20, yPosition);
    yPosition += 10;
    
    // Difficulty
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Difficulty: ${question.difficulty}`, 20, yPosition);
    yPosition += 8;
    
    // Similarity (if available)
    if (question.similarity) {
      doc.text(`Similarity: ${(question.similarity * 100).toFixed(1)}%`, 20, yPosition);
      yPosition += 8;
    }
    
    // Topics
    doc.text(`Topics: ${question.topics}`, 20, yPosition);
    yPosition += 8;
    
    // LeetCode URL
    const url = generateLeetCodeURL(question.problem_name);
    doc.text(`URL: ${url}`, 20, yPosition);
    yPosition += 15;
    
    // Add separator line
    if (index < suggestions.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 10;
    }
  });
  
  // Save the PDF
  const filename = `leetcode-${type}-questions-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};

export default function QuestionSuggestions({ suggestions, type, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-black/30">
        {/* Header */}
        <div className="bg-gray-800/60 border-b border-gray-700/50 text-white p-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-100">
                {type === 'similar' ? 'Similar Questions' : 'Challenge Questions'}
              </h2>
              <p className="text-gray-400 mt-1">
                {type === 'similar' 
                  ? 'Personalized suggestions based on your solving patterns.'
                  : 'New challenges to expand your skills and knowledge.'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              {suggestions && suggestions.length > 0 && (
                <button
                  onClick={() => generatePDF(suggestions, type)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  title="Download as PDF"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="space-y-4">
            {suggestions && Array.isArray(suggestions) && suggestions.length > 0 ? suggestions.map((question) => (
              <div
                key={question.id}
                className="border border-gray-700/80 rounded-lg p-4 hover:bg-gray-800/70 hover:border-blue-500/50 transition-all duration-200 bg-gray-800/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      {question.similarity && (
                        <span className="text-sm text-cyan-400 font-mono">
                          {(question.similarity * 100).toFixed(1)}% similar
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-100 mb-3">
                      {question.id}. {question.problem_name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {question.topics.split(', ').map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="px-2 py-1 bg-sky-900/60 text-sky-300 text-xs font-medium rounded-md border border-sky-500/30"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href={generateLeetCodeURL(question.problem_name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0"
                  >
                    <span>Solve</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No Suggestions</h3>
                <p className="mt-1 text-sm text-gray-500">Suggestions could not be retrieved at this time.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700/50 p-4 bg-gray-900/80">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-gray-200">{suggestions?.length || 0}</span> questions suggested
            </p>
            <div className="flex items-center gap-3">
              {suggestions && suggestions.length > 0 && (
                <button
                  onClick={() => generatePDF(suggestions, type)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}