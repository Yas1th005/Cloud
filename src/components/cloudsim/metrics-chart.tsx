'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Activity } from 'lucide-react'

interface MetricsChartProps {
  metrics: {
    id: string
    cpuUsage: number
    memoryUsage: number
    networkIO: number
    diskIO: number
    timestamp: Date
    simulationId: string
  }[]
  title?: string
  isRealTime?: boolean
}

const MetricsChart: React.FC<MetricsChartProps> = ({
  metrics,
  title = "Performance Metrics",
  isRealTime = false
}) => {
  if (!metrics || metrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{title}</span>
          </CardTitle>
          <CardDescription>No data available to display</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Start the simulation to see performance metrics
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sort metrics by timestamp (newest first, but we'll reverse for chart)
  const sortedMetrics = [...metrics].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  // Take last 20 data points for better visualization
  const displayMetrics = sortedMetrics.slice(-20)

  // Calculate chart dimensions
  const chartWidth = 600
  const chartHeight = 300
  const padding = 40
  const innerWidth = chartWidth - 2 * padding
  const innerHeight = chartHeight - 2 * padding

  // Find min/max values for scaling
  const allValues = displayMetrics.flatMap(m => [m.cpuUsage, m.memoryUsage, m.networkIO / 10, m.diskIO / 10])
  const minValue = 0
  const maxValue = Math.max(100, Math.max(...allValues))

  // Create scale functions
  const xScale = (index: number) => padding + (index / (displayMetrics.length - 1)) * innerWidth
  const yScale = (value: number) => chartHeight - padding - (value / maxValue) * innerHeight

  // Generate path data for each metric
  const createPath = (values: number[]) => {
    return values
      .map((value, index) => `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(value)}`)
      .join(' ')
  }

  const cpuPath = createPath(displayMetrics.map(m => m.cpuUsage))
  const memoryPath = createPath(displayMetrics.map(m => m.memoryUsage))
  const networkPath = createPath(displayMetrics.map(m => m.networkIO / 10)) // Scale down for visibility
  const diskPath = createPath(displayMetrics.map(m => m.diskIO / 10)) // Scale down for visibility

  // Generate grid lines
  const gridLines = []
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i / 5) * innerHeight
    const value = maxValue - (i / 5) * maxValue
    gridLines.push(
      <g key={i}>
        <line
          x1={padding}
          y1={y}
          x2={chartWidth - padding}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <text
          x={padding - 10}
          y={y + 4}
          fill="#6b7280"
          fontSize="12"
          textAnchor="end"
        >
          {value.toFixed(0)}
        </text>
      </g>
    )
  }

  // Time labels
  const timeLabels = []
  const labelCount = Math.min(5, displayMetrics.length)
  for (let i = 0; i < labelCount; i++) {
    const index = Math.floor((i / (labelCount - 1)) * (displayMetrics.length - 1))
    const metric = displayMetrics[index]
    if (metric) {
      const x = xScale(index)
      const time = new Date(metric.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      timeLabels.push(
        <text
          key={i}
          x={x}
          y={chartHeight - padding + 20}
          fill="#6b7280"
          fontSize="12"
          textAnchor="middle"
        >
          {time}
        </text>
      )
    }
  }

  // Latest values for legend
  const latest = displayMetrics[displayMetrics.length - 1]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>{title}</span>
            </CardTitle>
            <CardDescription>
              Performance metrics over time
              {isRealTime && (
                <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              )}
            </CardDescription>
          </div>
          <div className="text-sm text-gray-600">
            {displayMetrics.length} data points
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart */}
        <div className="mb-6">
          <svg width={chartWidth} height={chartHeight + 40} className="w-full h-auto">
            {/* Grid lines */}
            {gridLines}
            
            {/* Chart area background */}
            <rect
              x={padding}
              y={padding}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            
            {/* Data lines */}
            <path
              d={cpuPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            <path
              d={memoryPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            <path
              d={networkPath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            <path
              d={diskPath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            
            {/* Data points */}
            {displayMetrics.map((metric, index) => (
              <g key={index}>
                <circle
                  cx={xScale(index)}
                  cy={yScale(metric.cpuUsage)}
                  r="3"
                  fill="#3b82f6"
                  className="drop-shadow-sm"
                />
                <circle
                  cx={xScale(index)}
                  cy={yScale(metric.memoryUsage)}
                  r="3"
                  fill="#10b981"
                  className="drop-shadow-sm"
                />
                <circle
                  cx={xScale(index)}
                  cy={yScale(metric.networkIO / 10)}
                  r="3"
                  fill="#8b5cf6"
                  className="drop-shadow-sm"
                />
                <circle
                  cx={xScale(index)}
                  cy={yScale(metric.diskIO / 10)}
                  r="3"
                  fill="#f59e0b"
                  className="drop-shadow-sm"
                />
              </g>
            ))}
            
            {/* Time labels */}
            {timeLabels}
            
            {/* Axis labels */}
            <text
              x={chartWidth / 2}
              y={chartHeight + 35}
              fill="#6b7280"
              fontSize="14"
              textAnchor="middle"
              fontWeight="500"
            >
              Time
            </text>
            <text
              x={15}
              y={chartHeight / 2}
              fill="#6b7280"
              fontSize="14"
              textAnchor="middle"
              fontWeight="500"
              transform={`rotate(-90 15 ${chartHeight / 2})`}
            >
              Usage (%)
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium">CPU Usage</div>
              <div className="text-lg font-bold text-blue-600">
                {latest?.cpuUsage.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium">Memory Usage</div>
              <div className="text-lg font-bold text-green-600">
                {latest?.memoryUsage.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium">Network I/O</div>
              <div className="text-lg font-bold text-purple-600">
                {latest?.networkIO.toFixed(0)} MB/s
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium">Disk I/O</div>
              <div className="text-lg font-bold text-yellow-600">
                {latest?.diskIO.toFixed(0)} MB/s
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Avg CPU</div>
              <div className="font-medium">
                {(displayMetrics.reduce((sum, m) => sum + m.cpuUsage, 0) / displayMetrics.length).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Avg Memory</div>
              <div className="font-medium">
                {(displayMetrics.reduce((sum, m) => sum + m.memoryUsage, 0) / displayMetrics.length).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Peak CPU</div>
              <div className="font-medium">
                {Math.max(...displayMetrics.map(m => m.cpuUsage)).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Peak Memory</div>
              <div className="font-medium">
                {Math.max(...displayMetrics.map(m => m.memoryUsage)).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {isRealTime && (
          <div className="mt-4 text-xs text-blue-600 flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            Chart updates automatically every 5 seconds
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MetricsChart