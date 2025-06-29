'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Calendar, Users, DollarSign, TrendingUp, Award, ExternalLink, Building2, Zap, Globe, Star, Eye } from 'lucide-react'

const companies = [
  {
    id: 1,
    name: "OpenAI",
    logo: "🤖",
    description: "Creating safe artificial general intelligence that benefits all of humanity",
    category: "AI Research",
    funding: "$11.3B",
    employees: "500+",
    founded: "2015",
    stage: "Growth",
    tags: ["LLM", "Research", "ChatGPT"],
    metrics: {
      users: "100M+",
      revenue: "$1.6B",
      growth: "350%"
    },
    website: "https://openai.com",
    featured: true,
    trending: true
  },
  {
    id: 2,
    name: "Anthropic",
    logo: "⚡",
    description: "AI safety company building reliable, interpretable, and steerable AI systems",
    category: "AI Safety",
    funding: "$7.3B",
    employees: "300+",
    founded: "2021",
    stage: "Growth",
    tags: ["Claude", "Safety", "Research"],
    metrics: {
      users: "50M+",
      revenue: "$800M",
      growth: "250%"
    },
    website: "https://anthropic.com",
    featured: true
  },
  {
    id: 3,
    name: "Stability AI",
    logo: "🎨",
    description: "Democratizing deep learning through open source and accessible AI models",
    category: "Generative AI",
    funding: "$600M",
    employees: "200+",
    founded: "2019",
    stage: "Series A",
    tags: ["Stable Diffusion", "Open Source", "Image Generation"],
    metrics: {
      users: "200M+",
      revenue: "$150M",
      growth: "400%"
    },
    website: "https://stability.ai"
  },
  {
    id: 4,
    name: "Cohere",
    logo: "🔗",
    description: "Enterprise AI platform for building language applications",
    category: "Enterprise AI",
    funding: "$445M",
    employees: "250+",
    founded: "2019",
    stage: "Series C",
    tags: ["NLP", "Enterprise", "API"],
    metrics: {
      users: "10K+",
      revenue: "$200M",
      growth: "180%"
    },
    website: "https://cohere.ai"
  },
  {
    id: 5,
    name: "Hugging Face",
    logo: "🤗",
    description: "The platform where the machine learning community collaborates",
    category: "ML Platform",
    funding: "$235M",
    employees: "150+",
    founded: "2016",
    stage: "Series C",
    tags: ["Transformers", "Open Source", "Community"],
    metrics: {
      users: "5M+",
      revenue: "$70M",
      growth: "300%"
    },
    website: "https://huggingface.co"
  },
  {
    id: 6,
    name: "Scale AI",
    logo: "📊",
    description: "Data infrastructure for autonomous vehicles, mapping, AR/VR, and robotics",
    category: "Data Infrastructure",
    funding: "$602M",
    employees: "1000+",
    founded: "2016",
    stage: "Series E",
    tags: ["Data Labeling", "Autonomous Vehicles", "Training Data"],
    metrics: {
      users: "300+",
      revenue: "$500M",
      growth: "120%"
    },
    website: "https://scale.com"
  }
]

const categories = [
  { name: 'All', count: companies.length },
  { name: 'AI Research', count: 1 },
  { name: 'Generative AI', count: 1 },
  { name: 'AI Safety', count: 1 },
  { name: 'Enterprise AI', count: 1 },
  { name: 'ML Platform', count: 1 }
]

const stages = ['All Stages', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Growth']

export default function AIHub() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStage, setSelectedStage] = useState('All Stages')
  const [sortBy, setSortBy] = useState('funding')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredCompanies = companies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(company => selectedCategory === 'All' || company.category === selectedCategory)
    .filter(company => selectedStage === 'All Stages' || company.stage === selectedStage)
    .filter(company => showFeaturedOnly ? company.featured : true)


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Startup Hub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most innovative AI companies shaping the future. 
              Explore detailed profiles, funding information, and key innovations.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  showFeaturedOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Star className="w-4 h-4 mr-2 inline" />
                Featured Only
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCompanies.length} companies found
          </p>
        </div>

        <div className="grid gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                      {company.logo}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Link href={`/ai-hub/${company.id}`} className="text-xl font-bold text-gray-900 hover:text-blue-600">
                          {company.name}
                        </Link>
                        {company.trending && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </span>
                        )}
                        {company.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Founded {company.founded}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Building2 className="w-4 h-4" />
                          <span>{company.category}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 mb-1">{company.funding}</div>
                    <div className="text-sm text-gray-600">Funding</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">{company.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">{company.metrics.users}</div>
                    <div className="text-xs text-gray-600">Users</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{company.metrics.revenue}</div>
                    <div className="text-xs text-gray-600">Revenue</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-600">{company.metrics.growth}</div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{company.employees}</span>
                    </span>
                    <span>{company.stage}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <a 
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Website</span>
                    </a>
                    <Link 
                      href={`/ai-hub/${company.id}`}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}