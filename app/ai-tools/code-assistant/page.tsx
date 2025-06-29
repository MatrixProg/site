
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Code, Play, Copy, RefreshCw } from "lucide-react"

export default function CodeAssistant() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [suggestions, setSuggestions] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeCode = async () => {
    setIsAnalyzing(true)
    // Simulate code analysis
    setTimeout(() => {
      setSuggestions(`Code Analysis Results:

1. **Optimization Suggestions:**
   - Consider using const instead of let where variables aren't reassigned
   - Add input validation for better error handling
   - Use async/await for better promise handling

2. **Best Practices:**
   - Add proper error handling with try-catch blocks
   - Include JSDoc comments for better documentation
   - Consider breaking down large functions into smaller, reusable ones

3. **Performance:**
   - Cache frequently used calculations
   - Use efficient data structures for better performance
   - Minimize DOM manipulations if applicable

4. **Security:**
   - Sanitize user inputs to prevent XSS attacks
   - Use proper authentication and authorization
   - Validate all external data sources`)
      setIsAnalyzing(false)
    }, 2000)
  }

  const languages = ['javascript', 'python', 'typescript', 'java', 'cpp', 'go', 'rust']

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Code className="w-12 h-12 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold">AI Code Assistant</h1>
        </div>
        <p className="text-gray-600">Get AI-powered code suggestions and improvements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2 mb-4">
              {languages.map((lang) => (
                <Badge
                  key={lang}
                  variant={language === lang ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
            <Textarea
              placeholder="Paste your code here for analysis..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
            <div className="flex space-x-2">
              <Button 
                onClick={analyzeCode} 
                disabled={isAnalyzing || !code.trim()}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Analyze Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {suggestions ? (
              <div className="space-y-4">
                <Textarea
                  value={suggestions}
                  readOnly
                  rows={16}
                  className="resize-none text-sm"
                />
                <Button onClick={() => navigator.clipboard.writeText(suggestions)} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Suggestions
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>AI suggestions will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
