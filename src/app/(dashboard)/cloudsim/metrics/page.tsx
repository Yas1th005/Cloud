'use client'
import React from 'react'
import InfoBar from '@/components/infobar'
import SystemMetricsDisplay from '@/components/cloudsim/system-metrics-display'
import MetricsChart from '@/components/cloudsim/metrics-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RefreshCw, TrendingUp, BarChart3, PieChart, Activity, Server, Cpu, MemoryStick, Network, HardDrive, Zap, DollarSign } from 'lucide-react'

const SystemMetricsTestPage = () => {
  // Hardcoded metrics data for the chart (20 data points)
  const hardcodedMetrics = Array.from({ length: 20 }, (_, i) => ({
    id: `metric_${i + 1}`,
    cpuUsage: 5 + Math.sin(i * 0.5) * 3 + Math.random() * 2,
    memoryUsage: 10 + Math.sin(i * 0.3) * 4 + Math.random() * 2,
    networkIO: 100 + Math.sin(i * 0.4) * 20 + Math.random() * 10,
    diskIO: 99 + Math.sin(i * 0.2) * 15 + Math.random() * 8,
    timestamp: new Date(Date.now() - (19 - i) * 60000), // 1 minute intervals
    simulationId: 'system_metrics'
  }))

  // Hardcoded performance comparison data
  const performanceComparison = [
    { name: 'CPU Efficiency', current: 95, target: 85, status: 'excellent' },
    { name: 'Memory Optimization', current: 88, target: 90, status: 'good' },
    { name: 'Network Throughput', current: 78, target: 80, status: 'fair' },
    { name: 'Disk Performance', current: 92, target: 85, status: 'excellent' }
  ]

  // Hardcoded resource utilization breakdown
  const resourceBreakdown = [
    { category: 'Web Servers', cpu: 35, memory: 42, instances: 8, cost: 245.60 },
    { category: 'Databases', cpu: 28, memory: 65, instances: 4, cost: 189.40 },
    { category: 'Cache Layers', cpu: 15, memory: 78, instances: 6, cost: 156.80 },
    { category: 'Load Balancers', cpu: 8, memory: 25, instances: 3, cost: 92.30 },
    { category: 'Analytics', cpu: 14, memory: 35, instances: 2, cost: 78.90 }
  ]

  // Hardcoded cost optimization data
  const costOptimization = {
    currentMonthly: 763.00,
    projectedSavings: 127.50,
    optimizedMonthly: 635.50,
    recommendations: [
      { type: 'Downsize', service: 'Analytics Pipeline', savings: 45.20 },
      { type: 'Auto-scaling', service: 'Web Servers', savings: 38.70 },
      { type: 'Reserved Instances', service: 'Databases', savings: 43.60 }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500'
      case 'good': return 'bg-blue-500'
      case 'fair': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'fair': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Metrics Analytics</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive performance monitoring and optimization insights
              </p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>

          {/* Current System Metrics Display */}
          <SystemMetricsDisplay />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Metrics Chart - Hardcoded */}
            <div className="lg:col-span-2">
              <MetricsChart
                metrics={hardcodedMetrics}
                title="Live System Metrics Chart"
                isRealTime={true}
              />
            </div>

            {/* Visual 1: Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance Comparison</span>
                </CardTitle>
                <CardDescription>
                  Current performance vs. target benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceComparison.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{metric.current}%</span>
                          <Badge variant="outline" className={getStatusTextColor(metric.status)}>
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <Progress value={metric.current} className="h-3" />
                        <div 
                          className="absolute top-0 h-3 w-0.5 bg-red-500 z-10"
                          style={{ left: `${metric.target}%` }}
                          title={`Target: ${metric.target}%`}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>Target: {metric.target}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visual 2: Resource Utilization Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Resource Utilization</span>
                </CardTitle>
                <CardDescription>
                  Resource usage by service category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceBreakdown.map((resource, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-medium">{resource.category}</h4>
                          <p className="text-sm text-gray-600">{resource.instances} instances</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            ${resource.cost}
                          </div>
                          <div className="text-xs text-gray-500">monthly</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-600">CPU</span>
                            <span className="text-xs font-medium">{resource.cpu}%</span>
                          </div>
                          <Progress value={resource.cpu} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-600">Memory</span>
                            <span className="text-xs font-medium">{resource.memory}%</span>
                          </div>
                          <Progress value={resource.memory} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - 2 More Visuals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual 3: Cost Optimization Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Cost Optimization</span>
                </CardTitle>
                <CardDescription>
                  Potential savings and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Cost Overview */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${costOptimization.currentMonthly}
                      </div>
                      <div className="text-xs text-gray-600">Current Monthly</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        -${costOptimization.projectedSavings}
                      </div>
                      <div className="text-xs text-gray-600">Potential Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${costOptimization.optimizedMonthly}
                      </div>
                      <div className="text-xs text-gray-600">Optimized Cost</div>
                    </div>
                  </div>

                  {/* Savings Breakdown */}
                  <div>
                    <h4 className="font-medium mb-3">Optimization Recommendations</h4>
                    <div className="space-y-3">
                      {costOptimization.recommendations.map((rec, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{rec.type}</div>
                            <div className="text-xs text-gray-600">{rec.service}</div>
                          </div>
                          <div className="text-green-600 font-bold">
                            -${rec.savings}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Savings Percentage */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Potential Savings</span>
                      <span className="text-sm text-green-600 font-bold">
                        {((costOptimization.projectedSavings / costOptimization.currentMonthly) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={(costOptimization.projectedSavings / costOptimization.currentMonthly) * 100} 
                      className="h-3"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual 4: System Health Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>System Health Dashboard</span>
                </CardTitle>
                <CardDescription>
                  Real-time system status and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Health Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      94
                    </div>
                    <div className="text-sm text-gray-600 mb-4">Overall Health Score</div>
                    <Progress value={94} className="h-4" />
                  </div>

                  {/* Component Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Server className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">Servers</div>
                        <div className="text-xs text-green-600">24/24 Online</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Network className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">Network</div>
                        <div className="text-xs text-green-600">Optimal</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <HardDrive className="w-6 h-6 text-yellow-600" />
                      <div>
                        <div className="text-sm font-medium">Storage</div>
                        <div className="text-xs text-yellow-600">85% Full</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Zap className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">Power</div>
                        <div className="text-xs text-green-600">Stable</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Alerts */}
                  <div>
                    <h4 className="font-medium mb-3">Recent Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">High Memory Usage</div>
                          <div className="text-xs text-gray-600">Cache Layer - 2 min ago</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">Auto-scaling Triggered</div>
                          <div className="text-xs text-gray-600">Web Servers - 5 min ago</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">Backup Completed</div>
                          <div className="text-xs text-gray-600">Database - 15 min ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                Understanding the comprehensive metrics dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Live System Metrics</h4>
                  <p className="text-gray-600 mb-4">
                    Real-time performance data including CPU usage (5%), Memory (10%), 
                    Network throughput (100%), and Disk I/O (99%) with 20 historical data points.
                  </p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Performance Comparison</h4>
                  <p className="text-gray-600">
                    Benchmark analysis comparing current performance against established targets 
                    for CPU efficiency, memory optimization, network throughput, and disk performance.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Resource Utilization</h4>
                  <p className="text-gray-600 mb-4">
                    Detailed breakdown of resource usage across service categories including 
                    web servers, databases, cache layers, load balancers, and analytics services.
                  </p>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Cost & Health Monitoring</h4>
                  <p className="text-gray-600">
                    Optimization opportunities with potential savings of $127.50/month and 
                    comprehensive system health monitoring with 94% overall health score.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SystemMetricsTestPage