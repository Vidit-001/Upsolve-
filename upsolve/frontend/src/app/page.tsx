"use client";

import { useState } from "react";
import type { FC, SVGProps } from "react";
import Link from "next/link";

const CodeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16,18 22,12 16,6"></polyline>
    <polyline points="8,6 2,12 8,18"></polyline>
  </svg>
);
const UserIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const UsersIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const TrendingUpIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
    <polyline points="17,6 23,6 23,12"></polyline>
  </svg>
);
const TargetIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

export default function HomePage() {
  const [showContactModal, setShowContactModal] = useState(false);

  const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/50 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold text-white">Upsolve</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-green-400 transition-colors">How it Works</a>
              <Link href="/profile" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
            <section className="relative py-20 flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{backgroundColor: '#5BC8AF20', color: '#5BC8AF', borderColor: '#5BC8AF50'}}>
              <TargetIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Achieve Your Goals</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Master Your
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #5BC8AF, #5FB0B7)'}}> Coding Journey</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Analyze your coding progress, compare with peers, and get personalized suggestions to conquer your next coding interview with Upsolve.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/profile" className="group text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg" style={{background: 'linear-gradient(to right, #5BC8AF, #5FB0B7)', boxShadow: '0 10px 25px #5BC8AF40'}}>
              <span className="flex items-center justify-center gap-2">
                Start Analyzing
                <TrendingUpIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800/50 transition-colors" onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5BC8AF80'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6b7280'}>
              Watch Demo
            </button>
          </div>


        </div>
      </section>

      <section id="features" className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features, Simplified</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to analyze, improve, and excel at competitive programming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center group transition-all duration-300 hover:-translate-y-2 border-gray-700 hover:border-[#5BC8AF80]">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(to bottom right, #5BC8AF, #5FB0B7)'}}>
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">In-Depth Profile Analysis</h3>
              <p className="text-gray-400">
                Get deep insights into your performance with detailed statistics, submission heatmaps, and progress tracking.
              </p>
            </GlassCard>
            <GlassCard className="p-8 text-center group transition-all duration-300 hover:-translate-y-2 border-gray-700 hover:border-[#6C91BF80]">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(to bottom right, #6C91BF, #5FB0B7)'}}>
                <TargetIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Recommendations</h3>
              <p className="text-gray-400">
                Get personalized problem recommendations based on your solving patterns and performance history.
              </p>
            </GlassCard>
            <GlassCard className="p-8 text-center group transition-all duration-300 hover:-translate-y-2 border-gray-700 hover:border-[#A14EBF80]">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(to bottom right, #A14EBF, #6C91BF)'}}>
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Peer-to-Peer Comparison</h3>
              <p className="text-gray-400">
                Compare your progress with friends or other developers to identify strengths and areas for improvement.
              </p>
            </GlassCard>
            
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started in Seconds</h2>
            <p className="text-xl text-gray-400">Simple steps to supercharge your coding journey.</p>
          </div>

          <div className="relative">
            {/* Dashed line connector for desktop */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-1 border-t-2 border-dashed border-gray-700"></div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 border-2 rounded-full flex items-center justify-center mx-auto mb-6" style={{borderColor: '#5BC8AF80', boxShadow: '0 0 20px #5BC8AF30'}}>
                  <span className="text-2xl font-bold" style={{color: '#5BC8AF'}}>1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Enter Username</h3>
                <p className="text-gray-400">
                  Simply enter your coding username to start analyzing your profile and performance metrics.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 border-2 rounded-full flex items-center justify-center mx-auto mb-6" style={{borderColor: '#6C91BF80', boxShadow: '0 0 20px #6C91BF30'}}>
                  <span className="text-2xl font-bold" style={{color: '#6C91BF'}}>2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Visualize Your Data</h3>
                <p className="text-gray-400">
                  Receive detailed insights about your solving patterns, strengths, and areas for improvement.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 border-2 rounded-full flex items-center justify-center mx-auto mb-6" style={{borderColor: '#A14EBF80', boxShadow: '0 0 20px #A14EBF30'}}>
                  <span className="text-2xl font-bold" style={{color: '#A14EBF'}}>3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Accelerate Growth</h3>
                <p className="text-gray-400">
                  Use personalized suggestions to practice targeted problems and level up your coding skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <CodeIcon className="w-8 h-8" style={{color: '#5BC8AF'}} />
              <span className="text-xl font-bold text-white">Upsolve</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 Upsolve. Built with ❤️ for the coding community.
            </p>
          </div>
        </div>
      </footer>
      {showContactModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-black/30">
            <div className="bg-gray-800/60 border-b border-gray-700/50 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-100">Contact Us</h2>
                  <p className="text-gray-400 mt-1">Meet the team behind Upsolve</p>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/40 border border-gray-700/80 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">PR</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Priyanshu Raj</h3>
                    <p className="text-gray-400 mb-4">Co-Founder & Developer</p>
                    
                    <div className="space-y-3">
                      <a
                        href="https://www.linkedin.com/in/priyanshu-raj-iiitn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      
                      <a
                        href="https://github.com/priyanshuraj27"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/40 border border-gray-700/80 rounded-lg p-6 hover:bg-gray-800/60 transition-all duration-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">TT</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Tanmay Tiwari</h3>
                    <p className="text-gray-400 mb-4">Co-Founder & Developer</p>
                    
                    <div className="space-y-3">
                      <a
                        href="https://www.linkedin.com/in/tanmay-tiwari-30b1212a6/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      
                      <a
                        href="https://github.com/TanmayTiwarii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Feel free to reach out to us for any questions, suggestions, or collaborations!
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700/50 p-4 bg-gray-900/80">
              <div className="flex justify-center">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}