'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, Github, Chrome, Brain, AlertCircle, CheckCircle } from "lucide-react"

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all required fields')
      setMessageType('error')
      return false
    }

    if (isSignUp) {
      if (!formData.name) {
        setMessage('Please enter your full name')
        setMessageType('error')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match')
        setMessageType('error')
        return false
      }
      if (formData.password.length < 6) {
        setMessage('Password must be at least 6 characters')
        setMessageType('error')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (isSignUp) {
        setMessage('Account created successfully! You can now sign in.')
        setMessageType('success')
        setIsSignUp(false)
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      } else {
        // Store auth data in localStorage
        localStorage.setItem('auth-token', 'demo-token-' + Date.now())
        localStorage.setItem('user-name', formData.name || 'User')
        localStorage.setItem('user-email', formData.email)
        
        setMessage('Welcome back! Redirecting...')
        setMessageType('success')
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = (provider: string) => {
    setMessage(`${provider} authentication coming soon!`)
    setMessageType('success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Join MatrixProg' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Create your account to access all features' 
              : 'Sign in to continue your journey'
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          {/* Tab Header */}
          <div className="bg-gray-50 p-1 m-6 rounded-xl">
            <div className="flex space-x-1">
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  !isSignUp 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => {
                  setIsSignUp(false)
                  setMessage('')
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                }}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  isSignUp 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => {
                  setIsSignUp(true)
                  setMessage('')
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
          
          <div className="p-6 pt-0">
            {/* Message Display */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                messageType === 'error' 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {messageType === 'error' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span className="text-sm">{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}
              
              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleSocialAuth('GitHub')}
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </button>
              <button 
                onClick={() => handleSocialAuth('Google')}
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </button>
            </div>
            
            {isSignUp && (
              <p className="text-xs text-center text-gray-500 mt-4">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}