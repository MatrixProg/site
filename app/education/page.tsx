
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, BookOpen, Users, Clock, Star, Play, Award, TrendingUp } from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  category: string
  level: string
  duration: string
  instructor: string
  rating: number
  students: number
  price: number
  featured?: boolean
  progress?: number
}

export default function Education() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [loading, setLoading] = useState(true)

  // Sample courses
  const sampleCourses: Course[] = [
    {
      id: 1,
      title: "Complete AI Development Bootcamp",
      description: "Master machine learning, deep learning, and AI application development from scratch",
      category: "Artificial Intelligence",
      level: "Beginner",
      duration: "12 weeks",
      instructor: "Dr. Sarah Chen",
      rating: 4.9,
      students: 12847,
      price: 199,
      featured: true,
      progress: 65
    },
    {
      id: 2,
      title: "Full Stack Web Development with React & Node.js",
      description: "Build modern web applications using React, Node.js, Express, and MongoDB",
      category: "Web Development",
      level: "Intermediate",
      duration: "16 weeks",
      instructor: "John Martinez",
      rating: 4.8,
      students: 9823,
      price: 149,
      featured: true
    },
    {
      id: 3,
      title: "API Design and Development Masterclass",
      description: "Learn to design, build, and deploy robust RESTful APIs",
      category: "Backend Development",
      level: "Intermediate",
      duration: "8 weeks",
      instructor: "Alex Thompson",
      rating: 4.7,
      students: 5642,
      price: 99
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      description: "Create cross-platform mobile applications for iOS and Android",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "10 weeks",
      instructor: "Maria Rodriguez",
      rating: 4.6,
      students: 7123,
      price: 129
    },
    {
      id: 5,
      title: "Data Science and Analytics Fundamentals",
      description: "Learn Python, pandas, visualization, and machine learning basics",
      category: "Data Science",
      level: "Beginner",
      duration: "14 weeks",
      instructor: "Dr. Michael Wang",
      rating: 4.8,
      students: 8956,
      price: 179,
      featured: true
    },
    {
      id: 6,
      title: "DevOps and Cloud Computing",
      description: "Master Docker, Kubernetes, AWS, and CI/CD pipelines",
      category: "DevOps",
      level: "Advanced",
      duration: "12 weeks",
      instructor: "James Wilson",
      rating: 4.9,
      students: 4567,
      price: 249
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(sampleCourses)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    setFilteredCourses(filtered)
  }, [courses, searchTerm, selectedCategory, selectedLevel])

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))]
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']
  const featuredCourses = courses.filter(c => c.featured)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="w-12 h-12 animate-pulse mx-auto mb-4 text-blue-500" />
            <p className="text-muted-foreground">Loading courses...</p>
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
          <BookOpen className="w-12 h-12 text-blue-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Education Hub</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master new skills with our comprehensive courses taught by industry experts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">150+</h3>
            <p className="text-muted-foreground">Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">50K+</h3>
            <p className="text-muted-foreground">Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">98%</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">4.8</h3>
            <p className="text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Category:</span>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize text-xs"
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Level:</span>
            {levels.map(level => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className="capitalize text-xs"
              >
                {level === 'all' ? 'All' : level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-orange-500 mr-2" />
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <Card key={course.id} className="border-2 border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-2">{course.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {course.level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <span className="text-lg font-bold">${course.price}</span>
                    </div>

                    {course.progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress ? 'Continue Learning' : 'Start Course'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          All Courses ({filteredCourses.length})
        </h2>
        
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No courses found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{course.category}</Badge>
                      <Badge 
                        variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {course.level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-xs font-medium">{course.rating}</span>
                      </div>
                      <span className="text-sm font-bold">${course.price}</span>
                    </div>

                    <Button size="sm" className="w-full">
                      <Play className="w-3 h-3 mr-1" />
                      Start Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
