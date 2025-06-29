
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe,
  Edit,
  Save,
  Camera,
  Shield,
  Bell,
  Key,
  Award,
  Activity,
  Heart,
  Eye,
  Code,
  Zap
} from "lucide-react"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Full-stack developer passionate about AI and machine learning. Building the future one line of code at a time.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    twitter: 'johndoe',
    linkedin: 'johndoe',
    joinDate: '2023-01-15'
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'activity', name: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'settings', name: 'Settings', icon: <Shield className="w-4 h-4" /> }
  ]

  const stats = [
    { label: 'Tools Used', value: '24', icon: <Code className="w-5 h-5 text-blue-500" /> },
    { label: 'Projects', value: '12', icon: <Zap className="w-5 h-5 text-green-500" /> },
    { label: 'Favorites', value: '8', icon: <Heart className="w-5 h-5 text-red-500" /> },
    { label: 'Profile Views', value: '156', icon: <Eye className="w-5 h-5 text-purple-500" /> }
  ]

  const recentActivity = [
    { action: 'Used AI Text Generator', time: '2 hours ago', type: 'tool' },
    { action: 'Favorited OpenAI startup', time: '1 day ago', type: 'favorite' },
    { action: 'Completed JSON Formatter task', time: '3 days ago', type: 'tool' },
    { action: 'Joined AI Community discussion', time: '1 week ago', type: 'community' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setIsEditing(false)
    // TODO: Save profile data
    console.log('Profile saved:', profileData)
  }

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button 
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border hover:bg-gray-50 transition-colors"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const avatar = e.target?.result as string
                      localStorage.setItem('user-avatar', avatar)
                      // Force re-render by updating a state or reloading
                      window.location.reload()
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="text-lg font-semibold"
                  />
                  <Textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                  <p className="text-gray-600 mt-2">{profileData.bio}</p>
                </div>
              )}
              
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profileData.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {new Date(profileData.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub</label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="github"
                    value={profileData.github}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter</label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    name="twitter"
                    value={profileData.twitter}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <a href={profileData.website} className="text-blue-600 hover:underline" target="_blank">
                  {profileData.website}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Github className="w-4 h-4 text-gray-400" />
                <a href={`https://github.com/${profileData.github}`} className="text-blue-600 hover:underline" target="_blank">
                  @{profileData.github}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Twitter className="w-4 h-4 text-gray-400" />
                <a href={`https://twitter.com/${profileData.twitter}`} className="text-blue-600 hover:underline" target="_blank">
                  @{profileData.twitter}
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderActivity = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions on MatrixProg</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'tool' ? 'bg-blue-500' :
                  activity.type === 'favorite' ? 'bg-red-500' :
                  activity.type === 'community' ? 'bg-green-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive updates about new tools and features</p>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Change Password</h3>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <Button variant="outline" size="sm">
              <Key className="w-4 h-4 mr-2" />
              Change
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  )
}
