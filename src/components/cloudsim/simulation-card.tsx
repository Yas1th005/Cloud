'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Pause, Square, Settings, Eye } from 'lucide-react'

interface SimulationCardProps {
  simulation: {
    id: string
    name: string
    description?: string
    status: 'RUNNING' | 'STOPPED' | 'PAUSED' | 'ERROR'
    instances: number
    region: string
    cpuUsage?: number
    memoryUsage?: number
    createdAt: Date
  }
  onView?: (id: string) => void
  onControl?: (id: string, action: 'start' | 'stop' | 'pause') => void
  onSettings?: (id: string) => void
}

const SimulationCard: React.FC<SimulationCardProps> = ({
  simulation,
  onView,
  onControl,
  onSettings,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-100 text-green-800'
      case 'STOPPED':
        return 'bg-red-100 text-red-800'
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800'
      case 'ERROR':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return <Play className="w-3 h-3" />
      case 'STOPPED':
        return <Square className="w-3 h-3" />
      case 'PAUSED':
        return <Pause className="w-3 h-3" />
      default:
        return <Square className="w-3 h-3" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-base font-semibold truncate">
                {simulation.name}
              </CardTitle>
              <Badge className={`${getStatusColor(simulation.status)} flex items-center space-x-1 text-xs`}>
                {getStatusIcon(simulation.status)}
                <span>{simulation.status}</span>
              </Badge>
            </div>
            {simulation.description && (
              <CardDescription className="text-sm text-gray-600 line-clamp-2">
                {simulation.description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Instances</span>
            <div className="font-medium">{simulation.instances}</div>
          </div>
          <div>
            <span className="text-gray-500">Region</span>
            <div className="font-medium">{simulation.region}</div>
          </div>
        </div>

        {/* Resource Usage (if running) */}
        {simulation.status === 'RUNNING' && simulation.cpuUsage !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">CPU</span>
              <span className="font-medium">{simulation.cpuUsage}%</span>
            </div>
            {simulation.memoryUsage !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Memory</span>
                <span className="font-medium">{simulation.memoryUsage}%</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex space-x-1">
            {simulation.status === 'STOPPED' && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onControl?.(simulation.id, 'start')
                }}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Play className="w-3 h-3" />
              </Button>
            )}
            {simulation.status === 'RUNNING' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onControl?.(simulation.id, 'pause')
                  }}
                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                >
                  <Pause className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onControl?.(simulation.id, 'stop')
                  }}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <Square className="w-3 h-3" />
                </Button>
              </>
            )}
            {simulation.status === 'PAUSED' && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  onControl?.(simulation.id, 'start')
                }}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Play className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                onView?.(simulation.id)
              }}
            >
              <Eye className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                onSettings?.(simulation.id)
              }}
            >
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Created Date */}
        <div className="text-xs text-gray-500">
          Created {formatDate(simulation.createdAt)}
        </div>
      </CardContent>
    </Card>
  )
}

export default SimulationCard
