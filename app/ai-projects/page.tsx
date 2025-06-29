'use client'

import { useState } from "react"
import Link from "next/link"
import { 
  Github, 
  Star, 
  GitFork, 
  Calendar, 
  Code, 
  ExternalLink, 
  Search,
  Filter,
  TrendingUp,
  Users,
  Eye,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const projects = [
  {
    id: 1,
    name: "ChatGPT-Clone",
    author: "openai-community",
    description: "Open source implementation of ChatGPT with modern React and TypeScript",
    language: "TypeScript",
    stars: 15420,
    forks: 2340,
    lastUpdated: "2 hours ago",
    tags: ["chatgpt", "react", "typescript", "ai"],
    license: "MIT",
    trending: true
  },
  {
    id: 2,
    name: "LangChain",
    author: "hwchase17",
    description: "Building applications with LLMs through composability",
    language: "Python",
    stars: 67800,
    forks: 9200,
    lastUpdated: "4 hours ago",
    tags: ["llm", "python", "ai", "langchain"],
    license: "MIT",
    trending: true
  },
  {
    id: 3,
    name: "Stable-Diffusion-WebUI",
    author: "AUTOMATIC1111",
    description: "Stable Diffusion web UI with lots of features and extensions",
    language: "Python",
    stars: 98500,
    forks: 19800,
    lastUpdated: "1 day ago",
    tags: ["stable-diffusion", "ai-art", "webui", "gradio"],
    license: "AGPL-3.0",
    trending: false
  },
  {
    id: 4,
    name: "Transformers",
    author: "huggingface",
    description: "State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX",
    language: "Python",
    stars: 112000,
    forks: 22400,
    lastUpdated: "6 hours ago",
    tags: ["pytorch", "tensorflow", "nlp", "transformers"],
    license: "Apache-2.0",
    trending: true
  },
  {
    id: 5,
    name: "Ollama",
    author: "ollama",
    description: "Get up and running with large language models locally",
    language: "Go",
    stars: 45600,
    forks: 3200,
    lastUpdated: "3 hours ago",
    tags: ["llm", "go", "local", "inference"],
    license: "MIT",
    trending: true
  },
  {
    id: 6,
    name: "AutoGPT",
    author: "Significant-Gravitas",
    description: "An experimental open-source attempt to make GPT-4 fully autonomous",
    language: "Python",
    stars: 155000,
    forks: 38000,
    lastUpdated: "5 hours ago",
    tags: ["gpt-4", "autonomous", "ai-agent", "python"],
    license: "MIT",
    trending: false
  }
]

const categories = [
  { name: "All", count: 150 },
  { name: "Language Models", count: 45 },
  { name: "Computer Vision", count: 38 },
  { name: "AI Agents", count: 32 },
  { name: "Tools & Frameworks", count: 28 },
  { name: "Research", count: 7 }
]

export default function AIProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("stars")
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    githubUrl: '',
    language: 'Python',
    tags: ''
  })

  const submitProject = () => {
    // In a real app, this would submit to an API
    console.log('Submitting project:', newProject)
    setShowNewProject(false)
    setNewProject({ name: '', description: '', githubUrl: '', language: 'Python', tags: '' })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'JavaScript': 'bg-yellow-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-500',
      'C++': 'bg-purple-500'
    }
    return colors[language] || 'bg-gray-500'
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Github className="w-12 h-12 text-gray-900 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">AI Projects Hub</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover and contribute to open source AI projects from the community
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">1,247</h3>
            <p className="text-gray-600">Active Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">89K</h3>
            <p className="text-gray-600">Contributors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">2.1M</h3>
            <p className="text-gray-600">Total Stars</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-gray-600">Trending Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Submit Project Button */}
      <div className="text-center mb-8">
        <Button onClick={() => setShowNewProject(true)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Submit Your Project
        </Button>
      </div>

      {/* Project Submission Form */}
      {showNewProject && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit New AI Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              />
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg"
                value={newProject.language}
                onChange={(e) => setNewProject({...newProject, language: e.target.value})}
              >
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Go">Go</option>
                <option value="Rust">Rust</option>
              </select>
            </div>
            <Input
              placeholder="GitHub URL"
              value={newProject.githubUrl}
              onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
            />
            <Textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              rows={3}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={newProject.tags}
              onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
            />
            <div className="flex gap-2">
              <Button onClick={submitProject}>Submit Project</Button>
              <Button variant="outline" onClick={() => setShowNewProject(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="stars">Most Stars</option>
            <option value="updated">Recently Updated</option>
            <option value="created">Newest</option>
            <option value="forks">Most Forks</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Projects */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Link 
                          href={`/ai-projects/${project.id}`} 
                          className="text-xl font-semibold text-blue-600 hover:underline mr-2"
                        >
                          {project.name}
                        </Link>
                        {project.trending && (
                          <Badge className="bg-orange-100 text-orange-700 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
                        <span>{project.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{formatNumber(project.stars)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{formatNumber(project.forks)}</span>
                      </div>
                      <span>{project.license}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Updated {project.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}