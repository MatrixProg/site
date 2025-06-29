
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Zap, Heart, Github, Twitter, Linkedin } from "lucide-react"

export default function About() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      description: "Full-stack developer with 10+ years experience building developer tools"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "AI/ML expert specializing in natural language processing and automation"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Designer",
      description: "UX/UI designer focused on creating intuitive developer experiences"
    }
  ]

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community Driven",
      description: "Built by developers, for developers"
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Purpose Built",
      description: "Every tool designed with a specific goal in mind"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Open Source",
      description: "Transparent and community contributions welcome"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About MatrixProg Tools
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're building the ultimate toolkit for developers, creators, and innovators. 
          Our mission is to provide powerful, easy-to-use tools that boost productivity and creativity.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-6 h-6 text-blue-500 mr-2" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To democratize access to powerful development and creative tools, making it easier 
              for anyone to build, create, and innovate without barriers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-6 h-6 text-yellow-500 mr-2" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A world where every developer and creator has instant access to the tools they need 
              to bring their ideas to life, regardless of their technical background or resources.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">
                  <Badge variant="secondary">{member.role}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-center">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-500">50+</h3>
            <p className="text-muted-foreground">Tools Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-green-500">100K+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-purple-500">1M+</h3>
            <p className="text-muted-foreground">Tools Used</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-3xl font-bold text-orange-500">99.9%</h3>
            <p className="text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Get In Touch</CardTitle>
          <CardDescription>
            Have questions, feedback, or want to contribute? We'd love to hear from you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-6">
            <Button variant="outline" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </div>
          <Button>Contact Us</Button>
        </CardContent>
      </Card>
    </div>
  )
}
