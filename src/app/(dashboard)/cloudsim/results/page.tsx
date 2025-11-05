'use client'
import React from 'react'
import InfoBar from '@/components/infobar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Users,
    MessageSquare,
    DollarSign,
    Zap,
    CheckCircle,
    AlertTriangle,
    Star,
    Target,
    Award,
    FileText,
    Download,
    Calendar,
    Clock
} from 'lucide-react'
import Link from 'next/link'

const ResultsAnalysisPage = () => {
    // Hardcoded comprehensive data for the entire application
    const reportData = {
        period: 'October 2025',
        generatedAt: new Date('2025-11-03'),

        // Chatbot Performance Data
        chatbotMetrics: {
            totalConversations: 2847,
            averageResponseTime: 1.2,
            customerSatisfaction: 4.6,
            leadConversionRate: 18.4,
            totalDomains: 12,
            activeCustomers: 1245,
            emailsProcessed: 4782,
            appointmentsBooked: 167
        },

        // CloudSim Performance Data
        cloudSimMetrics: {
            totalSimulations: 12,
            runningSimulations: 5,
            totalInstances: 18,
            averageCpuUsage: 67,
            costOptimizationSavings: 127.50,
            systemHealthScore: 94,
            uptime: 99.7
        },

        // Revenue & Business Impact
        businessMetrics: {
            monthlyRevenue: 8734.50,
            newSignups: 89,
            churnRate: 2.1,
            avgRevenuePerUser: 67.50,
            totalActiveUsers: 156,
            growthRate: 23.8
        }
    }

    // Chart data for visualizations
    const monthlyTrendsData = [
        { month: 'Jun', conversations: 1450, revenue: 6200, simulations: 8 },
        { month: 'Jul', conversations: 1780, revenue: 7100, simulations: 9 },
        { month: 'Aug', conversations: 2100, revenue: 7800, simulations: 10 },
        { month: 'Sep', conversations: 2456, revenue: 8200, simulations: 11 },
        { month: 'Oct', conversations: 2847, revenue: 8734, simulations: 12 }
    ]

    const performanceBreakdownData = [
        { category: 'AI Chatbot', performance: 92, target: 90, status: 'excellent' },
        { category: 'Cloud Infrastructure', performance: 89, target: 85, status: 'excellent' },
        { category: 'Customer Support', performance: 86, target: 88, status: 'good' },
        { category: 'System Reliability', performance: 97, target: 95, status: 'excellent' }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-600 bg-green-100'
            case 'good': return 'text-blue-600 bg-blue-100'
            case 'warning': return 'text-yellow-600 bg-yellow-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    return (
        <>
            <InfoBar />
            <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard/cloudsim">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to CloudSim
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Results & Analysis Report</h1>
                                <p className="text-gray-600 mt-2">
                                    Demo performance analysis for Opal AI Chatbot SaaS Platform Project
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                <Calendar className="w-4 h-4 mr-1" />
                                {reportData.period}
                            </Badge>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Download className="w-4 h-4 mr-2" />
                                Export Report
                            </Button>
                        </div>
                    </div>

                    {/* Executive Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-yellow-500" />
                                <span>Project Demo Summary</span>
                            </CardTitle>
                            <CardDescription>
                                Simulated performance highlights and technical capabilities for {reportData.period}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-3xl font-bold text-green-600 mb-2">
                                        {reportData.chatbotMetrics.totalConversations.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Demo Conversations</div>
                                    <div className="text-xs text-green-600 mt-1">Simulated interactions</div>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        ${reportData.businessMetrics.monthlyRevenue.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">Projected Revenue</div>
                                    <div className="text-xs text-blue-600 mt-1">Demo calculation</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                        {reportData.cloudSimMetrics.systemHealthScore}%
                                    </div>
                                    <div className="text-sm text-gray-600">System Health</div>
                                    <div className="text-xs text-purple-600 mt-1">Demo performance</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                                        {reportData.chatbotMetrics.customerSatisfaction}★
                                    </div>
                                    <div className="text-sm text-gray-600">Demo Rating</div>
                                    <div className="text-xs text-yellow-600 mt-1">Simulated feedback</div>
                                </div>
                            </div>              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Demo Features Implemented</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>AI-powered chatbot with OpenAI integration</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Real-time cloud simulation dashboard</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Comprehensive analytics and reporting</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Modern responsive UI with Tailwind CSS</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Charts and Graphs Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Graph 1: Monthly Performance Trends */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Demo Performance Trends</span>
                                </CardTitle>
                                <CardDescription>
                                    Simulated 5-month trend analysis of key metrics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Simple bar chart representation */}
                                    {monthlyTrendsData.map((month, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium">{month.month} 2025</span>
                                                <span className="text-gray-600">{month.conversations} conversations</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Conversations</div>
                                                    <Progress
                                                        value={(month.conversations / 3000) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Revenue ($)</div>
                                                    <Progress
                                                        value={(month.revenue / 10000) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Simulations</div>
                                                    <Progress
                                                        value={(month.simulations / 15) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t">
                                    <h4 className="font-medium text-gray-900 mb-2">Trend Analysis</h4>
                                    <div className="text-sm text-gray-600">
                                        <p className="mb-2">
                                            <span className="font-medium text-green-600">Simulated Growth:</span> All metrics show consistent upward trends demonstrating the platform's scalability potential.
                                        </p>
                                        <p>
                                            <span className="font-medium text-blue-600">Revenue Model:</span> Projected revenue calculations based on tiered subscription pricing structure.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Graph 2: Performance vs Target Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="w-5 h-5" />
                                    <span>Demo Performance vs Target Analysis</span>
                                </CardTitle>
                                <CardDescription>
                                    Simulated performance against established benchmarks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {performanceBreakdownData.map((item, index) => (
                                        <div key={index} className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{item.category}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-600">{item.performance}%</span>
                                                    <Badge className={getStatusColor(item.status)}>
                                                        {item.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <Progress value={item.performance} className="h-4" />
                                                <div
                                                    className="absolute top-0 h-4 w-1 bg-red-500 z-10"
                                                    style={{ left: `${item.target}%` }}
                                                    title={`Target: ${item.target}%`}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>0%</span>
                                                <span>Target: {item.target}%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t">
                                    <h4 className="font-medium text-gray-900 mb-2">Performance Summary</h4>
                                    <div className="text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium text-green-600">Demo Results:</span> All simulated categories demonstrate the platform's technical capabilities and optimization potential.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Chart 1: Revenue Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <PieChart className="w-5 h-5" />
                                    <span>Demo Revenue Distribution Analysis</span>
                                </CardTitle>
                                <CardDescription>
                                    Simulated revenue breakdown by subscription tiers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm font-medium">Standard Plan</span>
                                            </div>
                                            <span className="text-sm font-bold">45%</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                                <span className="text-sm font-medium">Pro Plan</span>
                                            </div>
                                            <span className="text-sm font-bold">35%</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                <span className="text-sm font-medium">Ultimate Plan</span>
                                            </div>
                                            <span className="text-sm font-bold">20%</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                                $8,734.50
                                            </div>
                                            <div className="text-sm text-gray-600">Projected Revenue</div>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Standard ($0):</span>
                                                <span className="font-medium">$3,930.53</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Pro ($67):</span>
                                                <span className="font-medium">$3,057.08</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Ultimate ($97):</span>
                                                <span className="font-medium">$1,746.90</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <div className="text-sm">
                                        <span className="font-medium text-green-700">Demo Insight:</span>
                                        <span className="text-green-600 ml-1">
                                            Standard plan pricing strategy demonstrates accessibility while Pro/Ultimate tiers show premium feature value.
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Chart 2: Customer Satisfaction Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart3 className="w-5 h-5" />
                                    <span>Demo Satisfaction Metrics</span>
                                </CardTitle>
                                <CardDescription>
                                    Simulated customer experience indicators
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">4.6★</div>
                                            <div className="text-sm text-gray-600">Overall Rating</div>
                                        </div>
                                        <div className="text-center p-4 border rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">1.2s</div>
                                            <div className="text-sm text-gray-600">Avg Response Time</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Response Accuracy</span>
                                                <span className="font-medium">94%</span>
                                            </div>
                                            <Progress value={94} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Problem Resolution</span>
                                                <span className="font-medium">89%</span>
                                            </div>
                                            <Progress value={89} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>User Engagement</span>
                                                <span className="font-medium">91%</span>
                                            </div>
                                            <Progress value={91} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Conversion Rate</span>
                                                <span className="font-medium">18.4%</span>
                                            </div>
                                            <Progress value={18.4} className="h-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="text-sm">
                                        <span className="font-medium text-blue-700">Demo Highlight:</span>
                                        <span className="text-blue-600 ml-1">
                                            Simulated metrics demonstrate the platform's potential for high user satisfaction and engagement.
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabular Results Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Table 1: Chatbot Performance Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <MessageSquare className="w-5 h-5" />
                                    <span>Demo AI Chatbot Performance</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Metric</th>
                                                <th className="text-center py-2">Current</th>
                                                <th className="text-center py-2">Target</th>
                                                <th className="text-center py-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2">Demo Conversations</td>
                                                <td className="text-center py-2">2,847</td>
                                                <td className="text-center py-2">2,500</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Simulated</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Response Time (avg)</td>
                                                <td className="text-center py-2">1.2s</td>
                                                <td className="text-center py-2">2.0s</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Demo</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Lead Conversion</td>
                                                <td className="text-center py-2">18.4%</td>
                                                <td className="text-center py-2">15.0%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Projected</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Demo Satisfaction</td>
                                                <td className="text-center py-2">4.6/5</td>
                                                <td className="text-center py-2">4.0/5</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Simulated</Badge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">Demo Domains</td>
                                                <td className="text-center py-2">12</td>
                                                <td className="text-center py-2">10</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Sample</Badge>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Table 2: CloudSim Infrastructure Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Zap className="w-5 h-5" />
                                    <span>Demo CloudSim Infrastructure</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Component</th>
                                                <th className="text-center py-2">Performance</th>
                                                <th className="text-center py-2">Utilization</th>
                                                <th className="text-center py-2">Health</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2">Web Servers (8)</td>
                                                <td className="text-center py-2">95%</td>
                                                <td className="text-center py-2">67%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Healthy</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Databases (4)</td>
                                                <td className="text-center py-2">92%</td>
                                                <td className="text-center py-2">78%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Optimal</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Cache Layer (6)</td>
                                                <td className="text-center py-2">89%</td>
                                                <td className="text-center py-2">85%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-yellow-100 text-yellow-600">Monitor</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Load Balancers (3)</td>
                                                <td className="text-center py-2">97%</td>
                                                <td className="text-center py-2">45%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Excellent</Badge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">System Overall</td>
                                                <td className="text-center py-2">94%</td>
                                                <td className="text-center py-2">67%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">Excellent</Badge>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Table 3: Business Growth Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Demo Growth & Revenue Projections</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Metric</th>
                                                <th className="text-center py-2">Current Month</th>
                                                <th className="text-center py-2">Previous Month</th>
                                                <th className="text-center py-2">Growth</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2">Projected Revenue</td>
                                                <td className="text-center py-2">$8,734.50</td>
                                                <td className="text-center py-2">$8,200.00</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">+6.5%</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Demo Signups</td>
                                                <td className="text-center py-2">89</td>
                                                <td className="text-center py-2">73</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">+21.9%</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Demo Users</td>
                                                <td className="text-center py-2">156</td>
                                                <td className="text-center py-2">142</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">+9.9%</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Churn Rate</td>
                                                <td className="text-center py-2">2.1%</td>
                                                <td className="text-center py-2">2.8%</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">-25%</Badge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">ARPU</td>
                                                <td className="text-center py-2">$67.50</td>
                                                <td className="text-center py-2">$65.20</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">+3.5%</Badge>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Table 4: Cost Optimization & Savings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5" />
                                    <span>Demo Cost Optimization Analysis</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Optimization Area</th>
                                                <th className="text-center py-2">Current Cost</th>
                                                <th className="text-center py-2">Optimized Cost</th>
                                                <th className="text-center py-2">Savings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2">Cloud Infrastructure</td>
                                                <td className="text-center py-2">$763.00</td>
                                                <td className="text-center py-2">$635.50</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">$127.50</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Email Processing</td>
                                                <td className="text-center py-2">$245.60</td>
                                                <td className="text-center py-2">$198.40</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">$47.20</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Storage Optimization</td>
                                                <td className="text-center py-2">$156.80</td>
                                                <td className="text-center py-2">$134.30</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">$22.50</Badge>
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">API Usage</td>
                                                <td className="text-center py-2">$189.40</td>
                                                <td className="text-center py-2">$167.80</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600">$21.60</Badge>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 font-semibold">Total Monthly</td>
                                                <td className="text-center py-2 font-semibold">$1,354.80</td>
                                                <td className="text-center py-2 font-semibold">$1,136.00</td>
                                                <td className="text-center py-2">
                                                    <Badge className="bg-green-100 text-green-600 font-semibold">$218.80</Badge>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Conclusions and Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <FileText className="w-5 h-5" />
                                <span>Demo Conclusions & Technical Showcase</span>
                            </CardTitle>
                            <CardDescription>
                                Project capabilities and technical implementation highlights
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                        Technical Achievements
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                                            <span><strong>Full-Stack Implementation:</strong> Complete Next.js 14 application with TypeScript, Prisma ORM, and PostgreSQL database.</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                                            <span><strong>AI Integration:</strong> OpenAI GPT-3.5-turbo integration with real-time conversation capabilities and context awareness.</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                                            <span><strong>Cloud Simulation:</strong> Comprehensive infrastructure monitoring dashboard with real-time metrics and performance analytics.</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                                            <span><strong>Modern UI/UX:</strong> Responsive design with Tailwind CSS, Radix UI components, and professional dashboard layouts.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                                        Future Enhancements
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                            <span><strong>Production Deployment:</strong> Implement CI/CD pipeline and production-ready infrastructure with proper scaling capabilities.</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                            <span><strong>Advanced Analytics:</strong> Add machine learning models for predictive analytics and customer behavior insights.</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                            <span><strong>Mobile Application:</strong> Develop native mobile apps for iOS and Android to expand platform accessibility.</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                                            <span><strong>Enterprise Features:</strong> Implement multi-tenancy, advanced security, and enterprise-grade compliance features.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Project Summary</h4>
                                <p className="text-sm text-blue-800">
                                    The Opal AI Chatbot SaaS platform serves as a comprehensive demonstration of modern web development technologies
                                    and enterprise-grade software architecture. This project showcases the integration of AI-powered conversational
                                    interfaces with robust cloud infrastructure monitoring, creating a scalable foundation for SaaS applications.
                                    The implementation demonstrates proficiency in Next.js, TypeScript, React, AI integration, real-time communications,
                                    and complex state management. All metrics and data presented are simulated for demonstration purposes, highlighting
                                    the platform's potential capabilities and technical excellence in full-stack development.
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                <span>Demo report generated on {reportData.generatedAt.toLocaleDateString()} at {reportData.generatedAt.toLocaleTimeString()}</span>
                                <span>Portfolio Project - Opal AI Chatbot SaaS Platform</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ResultsAnalysisPage