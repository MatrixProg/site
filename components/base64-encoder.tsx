'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ArrowUpDown } from "lucide-react"

export function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const encode = () => {
    try {
      const encoded = btoa(input)
      setOutput(encoded)
    } catch (error) {
      setOutput('Error: Invalid input for encoding')
    }
  }

  const decode = () => {
    try {
      const decoded = atob(input)
      setOutput(decoded)
    } catch (error) {
      setOutput('Error: Invalid Base64 input')
    }
  }

  const process = () => {
    if (mode === 'encode') {
      encode()
    } else {
      decode()
    }
  }

  const swap = () => {
    setInput(output)
    setOutput(input)
    setMode(mode === 'encode' ? 'decode' : 'encode')
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base64 Encoder/Decoder</CardTitle>
          <CardDescription>
            Encode text to Base64 or decode Base64 back to text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={mode} onValueChange={(value) => setMode(value as 'encode' | 'decode')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Plain Text</label>
                <Textarea
                  placeholder="Enter text to encode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                />
              </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Base64</label>
                <Textarea
                  placeholder="Enter Base64 to decode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                  className="font-mono"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-2">
            <Button onClick={process} disabled={!input}>
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>
            <Button variant="outline" onClick={swap} disabled={!output}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap
            </Button>
          </div>

          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                </label>
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                rows={6}
                className={`${mode === 'encode' ? 'font-mono' : ''} bg-gray-50`}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}