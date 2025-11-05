import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import { client } from '@/lib/prisma'
import { CreateSimulationSchema } from '@/schemas/cloudsim.schema'

// GET /api/cloudsim - Get all simulations for the current user
export async function GET() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user in database
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get all simulations for the user
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

    return NextResponse.json({ simulations })
  } catch (error) {
    console.error('Error fetching simulations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/cloudsim - Create a new simulation
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user in database
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    
    // Validate request body
    const validationResult = CreateSimulationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { name, description, template, config } = validationResult.data

    // Create simulation in database
    const simulation = await client.cloudSimulation.create({
      data: {
        name,
        description,
        template,
        config,
        status: 'STOPPED',
        userId: dbUser.id,
      },
    })

    return NextResponse.json({ simulation }, { status: 201 })
  } catch (error) {
    console.error('Error creating simulation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
