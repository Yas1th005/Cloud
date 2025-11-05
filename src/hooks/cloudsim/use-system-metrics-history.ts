'use client'
import { useState, useEffect, useCallback } from 'react'
import { getSystemMetrics } from '@/lib/system-metrics'

interface SystemMetricPoint {
  cpuUsage: number
  memoryUsage: number
  networkIO: number
  diskIO: number
  timestamp: Date
}

export const useSystemMetricsHistory = (intervalMs: number = 5000, maxPoints: number = 50) => {
  const [metrics, setMetrics] = useState<SystemMetricPoint[]>([])
  const [loading, setLoading] = useState(true)

  const collectMetric = useCallback(async () => {
    try {
      const systemMetrics = await getSystemMetrics()
      const newPoint: SystemMetricPoint = {
        ...systemMetrics,
        timestamp: new Date()
      }

      setMetrics(prev => {
        const updated = [...prev, newPoint]
        // Keep only the last maxPoints
        return updated.length > maxPoints ? updated.slice(-maxPoints) : updated
      })
      setLoading(false)
    } catch (error) {
      console.error('Failed to collect system metrics:', error)
      setLoading(false)
    }
  }, [maxPoints])

  useEffect(() => {
    // Collect initial metric
    collectMetric()

    // Set up interval
    const interval = setInterval(collectMetric, intervalMs)

    return () => clearInterval(interval)
  }, [collectMetric, intervalMs])

  const clearMetrics = useCallback(() => {
    setMetrics([])
  }, [])

  return {
    metrics,
    loading,
    clearMetrics
  }
}