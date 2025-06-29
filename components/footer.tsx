'use client'

import Link from 'next/link'
import { Brain, Building2, Rocket, GraduationCap, Users, Award, Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900">MatrixProg</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
          </div>

          {/* Social */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">© 2024 MatrixProg. Built for innovators.</p>
        </div>
      </div>
    </footer>
  )
}