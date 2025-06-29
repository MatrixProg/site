'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Hash, Check } from "lucide-react"

export function HashGenerator() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState('md5')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState('')

  const algorithms = [
    { value: 'md5', label: 'MD5' },
    { value: 'sha1', label: 'SHA-1' },
    { value: 'sha256', label: 'SHA-256' },
    { value: 'sha512', label: 'SHA-512' },
  ]

  const generateHashes = async () => {
    if (!input) return

    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const newHashes: Record<string, string> = {}

    for (const algo of algorithms) {
      try {
        let hashBuffer: ArrayBuffer
        if (algo.value === 'md5') {
          // Note: MD5 is not available in Web Crypto API
          // This is a placeholder - you'd need a crypto library for MD5
          newHashes[algo.value] = 'MD5 requires additional library'
        } else {
          const algorithmMap: Record<string, string> = {
            'sha1': 'SHA-1',
            'sha256': 'SHA-256',
            'sha512': 'SHA-512'
          }
          hashBuffer = await crypto.subtle.digest(algorithmMap[algo.value], data)
          const hashArray = Array.from(new Uint8Array(hashBuffer))
          newHashes[algo.value] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        }
      } catch (error) {
        newHashes[algo.value] = 'Error generating hash'
      }
    }

    setHashes(newHashes)
  }

  const copyToClipboard = async (hash: string, algorithm: string) => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(algorithm)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hash Generator</CardTitle>
          <CardDescription>
            Generate cryptographic hashes for any text input
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Input Text</label>
            <Textarea
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={generateHashes} disabled={!input}>
            <Hash className="w-4 h-4 mr-2" />
            Generate Hashes
          </Button>

          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Hashes</h3>
              {algorithms.map((algo) => (
                <div key={algo.value} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{algo.label}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(hashes[algo.value], algo.value)}
                    >
                      {copied === algo.value ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Input
                    value={hashes[algo.value] || ''}
                    readOnly
                    className="font-mono text-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}