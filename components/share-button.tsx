
'use client'

import { useState } from 'react'
import { Share2, Copy, Twitter, Linkedin, Mail, Check } from 'lucide-react'

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function ShareButton({ url, title, description, className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    text: description || title,
    url: url
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${title} ${url}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`, '_blank')
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`Check out this link: ${url}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </button>

      {isOpen && !navigator.share && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <button
              onClick={copyToClipboard}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={shareToTwitter}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </button>
            <button
              onClick={shareToLinkedIn}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </button>
            <button
              onClick={shareViaEmail}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
