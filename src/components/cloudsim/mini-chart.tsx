'use client'
import React from 'react'

interface MiniChartProps {
  metrics: {
    cpuUsage: number
    memoryUsage: number
    timestamp: Date
  }[]
  width?: number
  height?: number
  showLabels?: boolean
}

const MiniChart: React.FC<MiniChartProps> = ({
  metrics,
  width = 200,
  height = 60,
  showLabels = false
}) => {
  if (!metrics || metrics.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 rounded border"
        style={{ width, height }}
      >
        <span className="text-xs text-gray-400">No data</span>
      </div>
    )
  }

  // Sort and take last 10 data points
  const sortedMetrics = [...metrics]
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-10)

  const padding = 8
  const innerWidth = width - 2 * padding
  const innerHeight = height - 2 * padding

  // Find max values for scaling
  const maxCpu = Math.max(...sortedMetrics.map(m => m.cpuUsage), 50)
  const maxMemory = Math.max(...sortedMetrics.map(m => m.memoryUsage), 50)
  const maxValue = Math.max(maxCpu, maxMemory)

  // Create scale functions
  const xScale = (index: number) => padding + (index / (sortedMetrics.length - 1)) * innerWidth
  const yScale = (value: number) => height - padding - (value / maxValue) * innerHeight

  // Generate path data
  const createPath = (values: number[]) => {
    if (values.length === 0) return ''
    return values
      .map((value, index) => `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(value)}`)
      .join(' ')
  }

  const cpuPath = createPath(sortedMetrics.map(m => m.cpuUsage))
  const memoryPath = createPath(sortedMetrics.map(m => m.memoryUsage))

  const latest = sortedMetrics[sortedMetrics.length - 1]

  return (
    <div className="relative">
      <svg width={width} height={height} className="bg-gray-50 rounded border">
        {/* Grid lines */}
        <line
          x1={padding}
          y1={height / 2}
          x2={width - padding}
          y2={height / 2}
          stroke="#e5e7eb"
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* CPU line */}
        <path
          d={cpuPath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Memory line */}
        <path
          d={memoryPath}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {sortedMetrics.map((metric, index) => (
          <g key={index}>
            <circle
              cx={xScale(index)}
              cy={yScale(metric.cpuUsage)}
              r="2"
              fill="#3b82f6"
            />
            <circle
              cx={xScale(index)}
              cy={yScale(metric.memoryUsage)}
              r="2"
              fill="#10b981"
            />
          </g>
        ))}
      </svg>
      
      {showLabels && latest && (
        <div className="absolute top-1 right-1 text-xs bg-white bg-opacity-90 rounded px-1">
          <div className="text-blue-600">CPU: {latest.cpuUsage.toFixed(0)}%</div>
          <div className="text-green-600">MEM: {latest.memoryUsage.toFixed(0)}%</div>
        </div>
      )}
    </div>
  )
}

export default MiniChart