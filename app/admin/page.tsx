'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  Shield, 
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Brain,
  Zap,
  Globe,
  Server
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simple admin check - in production, use proper authentication
  useState(() => {
    // Check for admin access (you can implement proper auth here)
    const adminKey = new URLSearchParams(window.location.search).get('key')
    const isAuthorized = adminKey === 'admin123' // Replace with proper auth
    setIsAdmin(isAuthorized)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
          <Button onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  // Mock data for admin dashboard
  const stats = [
    { title: 'Total Users', value: '12,543', change: '+12%', icon: <Users className="w-6 h-6 text-blue-500" /> },
    { title: 'AI Startups', value: '1,247', change: '+8%', icon: <Building2 className="w-6 h-6 text-green-500" /> },
    { title: 'Tools Used Today', value: '8,924', change: '+15%', icon: <Zap className="w-6 h-6 text-purple-500" /> },
    { title: 'Revenue', value: '$89,432', change: '+23%', icon: <TrendingUp className="w-6 h-6 text-orange-500" /> }
  ]

  const recentUsers = [
    { name: 'Alex Johnson', email: 'alex@example.com', joined: '2 hours ago', status: 'active' },
    { name: 'Sarah Chen', email: 'sarah@example.com', joined: '5 hours ago', status: 'active' },
    { name: 'Mike Wilson', email: 'mike@example.com', joined: '1 day ago', status: 'pending' },
    { name: 'Lisa Davis', email: 'lisa@example.com', joined: '2 days ago', status: 'active' }
  ]

  const pendingStartups = [
    { name: 'NextGen AI', category: 'Computer Vision', status: 'pending', submitted: '2 hours ago' },
    { name: 'DataFlow Inc', category: 'ML Platform', status: 'under_review', submitted: '1 day ago' },
    { name: 'VoiceBot Pro', category: 'NLP', status: 'pending', submitted: '3 days ago' }
  ]

  const systemAlerts = [
    { type: 'warning', message: 'High server load detected', time: '5 min ago' },
    { type: 'info', message: 'Database backup completed', time: '30 min ago' },
    { type: 'error', message: 'API rate limit exceeded for user ID 1234', time: '1 hour ago' }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="w-6 h-6" />
              <span>Add Startup</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="w-6 h-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.joined}</p>
                    </div>
                  </div>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                  {alert.type === 'error' && <XCircle className="w-5 h-5 text-red-500 mt-0.5" />}
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                  {alert.type === 'info' && <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStartups = () => (
    <div className="space-y-6">
      {/* Startup Management Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Startup Management</h2>
          <p className="text-gray-600">Review and manage AI startup listings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Startup
          </Button>
        </div>
      </div>

      {/* Add Startup Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Startup</CardTitle>
          <CardDescription>Add a new AI startup to the directory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Company Name" />
            <Input placeholder="Website URL" />
            <Input placeholder="Funding Amount" />
            <Input placeholder="Category" />
            <Input placeholder="Founded Year" />
            <Input placeholder="Employee Count" />
            <div className="md:col-span-2">
              <Textarea placeholder="Company Description" rows={3} />
            </div>
            <div className="md:col-span-2">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Startup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Reviews ({pendingStartups.length})</CardTitle>
          <CardDescription>Startups awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingStartups.map((startup, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {startup.name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{startup.name}</h3>
                    <p className="text-sm text-gray-600">{startup.category}</p>
                    <p className="text-xs text-gray-500">Submitted {startup.submitted}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={startup.status === 'pending' ? 'secondary' : 'outline'}>
                    {startup.status.replace('_', ' ')}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Startups */}
      <Card>
        <CardHeader>
          <CardTitle>All Startups</CardTitle>
          <CardDescription>Complete startup directory</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search startups..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Startup management interface would be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>User management interface would be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-gray-600">Platform performance and usage metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Usage analytics charts would be implemented here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Performance monitoring would be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-gray-600">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Platform Name</label>
              <Input defaultValue="MatrixProg" />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea defaultValue="AI Development Platform" rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Email</label>
              <Input defaultValue="admin@matrixprog.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
              </div>
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">API Rate Limiting</h3>
                <p className="text-sm text-gray-600">Control API request limits</p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Data Backup</h3>
                <p className="text-sm text-gray-600">Automated backup settings</p>
              </div>
              <Button variant="outline" size="sm">
                <Database className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">MatrixProg Platform Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                View Site
              </Button>
              <Button variant="outline" size="sm">
                <Server className="w-4 h-4 mr-2" />
                System Status
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:flex">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="startups" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Startups</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">{renderOverview()}</TabsContent>
          <TabsContent value="startups">{renderStartups()}</TabsContent>
          <TabsContent value="users">{renderUsers()}</TabsContent>
          <TabsContent value="analytics">{renderAnalytics()}</TabsContent>
          <TabsContent value="settings">{renderSettings()}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}