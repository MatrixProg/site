
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Brain, Copy, Download, Wand2 } from "lucide-react"

export default function TextGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(100)

  const generateText = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedText(`Generated content based on: "${prompt}"\n\nThis is a sample AI-generated text that would be created based on your prompt. In a real implementation, this would connect to an AI API like OpenAI, Claude, or other text generation services.\n\nThe generated content would be contextually relevant and follow the style and requirements specified in your prompt.`)
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold">AI Text Generator</h1>
        </div>
        <p className="text-gray-600">Generate high-quality content with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Word Count</label>
              <Input
                type="number"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                min="10"
                max="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <Textarea
                placeholder="Enter your content prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8}
              />
            </div>
            <Button 
              onClick={generateText} 
              disabled={isLoading || !prompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Text
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedText ? (
              <div className="space-y-4">
                <Textarea
                  value={generatedText}
                  readOnly
                  rows={12}
                  className="resize-none"
                />
                <div className="flex space-x-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generated content will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
