
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  Globe, 
  MapPin,
  Star,
  TrendingUp,
  Zap,
  Target,
  Award
} from "lucide-react"

export default function StartupProfile() {
  const params = useParams()
  const id = params.id

  // Sample company data - in real app, fetch from API
  const company = {
    id: 1,
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    tagline: "Creating safe artificial general intelligence that benefits all of humanity",
    description: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We conduct research in the field of AI and develop advanced AI systems.",
    founded: "2015",
    headquarters: "San Francisco, CA",
    employees: "500+",
    funding: "$11.3B",
    website: "https://openai.com",
    category: "AI Research",
    stage: "Growth",
    metrics: {
      users: "100M+",
      revenue: "$1.6B",
      growth: "350%",
      valuation: "$86B"
    },
    founders: ["Sam Altman", "Elon Musk", "Greg Brockman"],
    keyProducts: ["ChatGPT", "GPT-4", "DALL-E", "Codex"],
    recentNews: "OpenAI announces GPT-4 Turbo with improved performance and reduced costs for developers.",
    socialImpact: "Democratizing AI access through free tiers and educational programs, while focusing on AI safety research.",
    keyMilestones: [
      { year: "2015", event: "Company founded" },
      { year: "2018", event: "GPT-1 released" },
      { year: "2020", event: "GPT-3 breakthrough" },
      { year: "2022", event: "ChatGPT launched" },
      { year: "2023", event: "GPT-4 and enterprise products" }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/ai-hub" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Startups
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <Badge className="bg-green-100 text-green-700">{company.stage}</Badge>
              </div>
              <p className="text-xl text-gray-600 mb-4">{company.tagline}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {company.headquarters}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Founded {company.founded}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {company.employees} employees
                </span>
              </div>
            </div>
            <Button asChild>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>

            {/* Key Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Key Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {company.keyProducts.map((product, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold">{product}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-500" />
                  Key Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.keyMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                        {milestone.year}
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{company.metrics.users}</div>
                    <div className="text-sm text-gray-600">Users</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{company.funding}</div>
                    <div className="text-sm text-gray-600">Funding</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{company.metrics.revenue}</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{company.metrics.growth}</div>
                    <div className="text-sm text-gray-600">Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Founders */}
            <Card>
              <CardHeader>
                <CardTitle>Founders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {company.founders.map((founder, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded-lg">
                      <p className="font-medium">{founder}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Recent News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">{company.recentNews}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
