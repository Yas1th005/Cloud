'use client'
import React from 'react'
import InfoBar from '@/components/infobar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Play, Pause, Square, Activity, Server, Cloud, Eye, BarChart3 } from 'lucide-react'
import { useCloudSim } from '@/hooks/cloudsim/use-cloudsim'
import SystemMetricsDisplay from '@/components/cloudsim/system-metrics-display'
import MiniChart from '@/components/cloudsim/mini-chart'
import Link from 'next/link'

const CloudSimPage = () => {
  const { simulations, stats, controlSimulation, loading, getMetrics } = useCloudSim()

  // Hardcoded simulations data
  const displaySimulations = [
    {
      id: '1',
      name: 'Web Server Cluster',
      status: 'RUNNING',
      config: { instances: 3, region: 'us-east-1' },
      createdAt: new Date('2025-10-15'),
      metrics: [{ cpuUsage: 45.2, memoryUsage: 62.1, networkIO: 128.5, diskIO: 89.3 }]
    },
    {
      id: '2', 
      name: 'Database Replica',
      status: 'RUNNING',
      config: { instances: 2, region: 'us-west-2' },
      createdAt: new Date('2025-10-20'),
      metrics: [{ cpuUsage: 78.9, memoryUsage: 85.4, networkIO: 245.7, diskIO: 156.2 }]
    },
    {
      id: '3',
      name: 'Load Balancer',
      status: 'STOPPED',
      config: { instances: 1, region: 'eu-west-1' },
      createdAt: new Date('2025-10-25'),
      metrics: [{ cpuUsage: 12.3, memoryUsage: 28.7, networkIO: 45.2, diskIO: 23.1 }]
    },
    {
      id: '4',
      name: 'Cache Layer',
      status: 'RUNNING',
      config: { instances: 4, region: 'us-east-1' },
      createdAt: new Date('2025-10-28'),
      metrics: [{ cpuUsage: 34.6, memoryUsage: 91.2, networkIO: 189.4, diskIO: 67.8 }]
    },
    {
      id: '5',
      name: 'Analytics Pipeline',
      status: 'PAUSED',
      config: { instances: 2, region: 'ap-southeast-1' },
      createdAt: new Date('2025-11-01'),
      metrics: [{ cpuUsage: 23.8, memoryUsage: 45.3, networkIO: 78.9, diskIO: 112.5 }]
    },
    {
      id: '6',
      name: 'Microservices Stack',
      status: 'RUNNING',
      config: { instances: 6, region: 'us-west-2' },
      createdAt: new Date('2025-11-02'),
      metrics: [{ cpuUsage: 56.7, memoryUsage: 73.4, networkIO: 298.6, diskIO: 178.9 }]
    }
  ]
  const displayStats = stats

  // Hardcoded performance trend data for each simulation
  const getHardcodedMetrics = (simulationId: string) => {
    const metricsData = {
      '1': [ // Web Server Cluster - steady performance with slight variations
        { cpuUsage: 42.1, memoryUsage: 58.3, networkIO: 120.2, diskIO: 85.1, timestamp: new Date() },
        { cpuUsage: 44.3, memoryUsage: 60.1, networkIO: 125.7, diskIO: 87.4, timestamp: new Date() },
        { cpuUsage: 43.7, memoryUsage: 61.2, networkIO: 128.9, diskIO: 88.2, timestamp: new Date() },
        { cpuUsage: 45.8, memoryUsage: 62.8, networkIO: 132.1, diskIO: 89.7, timestamp: new Date() },
        { cpuUsage: 44.9, memoryUsage: 61.9, networkIO: 129.3, diskIO: 88.9, timestamp: new Date() },
        { cpuUsage: 46.2, memoryUsage: 63.4, networkIO: 135.2, diskIO: 90.1, timestamp: new Date() },
        { cpuUsage: 45.1, memoryUsage: 62.7, networkIO: 131.8, diskIO: 89.5, timestamp: new Date() },
        { cpuUsage: 44.6, memoryUsage: 61.8, networkIO: 127.4, diskIO: 88.7, timestamp: new Date() },
        { cpuUsage: 45.9, memoryUsage: 62.9, networkIO: 133.6, diskIO: 89.8, timestamp: new Date() },
        { cpuUsage: 45.2, memoryUsage: 62.1, networkIO: 128.5, diskIO: 89.3, timestamp: new Date() }
      ],
      '2': [ // Database Replica - high usage with spikes
        { cpuUsage: 72.3, memoryUsage: 78.9, networkIO: 220.1, diskIO: 145.2, timestamp: new Date() },
        { cpuUsage: 75.6, memoryUsage: 81.2, networkIO: 235.8, diskIO: 152.4, timestamp: new Date() },
        { cpuUsage: 77.1, memoryUsage: 83.7, networkIO: 248.3, diskIO: 158.9, timestamp: new Date() },
        { cpuUsage: 79.8, memoryUsage: 86.1, networkIO: 252.6, diskIO: 162.1, timestamp: new Date() },
        { cpuUsage: 76.4, memoryUsage: 82.8, networkIO: 241.7, diskIO: 154.8, timestamp: new Date() },
        { cpuUsage: 78.2, memoryUsage: 84.9, networkIO: 246.2, diskIO: 157.3, timestamp: new Date() },
        { cpuUsage: 77.8, memoryUsage: 84.1, networkIO: 243.9, diskIO: 155.7, timestamp: new Date() },
        { cpuUsage: 76.9, memoryUsage: 83.2, networkIO: 239.4, diskIO: 153.6, timestamp: new Date() },
        { cpuUsage: 78.5, memoryUsage: 85.2, networkIO: 247.8, diskIO: 158.1, timestamp: new Date() },
        { cpuUsage: 78.9, memoryUsage: 85.4, networkIO: 245.7, diskIO: 156.2, timestamp: new Date() }
      ],
      '3': [ // Load Balancer - low usage (stopped)
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 0, memoryUsage: 0, networkIO: 0, diskIO: 0, timestamp: new Date() },
        { cpuUsage: 12.3, memoryUsage: 28.7, networkIO: 45.2, diskIO: 23.1, timestamp: new Date() }
      ],
      '4': [ // Cache Layer - high memory, moderate CPU
        { cpuUsage: 31.2, memoryUsage: 87.4, networkIO: 175.8, diskIO: 62.3, timestamp: new Date() },
        { cpuUsage: 32.7, memoryUsage: 88.9, networkIO: 182.1, diskIO: 64.7, timestamp: new Date() },
        { cpuUsage: 33.1, memoryUsage: 89.6, networkIO: 186.7, diskIO: 66.1, timestamp: new Date() },
        { cpuUsage: 35.4, memoryUsage: 91.8, networkIO: 193.2, diskIO: 69.4, timestamp: new Date() },
        { cpuUsage: 34.8, memoryUsage: 90.7, networkIO: 188.9, diskIO: 67.9, timestamp: new Date() },
        { cpuUsage: 33.9, memoryUsage: 89.8, networkIO: 184.3, diskIO: 66.5, timestamp: new Date() },
        { cpuUsage: 34.2, memoryUsage: 90.1, networkIO: 187.6, diskIO: 67.2, timestamp: new Date() },
        { cpuUsage: 33.5, memoryUsage: 89.4, networkIO: 183.7, diskIO: 66.8, timestamp: new Date() },
        { cpuUsage: 34.9, memoryUsage: 91.5, networkIO: 191.8, diskIO: 68.3, timestamp: new Date() },
        { cpuUsage: 34.6, memoryUsage: 91.2, networkIO: 189.4, diskIO: 67.8, timestamp: new Date() }
      ],
      '5': [ // Analytics Pipeline - moderate usage (paused recently)
        { cpuUsage: 28.4, memoryUsage: 48.7, networkIO: 89.3, diskIO: 124.7, timestamp: new Date() },
        { cpuUsage: 26.7, memoryUsage: 46.9, networkIO: 85.1, diskIO: 119.2, timestamp: new Date() },
        { cpuUsage: 25.3, memoryUsage: 45.2, networkIO: 82.7, diskIO: 116.8, timestamp: new Date() },
        { cpuUsage: 24.1, memoryUsage: 44.1, networkIO: 79.8, diskIO: 114.3, timestamp: new Date() },
        { cpuUsage: 23.9, memoryUsage: 43.8, networkIO: 78.2, diskIO: 113.1, timestamp: new Date() },
        { cpuUsage: 23.2, memoryUsage: 43.1, networkIO: 76.9, diskIO: 111.8, timestamp: new Date() },
        { cpuUsage: 22.8, memoryUsage: 42.7, networkIO: 75.4, diskIO: 110.9, timestamp: new Date() },
        { cpuUsage: 23.1, memoryUsage: 43.4, networkIO: 77.1, diskIO: 111.7, timestamp: new Date() },
        { cpuUsage: 23.5, memoryUsage: 44.8, networkIO: 78.6, diskIO: 112.3, timestamp: new Date() },
        { cpuUsage: 23.8, memoryUsage: 45.3, networkIO: 78.9, diskIO: 112.5, timestamp: new Date() }
      ],
      '6': [ // Microservices Stack - high across all metrics
        { cpuUsage: 52.3, memoryUsage: 68.7, networkIO: 278.4, diskIO: 165.2, timestamp: new Date() },
        { cpuUsage: 54.1, memoryUsage: 70.9, networkIO: 285.7, diskIO: 170.8, timestamp: new Date() },
        { cpuUsage: 55.8, memoryUsage: 72.1, networkIO: 291.3, diskIO: 174.6, timestamp: new Date() },
        { cpuUsage: 57.2, memoryUsage: 74.8, networkIO: 302.1, diskIO: 182.3, timestamp: new Date() },
        { cpuUsage: 56.1, memoryUsage: 73.2, networkIO: 296.8, diskIO: 177.9, timestamp: new Date() },
        { cpuUsage: 55.4, memoryUsage: 71.9, networkIO: 289.7, diskIO: 173.4, timestamp: new Date() },
        { cpuUsage: 56.8, memoryUsage: 73.6, networkIO: 294.2, diskIO: 176.7, timestamp: new Date() },
        { cpuUsage: 57.3, memoryUsage: 74.1, networkIO: 297.9, diskIO: 179.1, timestamp: new Date() },
        { cpuUsage: 56.9, memoryUsage: 73.8, networkIO: 300.4, diskIO: 180.2, timestamp: new Date() },
        { cpuUsage: 56.7, memoryUsage: 73.4, networkIO: 298.6, diskIO: 178.9, timestamp: new Date() }
      ]
    }
    
    return metricsData[simulationId as keyof typeof metricsData] || []
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return 'text-green-600 bg-green-100'
      case 'STOPPED':
        return 'text-red-600 bg-red-100'
      case 'PAUSED':
        return 'text-yellow-600 bg-yellow-100'
      case 'ERROR':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return <Play className="w-4 h-4" />
      case 'STOPPED':
        return <Square className="w-4 h-4" />
      case 'PAUSED':
        return <Pause className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cloud Simulation</h1>
            <p className="text-gray-600 mt-2">
              Manage and monitor your cloud infrastructure simulations
            </p>
          </div>
          <div className="flex space-x-3">
            <Link href="cloudsim/metrics">
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                View Analytics Dashboard
              </Button>
            </Link>
            <Link href="cloudsim/results">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <BarChart3 className="w-4 h-4 mr-2" />
                Results & Analysis
              </Button>
            </Link>
            <Link href="/dashboard/cloudsim/create">
              <Button className="bg-orange hover:bg-orange/90">
                <Plus className="w-4 h-4 mr-2" />
                New Simulation
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Simulations</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running</CardTitle>
              <Play className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                5
              </div>
              <p className="text-xs text-muted-foreground">
                Active simulations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Instances</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                18
              </div>
              <p className="text-xs text-muted-foreground">
                Across all simulations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg CPU Usage</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                67%
              </div>
              <p className="text-xs text-muted-foreground">
                Across running instances
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Live System Metrics */}
        <div className="mb-8">
          <SystemMetricsDisplay />
        </div>

        {/* Simulations List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Simulations</h2>
          
          {displaySimulations.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No simulations yet</h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first cloud simulation
                </p>
                <Link href="/cloudsim/create">
                  <Button className="bg-orange hover:bg-orange/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Simulation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {displaySimulations.map((simulation) => (
                <Card key={simulation.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Link href={`/cloudsim/${simulation.id}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(simulation.status)}`}>
                            {getStatusIcon(simulation.status)}
                            <span>{simulation.status}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg hover:text-blue-600 transition-colors">{simulation.name}</CardTitle>
                            <CardDescription>
                              {simulation.config?.instances || 1} instances • {simulation.config?.region || 'us-east-1'}
                            </CardDescription>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${((simulation.config?.instances || 1) * 15.50).toFixed(2)}/month
                          </div>
                          <div className="text-xs text-gray-500">Estimated cost</div>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/cloudsim/${simulation.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          {simulation.status === 'STOPPED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              disabled={loading}
                              onClick={(e) => {
                                e.preventDefault()
                                controlSimulation(simulation.id, 'start')
                              }}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {simulation.status === 'PAUSED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              disabled={loading}
                              onClick={(e) => {
                                e.preventDefault()
                                controlSimulation(simulation.id, 'start')
                              }}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {simulation.status === 'RUNNING' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                              disabled={loading}
                              onClick={(e) => {
                                e.preventDefault()
                                controlSimulation(simulation.id, 'pause')
                              }}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          {(simulation.status === 'RUNNING' || simulation.status === 'PAUSED') && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              disabled={loading}
                              onClick={(e) => {
                                e.preventDefault()
                                controlSimulation(simulation.id, 'stop')
                              }}
                            >
                              <Square className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">CPU Usage</span>
                        <div className="font-medium">{simulation.metrics?.[0]?.cpuUsage?.toFixed(1) || 0}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Memory Usage</span>
                        <div className="font-medium">{simulation.metrics?.[0]?.memoryUsage?.toFixed(1) || 0}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Instances</span>
                        <div className="font-medium">{simulation.config?.instances || 1}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Created</span>
                        <div className="font-medium">{simulation.createdAt.toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    {/* Mini Performance Chart */}
                    {simulation.metrics && simulation.metrics.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Performance Trend</span>
                          <span className="text-xs text-gray-500">Last 10 points</span>
                        </div>
                        <MiniChart
                          metrics={getHardcodedMetrics(simulation.id)}
                          width={300}
                          height={80}
                          showLabels={true}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CloudSimPage
