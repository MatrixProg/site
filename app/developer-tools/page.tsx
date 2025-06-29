
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Database, Terminal, Settings, Zap, FileText, Hash, Globe, Lock } from "lucide-react"
import { JsonFormatter } from '@/components/json-formatter'
import { HashGenerator } from '@/components/hash-generator'
import { Base64Encoder } from '@/components/base64-encoder'
import { RegexTester } from '@/components/regex-tester'
import { CodePlayground } from '@/components/code-playground'

export default function DeveloperTools() {
  const [activeTab, setActiveTab] = useState('overview')

  const toolCategories = [
    {
      id: 'formatters',
      name: 'Formatters & Validators',
      icon: <FileText className="w-5 h-5" />,
      tools: [
        {
          name: 'JSON Formatter',
          description: 'Format, validate, and minify JSON data',
          component: <JsonFormatter />,
          features: ['Format JSON', 'Validate syntax', 'Minify output', 'Error highlighting']
        },
        {
          name: 'XML Formatter',
          description: 'Format and validate XML documents',
          features: ['Format XML', 'Validate structure', 'Pretty print', 'Syntax highlighting']
        }
      ]
    },
    {
      id: 'encoders',
      name: 'Encoders & Decoders',
      icon: <Lock className="w-5 h-5" />,
      tools: [
        {
          name: 'Base64 Encoder/Decoder',
          description: 'Encode and decode Base64 strings',
          component: <Base64Encoder />,
          features: ['Base64 encoding', 'Base64 decoding', 'File support', 'URL safe encoding']
        },
        {
          name: 'URL Encoder/Decoder',
          description: 'Encode and decode URL strings',
          features: ['URL encoding', 'URL decoding', 'Component encoding', 'Query string parsing']
        }
      ]
    },
    {
      id: 'generators',
      name: 'Generators',
      icon: <Zap className="w-5 h-5" />,
      tools: [
        {
          name: 'Hash Generator',
          description: 'Generate MD5, SHA1, SHA256 and other hashes',
          component: <HashGenerator />,
          features: ['Multiple algorithms', 'File hashing', 'HMAC support', 'Batch processing']
        },
        {
          name: 'UUID Generator',
          description: 'Generate various types of UUIDs',
          features: ['UUID v1, v4', 'Bulk generation', 'Custom format', 'Validation']
        }
      ]
    },
    {
      id: 'testers',
      name: 'Testers & Validators',
      icon: <Settings className="w-5 h-5" />,
      tools: [
        {
          name: 'Regex Tester',
          description: 'Test and debug regular expressions',
          component: <RegexTester />,
          features: ['Real-time testing', 'Match highlighting', 'Capture groups', 'Multiple flags']
        },
        {
          name: 'API Tester',
          description: 'Test REST APIs and HTTP endpoints',
          features: ['HTTP methods', 'Headers management', 'Request body', 'Response analysis']
        }
      ]
    },
    {
      id: 'playground',
      name: 'Code Playground',
      icon: <Code className="w-5 h-5" />,
      tools: [
        {
          name: 'Multi-Language Code Runner',
          description: 'Write, test, and run code in multiple languages',
          component: <CodePlayground />,
          features: ['JavaScript, Python, HTML, CSS', 'Live preview', 'Syntax highlighting', 'Error detection']
        }
      ]
    }
  ]

  const stats = [
    { label: 'Tools Available', value: '25+', icon: <Code className="w-6 h-6 text-blue-500" /> },
    { label: 'Daily Users', value: '10K+', icon: <Globe className="w-6 h-6 text-green-500" /> },
    { label: 'Code Executions', value: '50K+', icon: <Terminal className="w-6 h-6 text-purple-500" /> },
    { label: 'Uptime', value: '99.9%', icon: <Database className="w-6 h-6 text-orange-500" /> }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Code className="w-12 h-12 text-blue-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Developer Tools</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Professional-grade development tools to boost your productivity and streamline your workflow
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {toolCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              {category.icon}
              <span className="ml-1 hidden md:inline">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {toolCategories.map(category => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {category.tools.length} tool{category.tools.length !== 1 ? 's' : ''} available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.tools.map((tool, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {tool.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {tool.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{tool.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => setActiveTab(category.id)}
                          className="w-full"
                        >
                          Use Tool
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {toolCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold flex items-center justify-center mb-2">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </h2>
              <p className="text-muted-foreground">
                Professional tools for {category.name.toLowerCase()}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.tools.map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tool.component ? (
                      tool.component
                    ) : (
                      <div className="text-center py-8">
                        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-muted-foreground">Tool coming soon...</p>
                        <div className="flex flex-wrap gap-1 mt-4">
                          {tool.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Feature Highlights */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Developer Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                All tools are optimized for speed and performance, handling large files and complex operations efficiently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                All processing happens in your browser. Your data never leaves your device unless you choose to share it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Always Available</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Access your tools from anywhere, anytime. No installation required, works on any device with a browser.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
