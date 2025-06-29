
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Heart, MessageCircle, Users, TrendingUp, Plus, User, Calendar } from "lucide-react"

interface CommunityPost {
  id: number
  title: string
  content: string
  category: string
  author: string
  likes: number
  comments: number
  createdAt: string
  trending?: boolean
}

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<CommunityPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showNewPost, setShowNewPost] = useState(false)
  const [loading, setLoading] = useState(true)

  // Sample community posts
  const samplePosts: CommunityPost[] = [
    {
      id: 1,
      title: "Best AI Tools for Content Creation in 2024",
      content: "I've been experimenting with various AI tools for content creation and wanted to share my findings...",
      category: "AI Tools",
      author: "TechCreator",
      likes: 45,
      comments: 12,
      createdAt: "2024-01-15",
      trending: true
    },
    {
      id: 2,
      title: "How to Build Your First Chrome Extension",
      content: "Step-by-step guide for beginners who want to create their first browser extension...",
      category: "Development",
      author: "CodeMaster",
      likes: 32,
      comments: 8,
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "QR Code Marketing Strategies That Actually Work",
      content: "QR codes are making a comeback! Here are proven strategies to boost engagement...",
      category: "Marketing",
      author: "MarketingPro",
      likes: 28,
      comments: 15,
      createdAt: "2024-01-13",
      trending: true
    },
    {
      id: 4,
      title: "JSON Validation Best Practices",
      content: "Essential tips for validating JSON data in your applications to prevent errors...",
      category: "Development",
      author: "DevGuru",
      likes: 19,
      comments: 6,
      createdAt: "2024-01-12"
    },
    {
      id: 5,
      title: "Building Community in Tech: Lessons Learned",
      content: "After managing tech communities for 5 years, here's what I've learned about engagement...",
      category: "Community",
      author: "CommunityBuilder",
      likes: 67,
      comments: 23,
      createdAt: "2024-01-11",
      trending: true
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(samplePosts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory])

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))]
  const trendingPosts = posts.filter(p => p.trending)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Users className="w-12 h-12 animate-pulse mx-auto mb-4 text-blue-500" />
            <p className="text-muted-foreground">Loading community posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-12 h-12 text-blue-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Community</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
          Connect with developers, creators, and tech enthusiasts from around the world
        </p>
        <Button onClick={() => setShowNewPost(true)} className="mb-4">
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">12,450</h3>
            <p className="text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">1,234</h3>
            <p className="text-muted-foreground">Posts This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">15,670</h3>
            <p className="text-muted-foreground">Total Likes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Trending Posts */}
          {trendingPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-orange-500 mr-2" />
                Trending Posts
              </h2>
              <div className="space-y-4">
                {trendingPosts.slice(0, 2).map(post => (
                  <Card key={post.id} className="border-2 border-orange-200 dark:border-orange-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <CardDescription className="mt-2">{post.content}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 ml-4">
                          Trending
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Recent Posts ({filteredPosts.length})
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No posts found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <CardDescription className="mt-2">{post.content}</CardDescription>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['AI Tools', 'Web Development', 'API Integration', 'UI/UX Design', 'Marketing'].map(topic => (
                  <Badge key={topic} variant="outline" className="mr-2 mb-2">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Be respectful and constructive</li>
                <li>• Share knowledge and help others</li>
                <li>• No spam or self-promotion</li>
                <li>• Keep discussions on-topic</li>
                <li>• Report inappropriate content</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
