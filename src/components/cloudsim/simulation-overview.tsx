'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Pause, 
  Square, 
  MoreHorizontal, 
  Activity, 
  Server, 
  HardDrive,
  Cpu,
  MemoryStick
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SimulationOverviewProps {
  simulation: {
    id: string
    name: string
    description?: string
    status: 'RUNNING' | 'STOPPED' | 'PAUSED' | 'ERROR'
    config: {
      instances: number
      cpuCores: number
      memoryGB: number
      storageGB: number
      region: string
      autoScaling: boolean
      loadBalancer: boolean
    }
    metrics?: {
      cpuUsage: number
      memoryUsage: number
      networkIO: number
      diskIO: number
    }
    createdAt: Date
    updatedAt: Date
  }
  onControl?: (action: 'start' | 'stop' | 'pause' | 'restart') => void
  onEdit?: () => void
  onDelete?: () => void
}

const SimulationOverview: React.FC<SimulationOverviewProps> = ({
  simulation,
  onControl,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'STOPPED':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'ERROR':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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
        return <Activity className="w-3 h-3" />
    }
  }

  const formatBytes = (bytes: number) => {
    return `${bytes} GB`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg font-semibold">{simulation.name}</CardTitle>
              <Badge className={`${getStatusColor(simulation.status)} flex items-center space-x-1`}>
                {getStatusIcon(simulation.status)}
                <span className="text-xs font-medium">{simulation.status}</span>
              </Badge>
            </div>
            {simulation.description && (
              <CardDescription className="text-sm text-gray-600">
                {simulation.description}
              </CardDescription>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={onEdit}>
                  Edit Simulation
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onControl?.('restart')}>
                Restart
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  Delete Simulation
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Control Buttons */}
        <div className="flex space-x-2">
          {simulation.status === 'STOPPED' && (
            <Button 
              size="sm" 
              onClick={() => onControl?.('start')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4 mr-1" />
              Start
            </Button>
          )}
          {simulation.status === 'RUNNING' && (
            <>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onControl?.('pause')}
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
              >
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onControl?.('stop')}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <Square className="w-4 h-4 mr-1" />
                Stop
              </Button>
            </>
          )}
          {simulation.status === 'PAUSED' && (
            <Button 
              size="sm" 
              onClick={() => onControl?.('start')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="w-4 h-4 mr-1" />
              Resume
            </Button>
          )}
        </div>

        {/* Configuration Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium">{simulation.config.instances}</div>
              <div className="text-xs text-gray-500">Instances</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium">{simulation.config.cpuCores}</div>
              <div className="text-xs text-gray-500">CPU Cores</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <MemoryStick className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium">{formatBytes(simulation.config.memoryGB)}</div>
              <div className="text-xs text-gray-500">Memory</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium">{formatBytes(simulation.config.storageGB)}</div>
              <div className="text-xs text-gray-500">Storage</div>
            </div>
          </div>
        </div>

        {/* Metrics (if available) */}
        {simulation.metrics && simulation.status === 'RUNNING' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Resource Usage</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Usage</span>
                  <span>{simulation.metrics.cpuUsage}%</span>
                </div>
                <Progress value={simulation.metrics.cpuUsage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory Usage</span>
                  <span>{simulation.metrics.memoryUsage}%</span>
                </div>
                <Progress value={simulation.metrics.memoryUsage} className="h-2" />
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Region: {simulation.config.region}</span>
            <span>Created: {formatDate(simulation.createdAt)}</span>
          </div>
          {(simulation.config.autoScaling || simulation.config.loadBalancer) && (
            <div className="flex space-x-2 mt-2">
              {simulation.config.autoScaling && (
                <Badge variant="secondary" className="text-xs">Auto Scaling</Badge>
              )}
              {simulation.config.loadBalancer && (
                <Badge variant="secondary" className="text-xs">Load Balancer</Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SimulationOverview
