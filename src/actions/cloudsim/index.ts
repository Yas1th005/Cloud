'use server'

import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { 
  CreateSimulationProps, 
  UpdateSimulationProps,
  SimulationControlProps 
} from '@/schemas/cloudsim.schema'

// Get all simulations for the current user
export const onGetUserSimulations = async () => {
  try {
    const user = await currentUser()
    if (!user) return null

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return null

    const simulations = await client.cloudSimulation.findMany({
      where: { userId: dbUser.id },
      include: {
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 1, // Get latest metrics
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return simulations
  } catch (error) {
    console.error('Error fetching user simulations:', error)
    return null
  }
}

// Get a specific simulation by ID
export const onGetSimulation = async (simulationId: string) => {
  try {
    const user = await currentUser()
    if (!user) return null

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return null

    const simulation = await client.cloudSimulation.findFirst({
      where: {
        id: simulationId,
        userId: dbUser.id,
      },
      include: {
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 10, // Get last 10 metrics
        },
      },
    })

    return simulation
  } catch (error) {
    console.error('Error fetching simulation:', error)
    return null
  }
}

// Create a new simulation
export const onCreateSimulation = async (data: CreateSimulationProps) => {
  try {
    const user = await currentUser()
    if (!user) return { error: 'Unauthorized' }

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return { error: 'User not found' }

    const simulation = await client.cloudSimulation.create({
      data: {
        name: data.name,
        description: data.description,
        template: data.template,
        config: data.config,
        status: 'STOPPED',
        userId: dbUser.id,
      },
    })

    return { simulation }
  } catch (error) {
    console.error('Error creating simulation:', error)
    return { error: 'Failed to create simulation' }
  }
}

// Update a simulation
export const onUpdateSimulation = async (
  simulationId: string,
  data: UpdateSimulationProps
) => {
  try {
    const user = await currentUser()
    if (!user) return { error: 'Unauthorized' }

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return { error: 'User not found' }

    // Check if simulation exists and belongs to user
    const existingSimulation = await client.cloudSimulation.findFirst({
      where: {
        id: simulationId,
        userId: dbUser.id,
      },
    })

    if (!existingSimulation) return { error: 'Simulation not found' }

    const updatedSimulation = await client.cloudSimulation.update({
      where: { id: simulationId },
      data,
    })

    return { simulation: updatedSimulation }
  } catch (error) {
    console.error('Error updating simulation:', error)
    return { error: 'Failed to update simulation' }
  }
}

// Control simulation (start, stop, pause, restart)
export const onControlSimulation = async (
  simulationId: string,
  action: 'start' | 'stop' | 'pause' | 'restart'
) => {
  try {
    const user = await currentUser()
    if (!user) return { error: 'Unauthorized' }

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return { error: 'User not found' }

    // Check if simulation exists and belongs to user
    const existingSimulation = await client.cloudSimulation.findFirst({
      where: {
        id: simulationId,
        userId: dbUser.id,
      },
    })

    if (!existingSimulation) return { error: 'Simulation not found' }

    // Determine new status based on action and current status
    let newStatus: string
    let message: string

    switch (action) {
      case 'start':
        if (existingSimulation.status === 'RUNNING') {
          return { error: 'Simulation is already running' }
        }
        newStatus = 'RUNNING'
        message = 'Simulation started successfully'
        break

      case 'stop':
        if (existingSimulation.status === 'STOPPED') {
          return { error: 'Simulation is already stopped' }
        }
        newStatus = 'STOPPED'
        message = 'Simulation stopped successfully'
        break

      case 'pause':
        if (existingSimulation.status !== 'RUNNING') {
          return { error: 'Can only pause running simulations' }
        }
        newStatus = 'PAUSED'
        message = 'Simulation paused successfully'
        break

      case 'restart':
        newStatus = 'RUNNING'
        message = 'Simulation restarted successfully'
        break

      default:
        return { error: 'Invalid action' }
    }

    // Update simulation status
    const updatedSimulation = await client.cloudSimulation.update({
      where: { id: simulationId },
      data: { 
        status: newStatus as any,
        updatedAt: new Date(),
      },
    })

    // If starting or restarting, create initial metrics
    if (newStatus === 'RUNNING') {
      await client.simulationMetrics.create({
        data: {
          simulationId,
          cpuUsage: Math.random() * 30 + 10, // Random initial values for demo
          memoryUsage: Math.random() * 40 + 20,
          networkIO: Math.random() * 100,
          diskIO: Math.random() * 50,
          timestamp: new Date(),
        },
      })
    }

    return { 
      simulation: updatedSimulation,
      message 
    }
  } catch (error) {
    console.error('Error controlling simulation:', error)
    return { error: 'Failed to control simulation' }
  }
}

// Delete a simulation
export const onDeleteSimulation = async (simulationId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { error: 'Unauthorized' }

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return { error: 'User not found' }

    // Check if simulation exists and belongs to user
    const existingSimulation = await client.cloudSimulation.findFirst({
      where: {
        id: simulationId,
        userId: dbUser.id,
      },
    })

    if (!existingSimulation) return { error: 'Simulation not found' }

    // Don't allow deletion of running simulations
    if (existingSimulation.status === 'RUNNING') {
      return { error: 'Cannot delete a running simulation. Stop it first.' }
    }

    // Delete simulation (metrics will be deleted automatically due to cascade)
    await client.cloudSimulation.delete({
      where: { id: simulationId },
    })

    return { message: 'Simulation deleted successfully' }
  } catch (error) {
    console.error('Error deleting simulation:', error)
    return { error: 'Failed to delete simulation' }
  }
}

// Get simulation metrics
export const onGetSimulationMetrics = async (
  simulationId: string,
  limit: number = 50
) => {
  try {
    const user = await currentUser()
    if (!user) return null

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return null

    // Check if simulation belongs to user
    const simulation = await client.cloudSimulation.findFirst({
      where: {
        id: simulationId,
        userId: dbUser.id,
      },
    })

    if (!simulation) return null

    const metrics = await client.simulationMetrics.findMany({
      where: { simulationId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    })

    return metrics
  } catch (error) {
    console.error('Error fetching simulation metrics:', error)
    return null
  }
}

// Get simulation statistics for dashboard
export const onGetSimulationStats = async () => {
  try {
    const user = await currentUser()
    if (!user) return null

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) return null

    const [totalSimulations, runningSimulations, stoppedSimulations, pausedSimulations] = 
      await Promise.all([
        client.cloudSimulation.count({
          where: { userId: dbUser.id },
        }),
        client.cloudSimulation.count({
          where: { userId: dbUser.id, status: 'RUNNING' },
        }),
        client.cloudSimulation.count({
          where: { userId: dbUser.id, status: 'STOPPED' },
        }),
        client.cloudSimulation.count({
          where: { userId: dbUser.id, status: 'PAUSED' },
        }),
      ])

    return {
      total: totalSimulations,
      running: runningSimulations,
      stopped: stoppedSimulations,
      paused: pausedSimulations,
    }
  } catch (error) {
    console.error('Error fetching simulation stats:', error)
    return null
  }
}
