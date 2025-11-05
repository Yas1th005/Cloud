'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Activity, Cpu, MemoryStick, Network, HardDrive } from 'lucide-react'

interface ResourceMetricsProps {
  metrics: {
    cpuUsage: number
    memoryUsage: number
    networkIO: number
    diskIO: number
    timestamp: Date
  }[]
  isRealTime?: boolean
}

const ResourceMetrics: React.FC<ResourceMetricsProps> = ({
  metrics,
  isRealTime = false,
}) => {
  const latestMetrics = metrics[0]

  if (!latestMetrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Resource Metrics</span>
          </CardTitle>
          <CardDescription>
            No metrics available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Start the simulation to see resource metrics
          </p>
        </CardContent>
      </Card>
    )
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'text-red-600'
    if (usage >= 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getProgressColor = (usage: number) => {
    if (usage >= 80) return 'bg-red-500'
    if (usage >= 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <CardTitle>Resource Metrics</CardTitle>
          </div>
          {isRealTime && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live
            </Badge>
          )}
        </div>
        <CardDescription>
          Last updated: {latestMetrics.timestamp.toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CPU Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">CPU Usage</span>
            </div>
            <span className={`text-sm font-bold ${getUsageColor(latestMetrics.cpuUsage)}`}>
              {latestMetrics.cpuUsage.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={latestMetrics.cpuUsage} 
              className="h-2"
            />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${getProgressColor(latestMetrics.cpuUsage)}`}
              style={{ width: `${latestMetrics.cpuUsage}%` }}
            />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MemoryStick className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Memory Usage</span>
            </div>
            <span className={`text-sm font-bold ${getUsageColor(latestMetrics.memoryUsage)}`}>
              {latestMetrics.memoryUsage.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={latestMetrics.memoryUsage} 
              className="h-2"
            />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${getProgressColor(latestMetrics.memoryUsage)}`}
              style={{ width: `${latestMetrics.memoryUsage}%` }}
            />
          </div>
        </div>

        {/* Network I/O */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Network className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Network I/O</span>
            </div>
            <span className="text-sm font-bold text-blue-600">
              {formatBytes(latestMetrics.networkIO)}/s
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((latestMetrics.networkIO / 1000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Disk I/O */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Disk I/O</span>
            </div>
            <span className="text-sm font-bold text-purple-600">
              {formatBytes(latestMetrics.diskIO)}/s
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((latestMetrics.diskIO / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Historical Data Summary */}
        {metrics.length > 1 && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Last 10 readings</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Avg CPU:</span>
                <span className="ml-2 font-medium">
                  {(metrics.reduce((acc, m) => acc + m.cpuUsage, 0) / metrics.length).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-gray-500">Avg Memory:</span>
                <span className="ml-2 font-medium">
                  {(metrics.reduce((acc, m) => acc + m.memoryUsage, 0) / metrics.length).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-gray-500">Peak CPU:</span>
                <span className="ml-2 font-medium">
                  {Math.max(...metrics.map(m => m.cpuUsage)).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-gray-500">Peak Memory:</span>
                <span className="ml-2 font-medium">
                  {Math.max(...metrics.map(m => m.memoryUsage)).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ResourceMetrics
