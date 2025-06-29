
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  User, 
  Eye, 
  Clock,
  ThumbsUp,
  Share2,
  Bookmark
} from "lucide-react"

export default function KnowledgeArticle() {
  const params = useParams()
  const id = params.id

  // Sample article data
  const articles: {[key: string]: any} = {
    '1': {
      title: "OpenAI",
      category: "Companies",
      content: `# OpenAI

OpenAI is an American artificial intelligence research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc.

## History

OpenAI was founded in December 2015 by Sam Altman, Reid Hoffman, Jessica Livingston, Elon Musk, Ilya Sutskever, Peter Thiel and others. The company was created as a non-profit organization with the goal of developing artificial general intelligence (AGI) that benefits all of humanity.

## Key Products

### GPT Series
- **GPT-1** (2018): First iteration with 117M parameters
- **GPT-2** (2019): 1.5B parameters, initially restricted due to safety concerns  
- **GPT-3** (2020): 175B parameters, breakthrough in language understanding
- **GPT-4** (2023): Multimodal capabilities, enhanced reasoning

### ChatGPT
Launched in November 2022, ChatGPT became the fastest-growing consumer application in history, reaching 100 million users in just two months.

### DALL-E
AI system that creates realistic images and art from natural language descriptions.

## Research Focus

OpenAI's research spans several key areas:
- Large language models
- Reinforcement learning
- Computer vision
- AI safety and alignment
- Multimodal AI systems

## Impact on Industry

OpenAI has significantly influenced the AI landscape through:
- Democratizing access to powerful AI through APIs
- Setting new standards for AI capabilities
- Advancing the field of prompt engineering
- Pioneering conversational AI interfaces`,
      author: "AI Encyclopedia Team",
      publishDate: "2024-01-15",
      readTime: "8 min",
      views: "15.2K",
      likes: 245,
      tags: ["AI Research", "Language Models", "Technology"]
    },
    '2': {
      title: "Transformer Architecture",
      category: "Technologies",
      content: `# Transformer Architecture

The Transformer is a neural network architecture that has revolutionized natural language processing and machine learning since its introduction in 2017.

## Introduction

Introduced in the paper "Attention Is All You Need" by Vaswani et al., the Transformer architecture relies entirely on attention mechanisms, dispensing with recurrence and convolutions entirely.

## Key Components

### Self-Attention Mechanism
The core innovation of the Transformer is the self-attention mechanism, which allows the model to weigh the importance of different words in a sequence when processing each word.

### Multi-Head Attention
Multiple attention heads allow the model to focus on different types of relationships simultaneously.

### Position Encoding
Since Transformers don't have inherent sequence awareness, positional encodings are added to input embeddings.

## Impact

The Transformer architecture has enabled:
- Large language models like GPT, BERT, T5
- Machine translation breakthroughs
- Text summarization improvements
- Code generation capabilities

## Variants

- **BERT**: Bidirectional encoder representations
- **GPT**: Generative pre-trained transformers  
- **T5**: Text-to-text transfer transformer
- **Vision Transformer (ViT)**: Applied to computer vision`,
      author: "Tech Research Team",
      publishDate: "2024-01-10",
      readTime: "12 min",
      views: "8.7K",
      likes: 189,
      tags: ["Deep Learning", "Architecture", "NLP"]
    }
  }

  const article = articles[id as string] || articles['1']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/knowledge" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Knowledge Base
        </Link>

        {/* Article Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Badge className="mb-3">{article.category}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {article.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.publishDate}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views} views
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Footer */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {article.likes} likes
                </Button>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
