'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Upload, Check, AlertCircle } from "lucide-react"

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>JSON Formatter & Validator</CardTitle>
          <CardDescription>
            Format, minify, and validate JSON data with syntax highlighting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Input JSON</label>
            <Textarea
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={formatJson}>Format</Button>
            <Button variant="outline" onClick={minifyJson}>Minify</Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Load File
            </Button>
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Formatted Output</label>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadJson}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={output}
                readOnly
                rows={12}
                className="font-mono text-sm bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}