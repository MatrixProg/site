'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState<RegExpMatchArray[]>([])
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags)
      const allMatches = Array.from(testString.matchAll(regex))
      setMatches(allMatches)
      setError('')
      setIsValid(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern')
      setMatches([])
      setIsValid(false)
    }
  }

  const highlightMatches = () => {
    if (!isValid || matches.length === 0) return testString

    let result = testString
    let offset = 0

    matches.forEach((match) => {
      if (match.index !== undefined) {
        const start = match.index + offset
        const end = start + match[0].length
        const highlighted = `<mark class="bg-yellow-200 px-1 rounded">${match[0]}</mark>`
        result = result.slice(0, start) + highlighted + result.slice(end)
        offset += highlighted.length - match[0].length
      }
    })

    return result
  }

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'Phone', pattern: '\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { name: 'IP Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regular Expression Tester</CardTitle>
          <CardDescription>
            Test and debug regular expressions with real-time matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="text-sm font-medium mb-2 block">Regular Expression</label>
              <Input
                placeholder="Enter regex pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Flags</label>
              <Input
                placeholder="gim"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Test String</label>
            <Textarea
              placeholder="Enter text to test against..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              rows={6}
            />
          </div>

          <Button onClick={testRegex} disabled={!pattern || !testString}>
            Test Regex
          </Button>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {isValid && !error && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">
                  {matches.length} match{matches.length !== 1 ? 'es' : ''} found
                </span>
              </div>

              {matches.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Highlighted Matches</label>
                  <div 
                    className="p-3 bg-gray-50 border rounded-lg font-mono text-sm whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                  />
                </div>
              )}

              {matches.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Match Details</label>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="p-2 bg-gray-50 border rounded">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Match {index + 1}</Badge>
                          <span className="text-sm text-gray-600">
                            Position: {match.index} - {(match.index || 0) + match[0].length - 1}
                          </span>
                        </div>
                        <div className="font-mono text-sm mt-1">{match[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Common Patterns</label>
            <div className="flex flex-wrap gap-2">
              {commonPatterns.map((pattern) => (
                <Button
                  key={pattern.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setPattern(pattern.pattern)}
                >
                  {pattern.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}