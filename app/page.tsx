import Link from "next/link";
import { Brain, Rocket, Building2, ArrowRight, Zap, Shield, Globe, Code, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmNDEiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Floating Logo */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-blue-500/50">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            The Future of AI
            <br />
            <span className="text-4xl md:text-6xl">is Here</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Enterprise-grade AI APIs, cutting-edge research, and the world's largest AI startup ecosystem.
            <br />
            <span className="text-cyan-400 font-semibold">Join 100K+ developers building the future.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/ai-tools" className="group px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25">
              <span className="flex items-center">
                Explore AI APIs
                <Rocket className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/ai-hub" className="px-12 py-4 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105">
              Browse AI Startups
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400">500+</div>
              <div className="text-gray-400">AI APIs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">10K+</div>
              <div className="text-gray-400">AI Startups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">1M+</div>
              <div className="text-gray-400">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">100K+</div>
              <div className="text-gray-400">Developers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Four Pillars of AI Innovation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI APIs */}
            <Link href="/ai-tools" className="group">
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI APIs</h3>
                <p className="text-gray-300 mb-6">Production-ready APIs for NLP, Computer Vision, and Machine Learning</p>
                <div className="flex items-center text-blue-400 font-semibold">
                  Explore APIs
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* AI Projects */}
            <Link href="/ai-projects" className="group">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Projects</h3>
                <p className="text-gray-300 mb-6">Open source AI projects and collaborative development platform</p>
                <div className="flex items-center text-purple-400 font-semibold">
                  Browse Projects
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Research Hub */}
            <Link href="/knowledge" className="group">
              <div className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Research Hub</h3>
                <p className="text-gray-300 mb-6">Latest AI research, papers, and breakthrough discoveries</p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  Read Research
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* AI Startups */}
            <Link href="/ai-hub" className="group">
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Startups</h3>
                <p className="text-gray-300 mb-6">Discover and invest in the next generation of AI companies</p>
                <div className="flex items-center text-green-400 font-semibold">
                  Explore Startups
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Built for Scale
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade infrastructure powering the world's most innovative AI applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">99.9% Uptime</h3>
              <p className="text-gray-300">Enterprise SLA with global CDN and redundancy</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">SOC 2 Compliant</h3>
              <p className="text-gray-300">Bank-grade security and data protection</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Scale</h3>
              <p className="text-gray-300">Deployed across 15+ regions worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the AI revolution. Start building with our APIs today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth" className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25">
              Start Building Now
            </Link>
            <Link href="/community" className="px-12 py-4 border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white font-bold text-lg rounded-2xl transition-all duration-300">
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}