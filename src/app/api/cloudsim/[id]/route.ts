import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import { client } from '@/lib/prisma'
import { UpdateSimulationSchema } from '@/schemas/cloudsim.schema'

// GET /api/cloudsim/[id] - Get a specific simulation
export async function GET(
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

    const simulation = await client.cloudSimulation.findFirst({
      where: {
        id: params.id,
        userId: dbUser.id,
      },
      include: {
        metrics: {
          orderBy: { timestamp: 'desc' },
          take: 10, // Get last 10 metrics
        },
      },
    })

    if (!simulation) {
      return NextResponse.json({ error: 'Simulation not found' }, { status: 404 })
    }

    return NextResponse.json({ simulation })
  } catch (error) {
    console.error('Error fetching simulation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/cloudsim/[id] - Update a simulation
export async function PUT(
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
    const validationResult = UpdateSimulationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

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

    // Update simulation
    const updatedSimulation = await client.cloudSimulation.update({
      where: { id: params.id },
      data: validationResult.data,
    })

    return NextResponse.json({ simulation: updatedSimulation })
  } catch (error) {
    console.error('Error updating simulation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/cloudsim/[id] - Delete a simulation
export async function DELETE(
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

    // Don't allow deletion of running simulations
    if (existingSimulation.status === 'RUNNING') {
      return NextResponse.json(
        { error: 'Cannot delete a running simulation. Stop it first.' },
        { status: 400 }
      )
    }

    // Delete simulation (metrics will be deleted automatically due to cascade)
    await client.cloudSimulation.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Simulation deleted successfully' })
  } catch (error) {
    console.error('Error deleting simulation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
