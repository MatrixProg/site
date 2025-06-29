
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Calendar, Award, BookOpen, Users, Globe, Twitter, Linkedin, Github, ExternalLink, TrendingUp, Star } from 'lucide-react'

const personalities = [
  {
    id: 1,
    name: 'Geoffrey Hinton',
    title: 'Godfather of Deep Learning',
    company: 'Google (Former)',
    location: 'Toronto, Canada',
    bio: 'British-Canadian cognitive psychologist and computer scientist, most noted for his work on artificial neural networks.',
    avatar: '/placeholder-avatar.jpg',
    achievements: [
      'Turing Award Winner (2018)',
      'Fellow of the Royal Society',
      'Backpropagation Algorithm Pioneer',
      'Co-founder of Deep Learning Revolution'
    ],
    specialties: ['Deep Learning', 'Neural Networks', 'Backpropagation', 'Computer Vision'],
    papers: 156,
    citations: 189000,
    hIndex: 98,
    followers: 45000,
    socialLinks: {
      twitter: '@geoffreyhinton',
      linkedin: 'geoffrey-hinton',
      scholar: 'geoffrey-hinton'
    },
    recentWork: 'Forward-Forward Algorithm for Training Neural Networks',
    founded: 2012,
    trending: true
  },
  {
    id: 2,
    name: 'Yann LeCun',
    title: 'Chief AI Scientist',
    company: 'Meta AI',
    location: 'New York, USA',
    bio: 'French computer scientist working primarily in machine learning, computer vision, mobile robotics and computational neuroscience.',
    avatar: '/placeholder-avatar.jpg',
    achievements: [
      'Turing Award Winner (2018)',
      'Convolutional Neural Networks Pioneer',
      'VP & Chief AI Scientist at Meta',
      'NYU Professor'
    ],
    specialties: ['Convolutional Neural Networks', 'Computer Vision', 'Self-Supervised Learning', 'Energy-Based Models'],
    papers: 198,
    citations: 156000,
    hIndex: 94,
    followers: 67000,
    socialLinks: {
      twitter: '@ylecun',
      linkedin: 'yann-lecun',
      scholar: 'yann-lecun'
    },
    recentWork: 'Self-Supervised Learning and Joint Embedding Predictive Architecture',
    founded: 2013,
    trending: true
  },
  {
    id: 3,
    name: 'Yoshua Bengio',
    title: 'Co-founder of Deep Learning',
    company: 'Mila - Quebec AI Institute',
    location: 'Montreal, Canada',
    bio: 'Canadian computer scientist, most noted for his work on artificial neural networks and deep learning.',
    avatar: '/placeholder-avatar.jpg',
    achievements: [
      'Turing Award Winner (2018)',
      'Founder of Mila',
      'Deep Learning Textbook Co-author',
      'Order of Canada Recipient'
    ],
    specialties: ['Deep Learning', 'Natural Language Processing', 'Generative Models', 'AI Safety'],
    papers: 234,
    citations: 178000,
    hIndex: 101,
    followers: 38000,
    socialLinks: {
      twitter: '@yoshuabengio',
      linkedin: 'yoshua-bengio',
      scholar: 'yoshua-bengio'
    },
    recentWork: 'GFlowNets and AI for Climate Change',
    founded: 2017,
    trending: false
  },
  {
    id: 4,
    name: 'Fei-Fei Li',
    title: 'Professor of Computer Science',
    company: 'Stanford University',
    location: 'Stanford, USA',
    bio: 'Chinese-American computer scientist specializing in computer vision and artificial intelligence.',
    avatar: '/placeholder-avatar.jpg',
    achievements: [
      'ImageNet Creator',
      'Former Chief Scientist at Google Cloud',
      'Co-Director of Stanford HAI',
      'MacArthur Fellow Nominee'
    ],
    specialties: ['Computer Vision', 'ImageNet', 'Human-Centered AI', 'AI Ethics'],
    papers: 187,
    citations: 134000,
    hIndex: 87,
    followers: 52000,
    socialLinks: {
      twitter: '@drfeifei',
      linkedin: 'fei-fei-li',
      scholar: 'fei-fei-li'
    },
    recentWork: 'Human-Centered AI and AI for Social Good',
    founded: 2009,
    trending: false
  },
  {
    id: 5,
    name: 'Demis Hassabis',
    title: 'CEO & Co-founder',
    company: 'DeepMind',
    location: 'London, UK',
    bio: 'British artificial intelligence researcher and entrepreneur, co-founder and CEO of DeepMind.',
    avatar: '/placeholder-avatar.jpg',
    achievements: [
      'DeepMind Co-founder',
      'AlphaGo Creator',
      'Chess Prodigy',
      'CBE for Services to Science and Technology'
    ],
    specialties: ['Reinforcement Learning', 'Game AI', 'AlphaGo', 'Protein Folding'],
    papers: 89,
    citations: 67000,
    hIndex: 65,
    followers: 78000,
    socialLinks: {
      twitter: '@demishassabis',
      linkedin: 'demis-hassabis',
      scholar: 'demis-hassabis'
    },
    recentWork: 'AlphaFold 3 and AI for Scientific Discovery',
    founded: 2010,
    trending: true
  },
  {
    id: 6,
    name: 'Sam Altman',
    title: 'CEO',
    company: 'OpenAI',
    location: 'San Francisco, USA',
    bio: 'American entrepreneur and investor, best known as the CEO of OpenAI and former president of Y Combinator.',
    avatar: '/placeholder-avatar.jpg',
    achievements: [
      'OpenAI CEO',
      'Former Y Combinator President',
      'GPT Series Leader',
      'AI Safety Advocate'
    ],
    specialties: ['Large Language Models', 'AI Safety', 'AGI Development', 'AI Policy'],
    papers: 12,
    citations: 2300,
    hIndex: 18,
    followers: 125000,
    socialLinks: {
      twitter: '@sama',
      linkedin: 'sam-altman',
      scholar: 'sam-altman'
    },
    recentWork: 'ChatGPT and GPT-4 Development',
    founded: 2015,
    trending: true
  }
]

const categories = [
  { name: 'All', count: personalities.length },
  { name: 'Researchers', count: 4 },
  { name: 'Entrepreneurs', count: 2 },
  { name: 'Academics', count: 4 },
  { name: 'Industry Leaders', count: 3 }
]

export default function AIPersonalities() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('citations')
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)

  const filteredPersonalities = personalities
    .filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(person => showTrendingOnly ? person.trending : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'citations':
          return b.citations - a.citations
        case 'papers':
          return b.papers - a.papers
        case 'hindex':
          return b.hIndex - a.hIndex
        case 'followers':
          return b.followers - a.followers
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Personalities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the minds shaping artificial intelligence. Learn about influential researchers, 
              entrepreneurs, and thought leaders in the AI community.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search personalities, specialties, or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="citations">Most Citations</option>
                <option value="papers">Most Papers</option>
                <option value="hindex">Highest H-Index</option>
                <option value="followers">Most Followers</option>
              </select>

              <button
                onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  showTrendingOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2 inline" />
                Trending
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="float-right text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Profiles</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Research Papers</span>
                    <span className="font-medium">15,623</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Citations</span>
                    <span className="font-medium">2.3M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredPersonalities.length} personalities found
              </p>
            </div>

            <div className="grid gap-6">
              {filteredPersonalities.map((person) => (
                <div key={person.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Link href={`/ai-personalities/${person.id}`} className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                                {person.name}
                              </Link>
                              {person.trending && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </span>
                              )}
                            </div>
                            <p className="text-lg text-blue-600 font-medium mb-1">{person.title}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center space-x-1">
                                <Award className="w-4 h-4" />
                                <span>{person.company}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{person.location}</span>
                              </span>
                            </div>
                          </div>

                          {/* Social Links */}
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Twitter className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Linkedin className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <BookOpen className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">{person.bio}</p>

                        {/* Specialties */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {person.specialties.map((specialty) => (
                              <span 
                                key={specialty}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Recent Work */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Recent Work</h4>
                          <p className="text-sm text-gray-600">{person.recentWork}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-6 text-sm">
                            <span className="flex items-center space-x-1 text-gray-600">
                              <BookOpen className="w-4 h-4" />
                              <span>{person.papers} papers</span>
                            </span>
                            <span className="flex items-center space-x-1 text-gray-600">
                              <Star className="w-4 h-4" />
                              <span>{person.citations.toLocaleString()} citations</span>
                            </span>
                            <span className="text-gray-600">
                              H-index: {person.hIndex}
                            </span>
                            <span className="flex items-center space-x-1 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{person.followers.toLocaleString()} followers</span>
                            </span>
                          </div>

                          <Link 
                            href={`/ai-personalities/${person.id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                          >
                            <span>View Profile</span>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPersonalities.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No personalities found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all personalities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
