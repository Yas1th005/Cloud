'use client'
import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { CreateSimulationProps, UpdateSimulationProps } from '@/schemas/cloudsim.schema'
import {
  CloudSimulation,
  SimulationMetric,
  getSimulations,
  getSimulation,
  createSimulation as createSimulationStorage,
  updateSimulation as updateSimulationStorage,
  deleteSimulation as deleteSimulationStorage,
  getSimulationMetrics,
  addSimulationMetric,
  getSimulationStats,
} from '@/lib/cloudsim-storage'
import { getSystemMetrics } from '@/lib/system-metrics'

// Generate realistic metrics for running simulations using actual system metrics
const generateMetrics = async (simulationId: string): Promise<Omit<SimulationMetric, 'id'>> => {
  try {
    const systemMetrics = await getSystemMetrics()
    
    return {
      cpuUsage: systemMetrics.cpuUsage,
      memoryUsage: systemMetrics.memoryUsage,
      networkIO: systemMetrics.networkIO,
      diskIO: systemMetrics.diskIO,
      timestamp: new Date(),
      simulationId,
    }
  } catch (error) {
    console.warn('Failed to get system metrics, using fallback:', error)
    // Fallback to random values if system metrics fail
    return {
      cpuUsage: Math.random() * 40 + 20,
      memoryUsage: Math.random() * 50 + 30,
      networkIO: Math.random() * 1000 + 100,
      diskIO: Math.random() * 500 + 50,
      timestamp: new Date(),
      simulationId,
    }
  }
}

export const useCloudSim = () => {
  const [loading, setLoading] = useState(false)
  const [simulations, setSimulations] = useState<CloudSimulation[]>([])
  const [stats, setStats] = useState({ total: 0, running: 0, stopped: 0, paused: 0 })
  const { toast } = useToast()

  // Load simulations from localStorage
  const loadSimulations = useCallback(() => {
    const sims = getSimulations()
    setSimulations(sims)
    setStats(getSimulationStats())
  }, [])

  // Initialize and load simulations on mount
  useEffect(() => {
    loadSimulations()
  }, [loadSimulations])

  // Generate metrics for running simulations
  useEffect(() => {
    const interval = setInterval(async () => {
      const runningSims = simulations.filter(sim => sim.status === 'RUNNING')
      for (const sim of runningSims) {
        const metrics = await generateMetrics(sim.id)
        addSimulationMetric(metrics)
      }
    }, 5000) // Generate metrics every 5 seconds

    return () => clearInterval(interval)
  }, [simulations])

  const createSimulation = async (data: CreateSimulationProps) => {
    setLoading(true)
    try {
      const simulation = createSimulationStorage(data)

      toast({
        title: 'Success',
        description: 'Simulation created successfully',
      })

      loadSimulations() // Refresh the list
      return { success: true, simulation }
    } catch (error) {
      const errorMessage = 'Failed to create simulation'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const controlSimulation = async (
    simulationId: string,
    action: 'start' | 'stop' | 'pause' | 'restart'
  ) => {
    setLoading(true)
    try {
      const simulation = getSimulation(simulationId)
      if (!simulation) {
        throw new Error('Simulation not found')
      }

      // Determine new status based on action and current status
      let newStatus: 'RUNNING' | 'STOPPED' | 'PAUSED' | 'ERROR'
      let message: string

      switch (action) {
        case 'start':
          if (simulation.status === 'RUNNING') {
            throw new Error('Simulation is already running')
          }
          newStatus = 'RUNNING'
          message = 'Simulation started successfully'
          break

        case 'stop':
          if (simulation.status === 'STOPPED') {
            throw new Error('Simulation is already stopped')
          }
          newStatus = 'STOPPED'
          message = 'Simulation stopped successfully'
          break

        case 'pause':
          if (simulation.status !== 'RUNNING') {
            throw new Error('Can only pause running simulations')
          }
          newStatus = 'PAUSED'
          message = 'Simulation paused successfully'
          break

        case 'restart':
          newStatus = 'RUNNING'
          message = 'Simulation restarted successfully'
          break

        default:
          throw new Error('Invalid action')
      }

      // Update simulation status
      const updatedSimulation = updateSimulationStorage(simulationId, { status: newStatus })

      if (!updatedSimulation) {
        throw new Error('Failed to update simulation')
      }

      // If starting or restarting, create initial metrics
      if (newStatus === 'RUNNING') {
        const metrics = await generateMetrics(simulationId)
        addSimulationMetric(metrics)
      }

      toast({
        title: 'Success',
        description: message,
      })

      loadSimulations() // Refresh the list
      return { success: true, simulation: updatedSimulation }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to ${action} simulation`
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateSimulation = async (
    simulationId: string,
    data: UpdateSimulationProps
  ) => {
    setLoading(true)
    try {
      const simulation = getSimulation(simulationId)
      if (!simulation) {
        throw new Error('Simulation not found')
      }

      const updatedSimulation = updateSimulationStorage(simulationId, data)

      if (!updatedSimulation) {
        throw new Error('Failed to update simulation')
      }

      toast({
        title: 'Success',
        description: 'Simulation updated successfully',
      })

      loadSimulations() // Refresh the list
      return { success: true, simulation: updatedSimulation }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update simulation'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const deleteSimulation = async (simulationId: string) => {
    setLoading(true)
    try {
      const simulation = getSimulation(simulationId)
      if (!simulation) {
        throw new Error('Simulation not found')
      }

      // Don't allow deletion of running simulations
      if (simulation.status === 'RUNNING') {
        throw new Error('Cannot delete a running simulation. Stop it first.')
      }

      const success = deleteSimulationStorage(simulationId)

      if (!success) {
        throw new Error('Failed to delete simulation')
      }

      toast({
        title: 'Success',
        description: 'Simulation deleted successfully',
      })

      loadSimulations() // Refresh the list
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete simulation'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const getSimulationById = (id: string) => {
    return getSimulation(id)
  }

  const getMetrics = (simulationId: string, limit?: number) => {
    return getSimulationMetrics(simulationId, limit)
  }

  return {
    loading,
    simulations,
    stats,
    createSimulation,
    controlSimulation,
    updateSimulation,
    deleteSimulation,
    getSimulationById,
    getMetrics,
    loadSimulations,
  }
}
