'use client'
import React from 'react'
import { notFound } from 'next/navigation'
import InfoBar from '@/components/infobar'
import { useCloudSim } from '@/hooks/cloudsim/use-cloudsim'
import SimulationOverview from '@/components/cloudsim/simulation-overview'
import ResourceMetrics from '@/components/cloudsim/resource-metrics'
import MetricsChart from '@/components/cloudsim/metrics-chart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, TrendingUp, DollarSign, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

const SimulationDetailPage = ({ params }: Props) => {
  const { getSimulationById, getMetrics, controlSimulation, deleteSimulation, loading } = useCloudSim()

  // Hardcoded simulation data that matches our main page
  const getHardcodedSimulation = (id: string) => {
    const simulations = {
      '1': {
        id: '1',
        name: 'Web Server Cluster',
        description: 'High-availability web server cluster with load balancing and auto-scaling capabilities',
        status: 'RUNNING',
        template: 'Web Server',
        config: {
          instances: 3,
          region: 'us-east-1',
          cpuCores: 4,
          memoryGB: 16,
          storageGB: 100,
          autoScaling: true,
          loadBalancer: true
        },
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-11-03')
      },
      '2': {
        id: '2',
        name: 'Database Replica',
        description: 'PostgreSQL database with read replicas for high performance and availability',
        status: 'RUNNING',
        template: 'Database',
        config: {
          instances: 2,
          region: 'us-west-2',
          cpuCores: 8,
          memoryGB: 32,
          storageGB: 500,
          autoScaling: false,
          loadBalancer: false
        },
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-11-03')
      },
      '3': {
        id: '3',
        name: 'Load Balancer',
        description: 'Application load balancer for distributing traffic across multiple instances',
        status: 'STOPPED',
        template: 'Load Balancer',
        config: {
          instances: 1,
          region: 'eu-west-1',
          cpuCores: 2,
          memoryGB: 8,
          storageGB: 50,
          autoScaling: false,
          loadBalancer: false
        },
        createdAt: new Date('2025-10-25'),
        updatedAt: new Date('2025-11-02')
      },
      '4': {
        id: '4',
        name: 'Cache Layer',
        description: 'Redis cluster for high-performance caching and session storage',
        status: 'RUNNING',
        template: 'Cache',
        config: {
          instances: 4,
          region: 'us-east-1',
          cpuCores: 2,
          memoryGB: 64,
          storageGB: 200,
          autoScaling: true,
          loadBalancer: true
        },
        createdAt: new Date('2025-10-28'),
        updatedAt: new Date('2025-11-03')
      },
      '5': {
        id: '5',
        name: 'Analytics Pipeline',
        description: 'Data processing pipeline for real-time analytics and machine learning',
        status: 'PAUSED',
        template: 'Analytics',
        config: {
          instances: 2,
          region: 'ap-southeast-1',
          cpuCores: 16,
          memoryGB: 128,
          storageGB: 1000,
          autoScaling: true,
          loadBalancer: false
        },
        createdAt: new Date('2025-11-01'),
        updatedAt: new Date('2025-11-02')
      },
      '6': {
        id: '6',
        name: 'Microservices Stack',
        description: 'Kubernetes cluster running containerized microservices with service mesh',
        status: 'RUNNING',
        template: 'Microservices',
        config: {
          instances: 6,
          region: 'us-west-2',
          cpuCores: 8,
          memoryGB: 32,
          storageGB: 300,
          autoScaling: true,
          loadBalancer: true
        },
        createdAt: new Date('2025-11-02'),
        updatedAt: new Date('2025-11-03')
      }
    }
    return simulations[id as keyof typeof simulations] || null
  }

  // Hardcoded metrics data matching the main page
  const getHardcodedMetrics = (simulationId: string) => {
    const metricsData = {
      '1': [ // Web Server Cluster - 50 points for detailed analysis
        { id: '1-1', cpuUsage: 42.1, memoryUsage: 58.3, networkIO: 120.2, diskIO: 85.1, timestamp: new Date(Date.now() - 49 * 60000), simulationId },
        { id: '1-2', cpuUsage: 44.3, memoryUsage: 60.1, networkIO: 125.7, diskIO: 87.4, timestamp: new Date(Date.now() - 48 * 60000), simulationId },
        { id: '1-3', cpuUsage: 43.7, memoryUsage: 61.2, networkIO: 128.9, diskIO: 88.2, timestamp: new Date(Date.now() - 47 * 60000), simulationId },
        { id: '1-4', cpuUsage: 45.8, memoryUsage: 62.8, networkIO: 132.1, diskIO: 89.7, timestamp: new Date(Date.now() - 46 * 60000), simulationId },
        { id: '1-5', cpuUsage: 44.9, memoryUsage: 61.9, networkIO: 129.3, diskIO: 88.9, timestamp: new Date(Date.now() - 45 * 60000), simulationId },
        { id: '1-6', cpuUsage: 46.2, memoryUsage: 63.4, networkIO: 135.2, diskIO: 90.1, timestamp: new Date(Date.now() - 44 * 60000), simulationId },
        { id: '1-7', cpuUsage: 45.1, memoryUsage: 62.7, networkIO: 131.8, diskIO: 89.5, timestamp: new Date(Date.now() - 43 * 60000), simulationId },
        { id: '1-8', cpuUsage: 44.6, memoryUsage: 61.8, networkIO: 127.4, diskIO: 88.7, timestamp: new Date(Date.now() - 42 * 60000), simulationId },
        { id: '1-9', cpuUsage: 45.9, memoryUsage: 62.9, networkIO: 133.6, diskIO: 89.8, timestamp: new Date(Date.now() - 41 * 60000), simulationId },
        { id: '1-10', cpuUsage: 45.2, memoryUsage: 62.1, networkIO: 128.5, diskIO: 89.3, timestamp: new Date(Date.now() - 40 * 60000), simulationId },
        // Add 40 more points with realistic variations for web server traffic...
        ...Array.from({ length: 40 }, (_, i) => ({
          id: `1-${i + 11}`,
          cpuUsage: 43 + Math.sin(i * 0.3) * 5 + Math.random() * 3,
          memoryUsage: 60 + Math.sin(i * 0.2) * 4 + Math.random() * 2,
          networkIO: 125 + Math.sin(i * 0.4) * 15 + Math.random() * 10,
          diskIO: 87 + Math.sin(i * 0.1) * 3 + Math.random() * 2,
          timestamp: new Date(Date.now() - (39 - i) * 60000),
          simulationId
        }))
      ],
      '2': Array.from({ length: 50 }, (_, i) => ({
        id: `2-${i + 1}`,
        cpuUsage: 75 + Math.sin(i * 0.2) * 8 + Math.random() * 4,
        memoryUsage: 82 + Math.sin(i * 0.3) * 6 + Math.random() * 3,
        networkIO: 240 + Math.sin(i * 0.4) * 20 + Math.random() * 15,
        diskIO: 155 + Math.sin(i * 0.1) * 10 + Math.random() * 5,
        timestamp: new Date(Date.now() - (49 - i) * 60000),
        simulationId
      })),
      '3': Array.from({ length: 10 }, (_, i) => ({ // Stopped simulation, minimal data
        id: `3-${i + 1}`,
        cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0,
        timestamp: new Date(),
        simulationId
      })),
      '4': Array.from({ length: 50 }, (_, i) => ({
        id: `4-${i + 1}`,
        cpuUsage: 33 + Math.sin(i * 0.1) * 3 + Math.random() * 2,
        memoryUsage: 89 + Math.sin(i * 0.2) * 4 + Math.random() * 2,
        networkIO: 185 + Math.sin(i * 0.3) * 12 + Math.random() * 8,
        diskIO: 66 + Math.sin(i * 0.1) * 4 + Math.random() * 3,
        timestamp: new Date(Date.now() - (49 - i) * 60000),
        simulationId
      })),
      '5': Array.from({ length: 50 }, (_, i) => ({
        id: `5-${i + 1}`,
        cpuUsage: Math.max(0, 25 - i * 0.1 + Math.random() * 2), // Declining as paused
        memoryUsage: Math.max(0, 45 - i * 0.05 + Math.random() * 1),
        networkIO: Math.max(0, 80 - i * 0.2 + Math.random() * 3),
        diskIO: Math.max(0, 115 - i * 0.1 + Math.random() * 2),
        timestamp: new Date(Date.now() - (49 - i) * 60000),
        simulationId
      })),
      '6': Array.from({ length: 50 }, (_, i) => ({
        id: `6-${i + 1}`,
        cpuUsage: 55 + Math.sin(i * 0.3) * 6 + Math.random() * 4,
        memoryUsage: 72 + Math.sin(i * 0.2) * 5 + Math.random() * 3,
        networkIO: 295 + Math.sin(i * 0.4) * 25 + Math.random() * 15,
        diskIO: 176 + Math.sin(i * 0.1) * 8 + Math.random() * 6,
        timestamp: new Date(Date.now() - (49 - i) * 60000),
        simulationId
      }))
    }
    
    return metricsData[simulationId as keyof typeof metricsData] || []
  }

  const simulation = getHardcodedSimulation(params.id)
  const metrics = getHardcodedMetrics(params.id)

  if (!simulation) {
    notFound()
  }

  // Calculate cost analysis
  const calculateCosts = () => {
    const baseInstanceCost = 15.50 // per instance per month
    const cpuCost = 8.00 // per core per month
    const memoryCost = 4.00 // per GB per month
    const storageCost = 0.10 // per GB per month

    const instanceCost = simulation.config.instances * baseInstanceCost
    const totalCpuCost = simulation.config.instances * simulation.config.cpuCores * cpuCost
    const totalMemoryCost = simulation.config.instances * simulation.config.memoryGB * memoryCost
    const totalStorageCost = simulation.config.instances * simulation.config.storageGB * storageCost

    const monthlyTotal = instanceCost + totalCpuCost + totalMemoryCost + totalStorageCost
    const dailyTotal = monthlyTotal / 30
    const hourlyTotal = dailyTotal / 24

    return {
      hourly: hourlyTotal,
      daily: dailyTotal,
      monthly: monthlyTotal,
      breakdown: {
        instances: instanceCost,
        cpu: totalCpuCost,
        memory: totalMemoryCost,
        storage: totalStorageCost,
      }
    }
  }

  // Calculate performance metrics
  const calculatePerformanceMetrics = () => {
    if (metrics.length === 0) return null

    const avgCpu = metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / metrics.length
    const avgMemory = metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / metrics.length
    const avgNetwork = metrics.reduce((sum, m) => sum + m.networkIO, 0) / metrics.length
    const avgDisk = metrics.reduce((sum, m) => sum + m.diskIO, 0) / metrics.length

    const maxCpu = Math.max(...metrics.map(m => m.cpuUsage))
    const maxMemory = Math.max(...metrics.map(m => m.memoryUsage))

    return {
      averages: { cpu: avgCpu, memory: avgMemory, network: avgNetwork, disk: avgDisk },
      peaks: { cpu: maxCpu, memory: maxMemory },
      efficiency: avgCpu < 70 && avgMemory < 80 ? 'Good' : avgCpu < 85 && avgMemory < 90 ? 'Fair' : 'Poor'
    }
  }

  // Generate forecasting data
  const generateForecast = () => {
    const costs = calculateCosts()
    const performance = calculatePerformanceMetrics()

    let recommendations = []

    if (performance && performance.averages.cpu < 30) {
      recommendations.push({
        type: 'cost-optimization',
        message: 'Consider reducing CPU cores to save costs',
        savings: costs.breakdown.cpu * 0.3
      })
    }

    if (performance && performance.averages.memory < 40) {
      recommendations.push({
        type: 'cost-optimization',
        message: 'Consider reducing memory allocation',
        savings: costs.breakdown.memory * 0.25
      })
    }

    if (performance && performance.peaks.cpu > 85) {
      recommendations.push({
        type: 'performance',
        message: 'Consider enabling auto-scaling for peak loads',
        impact: 'Improved reliability'
      })
    }

    return {
      projectedMonthlyCost: costs.monthly * (simulation.status === 'RUNNING' ? 1 : 0.1),
      recommendations,
      utilizationTrend: performance && performance.averages.cpu > 60 ? 'increasing' : 'stable'
    }
  }

  const costs = calculateCosts()
  const performance = calculatePerformanceMetrics()
  const forecast = generateForecast()

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/cloudsim">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Simulations
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{simulation.name}</h1>
                {simulation.description && (
                  <p className="text-gray-600 mt-1">{simulation.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant={simulation.status === 'RUNNING' ? 'default' : 'secondary'}
                className="text-sm px-3 py-1"
              >
                {simulation.status}
              </Badge>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${costs.monthly.toFixed(2)}/month
                </div>
                <div className="text-sm text-gray-500">Current cost</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">CPU Usage</div>
                    <div className="text-xl font-bold">
                      {performance?.averages.cpu.toFixed(1) || 0}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-500">Memory Usage</div>
                    <div className="text-xl font-bold">
                      {performance?.averages.memory.toFixed(1) || 0}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-500">Daily Cost</div>
                    <div className="text-xl font-bold">
                      ${costs.daily.toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-500">Efficiency</div>
                    <div className="text-xl font-bold">
                      {performance?.efficiency || 'N/A'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Metrics */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Live Performance Metrics</span>
                    {simulation.status === 'RUNNING' && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Live
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {metrics.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">CPU Usage</span>
                            <span className="text-sm text-gray-500">
                              {metrics[0]?.cpuUsage.toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={metrics[0]?.cpuUsage || 0}
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Avg: {performance?.averages.cpu.toFixed(1)}% | Peak: {performance?.peaks.cpu.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Memory Usage</span>
                            <span className="text-sm text-gray-500">
                              {metrics[0]?.memoryUsage.toFixed(1)}%
                            </span>
                          </div>
                          <Progress
                            value={metrics[0]?.memoryUsage || 0}
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Avg: {performance?.averages.memory.toFixed(1)}% | Peak: {performance?.peaks.memory.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm font-medium mb-2">Network I/O</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {metrics[0]?.networkIO.toFixed(0)} MB/s
                          </div>
                          <div className="text-xs text-gray-500">
                            Avg: {performance?.averages.network.toFixed(0)} MB/s
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Disk I/O</div>
                          <div className="text-2xl font-bold text-purple-600">
                            {metrics[0]?.diskIO.toFixed(0)} MB/s
                          </div>
                          <div className="text-xs text-gray-500">
                            Avg: {performance?.averages.disk.toFixed(0)} MB/s
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No metrics available. Start the simulation to see live data.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <MetricsChart
                metrics={metrics}
                title="Performance Metrics Over Time"
                isRealTime={simulation.status === 'RUNNING'}
              />

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Cost Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ${costs.hourly.toFixed(3)}
                      </div>
                      <div className="text-sm text-gray-500">Per Hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${costs.daily.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">Per Day</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        ${costs.monthly.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">Per Month</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Instances ({simulation.config.instances}x)</span>
                        <span className="text-sm font-medium">${costs.breakdown.instances.toFixed(2)}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">CPU ({simulation.config.instances * simulation.config.cpuCores} cores)</span>
                        <span className="text-sm font-medium">${costs.breakdown.cpu.toFixed(2)}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Memory ({simulation.config.instances * simulation.config.memoryGB} GB)</span>
                        <span className="text-sm font-medium">${costs.breakdown.memory.toFixed(2)}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Storage ({simulation.config.instances * simulation.config.storageGB} GB)</span>
                        <span className="text-sm font-medium">${costs.breakdown.storage.toFixed(2)}/month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Configuration & Forecasting */}
            <div className="space-y-6">
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Template:</span>
                      <span className="font-medium">{simulation.template}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium">{simulation.config.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instances:</span>
                      <span className="font-medium">{simulation.config.instances}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU Cores:</span>
                      <span className="font-medium">{simulation.config.cpuCores} per instance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Memory:</span>
                      <span className="font-medium">{simulation.config.memoryGB} GB per instance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span className="font-medium">{simulation.config.storageGB} GB per instance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto Scaling:</span>
                      <span className="font-medium">
                        {simulation.config.autoScaling ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">Enabled</Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Load Balancer:</span>
                      <span className="font-medium">
                        {simulation.config.loadBalancer ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">Enabled</Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Forecasting & Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Forecasting</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Projected Monthly Cost</div>
                      <div className="text-xl font-bold text-blue-600">
                        ${forecast.projectedMonthlyCost.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Based on current usage pattern
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">Utilization Trend</div>
                      <Badge variant={forecast.utilizationTrend === 'increasing' ? 'default' : 'outline'}>
                        {forecast.utilizationTrend}
                      </Badge>
                    </div>

                    {forecast.recommendations.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2">Recommendations</div>
                        <div className="space-y-2">
                          {forecast.recommendations.map((rec, index) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-start space-x-2">
                                {rec.type === 'cost-optimization' ? (
                                  <DollarSign className="w-4 h-4 text-blue-600 mt-0.5" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                                )}
                                <div>
                                  <div className="text-sm font-medium">{rec.message}</div>
                                  {rec.savings && (
                                    <div className="text-xs text-green-600">
                                      Potential savings: ${rec.savings.toFixed(2)}/month
                                    </div>
                                  )}
                                  {rec.impact && (
                                    <div className="text-xs text-blue-600">
                                      Impact: {rec.impact}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Control Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {simulation.status === 'STOPPED' && (
                        <Button
                          onClick={() => controlSimulation(params.id, 'start')}
                          disabled={loading}
                          className="w-full"
                        >
                          Start
                        </Button>
                      )}
                      {simulation.status === 'RUNNING' && (
                        <>
                          <Button
                            onClick={() => controlSimulation(params.id, 'pause')}
                            disabled={loading}
                            variant="outline"
                            className="w-full"
                          >
                            Pause
                          </Button>
                          <Button
                            onClick={() => controlSimulation(params.id, 'stop')}
                            disabled={loading}
                            variant="outline"
                            className="w-full"
                          >
                            Stop
                          </Button>
                        </>
                      )}
                      {simulation.status === 'PAUSED' && (
                        <>
                          <Button
                            onClick={() => controlSimulation(params.id, 'start')}
                            disabled={loading}
                            className="w-full"
                          >
                            Resume
                          </Button>
                          <Button
                            onClick={() => controlSimulation(params.id, 'stop')}
                            disabled={loading}
                            variant="outline"
                            className="w-full"
                          >
                            Stop
                          </Button>
                        </>
                      )}
                    </div>
                    <Button
                      onClick={() => deleteSimulation(params.id)}
                      disabled={loading || simulation.status === 'RUNNING'}
                      variant="destructive"
                      className="w-full"
                    >
                      Delete Simulation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SimulationDetailPage
