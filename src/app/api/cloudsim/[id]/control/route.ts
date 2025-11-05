import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import { client } from '@/lib/prisma'
import { SimulationControlSchema } from '@/schemas/cloudsim.schema'

// POST /api/cloudsim/[id]/control - Control simulation (start, stop, pause, restart)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    
    // Validate request body
    const validationResult = SimulationControlSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { action } = validationResult.data

    // Check if simulation exists and belongs to user
    const existingSimulation = await client.cloudSimulation.findFirst({
      where: {
        id: params.id,
        userId: dbUser.id,
      },
    })

    if (!existingSimulation) {
      return NextResponse.json({ error: 'Simulation not found' }, { status: 404 })
    }

    // Determine new status based on action and current status
    let newStatus: string
    let message: string

    switch (action) {
      case 'start':
        if (existingSimulation.status === 'RUNNING') {
          return NextResponse.json(
            { error: 'Simulation is already running' },
            { status: 400 }
          )
        }
        newStatus = 'RUNNING'
        message = 'Simulation started successfully'
        break

      case 'stop':
        if (existingSimulation.status === 'STOPPED') {
          return NextResponse.json(
            { error: 'Simulation is already stopped' },
            { status: 400 }
          )
        }
        newStatus = 'STOPPED'
        message = 'Simulation stopped successfully'
        break

      case 'pause':
        if (existingSimulation.status !== 'RUNNING') {
          return NextResponse.json(
            { error: 'Can only pause running simulations' },
            { status: 400 }
          )
        }
        newStatus = 'PAUSED'
        message = 'Simulation paused successfully'
        break

      case 'restart':
        newStatus = 'RUNNING'
        message = 'Simulation restarted successfully'
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update simulation status
    const updatedSimulation = await client.cloudSimulation.update({
      where: { id: params.id },
      data: { 
        status: newStatus as any,
        updatedAt: new Date(),
      },
    })

    // If starting or restarting, create initial metrics
    if (newStatus === 'RUNNING') {
      await client.simulationMetrics.create({
        data: {
          simulationId: params.id,
          cpuUsage: Math.random() * 30 + 10, // Random initial values for demo
          memoryUsage: Math.random() * 40 + 20,
          networkIO: Math.random() * 100,
          diskIO: Math.random() * 50,
          timestamp: new Date(),
        },
      })
    }

    return NextResponse.json({ 
      simulation: updatedSimulation,
      message 
    })
  } catch (error) {
    console.error('Error controlling simulation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
