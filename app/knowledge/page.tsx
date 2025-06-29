'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Users, Calendar, TrendingUp, Star, Eye, Filter, ArrowRight, Award, FileText, GitBranch, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ResearchCategory {
  name: string;
  count: number;
}

interface FeaturedResearch {
  id: string;
  title: string;
  description: string;
  category: string;
  authors: string[];
  institution: string;
  publishDate: string;
  arxivId: string;
  citations: number;
  trending: boolean;
  h_index: number;
  impact_score: number;
  tags: string[];
  summary: string;
}

const researchCategories: ResearchCategory[] = [
  { name: 'All Research', count: 15247 },
  { name: 'Large Language Models', count: 3240 },
  { name: 'Computer Vision', count: 2890 },
  { name: 'Reinforcement Learning', count: 1870 },
  { name: 'Multimodal AI', count: 1560 },
  { name: 'AI Safety & Alignment', count: 1340 },
  { name: 'Robotics', count: 890 },
  { name: 'Quantum ML', count: 450 },
];

const featuredResearch: FeaturedResearch[] = [
  {
    id: '1',
    title: 'GPT-5 Architecture: Breaking the 10 Trillion Parameter Barrier',
    description: 'Revolutionary architecture design enabling 10T+ parameter models with unprecedented efficiency and emergent capabilities.',
    category: 'Large Language Models',
    authors: ['Dr. Sarah Chen', 'Prof. Michael Rodriguez', 'Dr. Alex Kim'],
    institution: 'OpenAI Research',
    publishDate: '2024-01-15',
    arxivId: '2401.15234',
    citations: 2847,
    trending: true,
    h_index: 95,
    impact_score: 9.8,
    tags: ['GPT-5', 'Scaling', 'Architecture', 'Emergent Abilities'],
    summary: 'This paper introduces a novel transformer architecture that enables training of 10+ trillion parameter models with 40% reduced computational cost through sparse attention mechanisms and dynamic parameter allocation.',
  },
  {
    id: '2',
    title: 'Unified Multimodal Foundation Models: Vision, Language, and Beyond',
    description: 'A comprehensive framework for training multimodal models that understand and generate text, images, audio, and video simultaneously.',
    category: 'Multimodal AI',
    authors: ['Dr. Emily Watson', 'Prof. David Liu', 'Dr. Maria Santos'],
    institution: 'Google DeepMind',
    publishDate: '2024-01-12',
    arxivId: '2401.12456',
    citations: 1923,
    trending: true,
    h_index: 87,
    impact_score: 9.5,
    tags: ['Multimodal', 'Foundation Models', 'Vision-Language', 'Unified Architecture'],
    summary: 'We present a unified architecture that processes multiple modalities through shared representations, achieving state-of-the-art performance across 15 benchmarks.',
  },
  {
    id: '3',
    title: 'Constitutional AI: Ensuring Safe and Beneficial AI Systems at Scale',
    description: 'Novel approaches to AI alignment using constitutional learning and reward modeling for large-scale deployment safety.',
    category: 'AI Safety & Alignment',
    authors: ['Dr. James Thompson', 'Dr. Lisa Park', 'Prof. Robert Chen'],
    institution: 'Anthropic',
    publishDate: '2024-01-10',
    arxivId: '2401.10789',
    citations: 3456,
    trending: false,
    h_index: 92,
    impact_score: 9.7,
    tags: ['AI Safety', 'Constitutional AI', 'Alignment', 'Ethics'],
    summary: 'This work demonstrates how constitutional AI methods can be scaled to ensure safe behavior in large language models while maintaining performance.',
  },
  {
    id: '4',
    title: 'Neural Architecture Search for Quantum Machine Learning',
    description: 'Automated discovery of quantum neural network architectures optimized for near-term quantum devices.',
    category: 'Quantum ML',
    authors: ['Dr. Kevin Zhang', 'Prof. Anna Kowalski', 'Dr. Tom Wilson'],
    institution: 'MIT CSAIL',
    publishDate: '2024-01-08',
    arxivId: '2401.08234',
    citations: 567,
    trending: true,
    h_index: 78,
    impact_score: 8.9,
    tags: ['Quantum ML', 'Neural Architecture Search', 'NISQ', 'Optimization'],
    summary: 'We introduce AutoQML, an automated system for discovering quantum neural architectures that outperform classical methods on quantum datasets.',
  },
  {
    id: '5',
    title: 'Real-World Robotics with Foundation Models: From Simulation to Reality',
    description: 'Bridging the sim-to-real gap in robotics using large-scale foundation models trained on diverse embodied data.',
    category: 'Robotics',
    authors: ['Dr. Mark Johnson', 'Prof. Sophie Turner', 'Dr. Raj Patel'],
    institution: 'Stanford AI Lab',
    publishDate: '2024-01-05',
    arxivId: '2401.05678',
    citations: 1234,
    trending: false,
    h_index: 85,
    impact_score: 9.2,
    tags: ['Robotics', 'Foundation Models', 'Sim-to-Real', 'Embodied AI'],
    summary: 'This paper presents RT-X, a robotics foundation model trained on 50M+ robot trajectories, achieving 90%+ success rates on unseen manipulation tasks.',
  },
  {
    id: '6',
    title: 'Emergent Abilities in Large Vision Models: A Comprehensive Analysis',
    description: 'Systematic study of emergent capabilities in vision transformers as model size and training data scale.',
    category: 'Computer Vision',
    authors: ['Dr. Helen Chang', 'Prof. Marcus Brown', 'Dr. Yuki Tanaka'],
    institution: 'Meta AI Research',
    publishDate: '2024-01-03',
    arxivId: '2401.03456',
    citations: 2156,
    trending: false,
    h_index: 89,
    impact_score: 9.4,
    tags: ['Computer Vision', 'Emergent Abilities', 'Vision Transformers', 'Scaling'],
    summary: 'We identify 12 emergent capabilities in large vision models and establish scaling laws that predict when these abilities will manifest.',
  },
];

export default function ResearchHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Research');
  const [sortBy, setSortBy] = useState('trending');

  const filteredResearch = featuredResearch
    .filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All Research' || paper.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'trending') {
        return a.trending === b.trending ? 0 : a.trending ? -1 : 1;
      } else if (sortBy === 'citations') {
        return b.citations - a.citations;
      } else if (sortBy === 'recent') {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      } else if (sortBy === 'impact') {
        return b.impact_score - a.impact_score;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">AI Research Hub</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              The world&apos;s largest collection of AI research papers, breakthroughs, and cutting-edge discoveries. Stay ahead with real-time insights from leading institutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">15,247</div>
                <div className="text-blue-200">Research Papers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">2,156</div>
                <div className="text-blue-200">Leading Researchers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">500+</div>
                <div className="text-blue-200">Institutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24</div>
                <div className="text-blue-200">Papers This Week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search papers, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="trending">Trending</option>
                <option value="citations">Most Cited</option>
                <option value="recent">Most Recent</option>
                <option value="impact">Highest Impact</option>
              </select>
              <Button variant="outline" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Research Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {researchCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.name ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Institutions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Top Institutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">OpenAI</div>
                    <div className="text-sm text-gray-500">1,234 papers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Google DeepMind</div>
                    <div className="text-sm text-gray-500">1,156 papers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Stanford AI Lab</div>
                    <div className="text-sm text-gray-500">987 papers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Research Papers */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredResearch.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Link
                            href={`/knowledge/${paper.id}`}
                            className="text-xl font-bold text-gray-900 hover:text-indigo-600 mr-3"
                          >
                            {paper.title}
                          </Link>
                          {paper.trending && (
                            <Badge className="bg-orange-100 text-orange-700">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <Badge variant="secondary" className="ml-2">{paper.category}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{paper.description}</p>
                        <p className="text-sm text-gray-500 mb-4 italic">{paper.summary}</p>

                        {/* Authors and Institution */}
                        <div className="flex items-center mb-3 text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="mr-4">{paper.authors.join(', ')}</span>
                          <Globe className="w-4 h-4 mr-1" />
                          <span>{paper.institution}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paper.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-2xl font-bold text-indigo-600">{paper.impact_score}</div>
                        <div className="text-sm text-gray-500">Impact Score</div>
                      </div>
                    </div>

                    {/* Paper Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>arXiv:{paper.arxivId}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{paper.citations} citations</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{paper.publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>h-index: {paper.h_index}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link href={`/knowledge/${paper.id}`}>
                        <Button size="sm">
                          Read Paper
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <GitBranch className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">Load More Research</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}