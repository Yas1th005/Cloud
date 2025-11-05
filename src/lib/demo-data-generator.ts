'use client'
import { CloudSimulation, addSimulationMetric } from '@/lib/cloudsim-storage'
import { simulationTemplates } from '@/lib/demo-data'

// Generate demo simulations and populate localStorage
export const generateDemoData = () => {
  if (typeof window === 'undefined') return

  // Check if demo data already exists
  const existing = localStorage.getItem('cloudsim_simulations')
  if (existing) {
    try {
      const parsed = JSON.parse(existing)
      if (parsed.length > 0) {
        console.log('Demo data already exists, skipping generation')
        return
      }
    } catch (error) {
      console.log('Invalid existing data, regenerating...')
    }
  }

  const userId = 'demo_user_' + Math.random().toString(36).substr(2, 9)
  localStorage.setItem('cloudsim_user_id', userId)

  const demoSimulations: CloudSimulation[] = [
    {
      id: 'demo_sim_1',
      name: 'Production Web Server',
      description: 'High-traffic e-commerce website with auto-scaling',
      template: 'web-server',
      status: 'RUNNING',
      config: {
        instances: 3,
        cpuCores: 4,
        memoryGB: 8,
        storageGB: 100,
        region: 'us-east-1',
        autoScaling: true,
        loadBalancer: true,
      },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      updatedAt: new Date(),
      userId,
    },
    {
      id: 'demo_sim_2',
      name: 'Development Environment',
      description: 'Microservices development and testing environment',
      template: 'microservices',
      status: 'STOPPED',
      config: {
        instances: 5,
        cpuCores: 2,
        memoryGB: 4,
        storageGB: 50,
        region: 'us-west-2',
        autoScaling: false,
        loadBalancer: true,
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      userId,
    },
    {
      id: 'demo_sim_3',
      name: 'Load Testing Simulation',
      description: 'Testing auto-scaling behavior under high load',
      template: 'auto-scaling',
      status: 'PAUSED',
      config: {
        instances: 2,
        cpuCores: 2,
        memoryGB: 4,
        storageGB: 30,
        region: 'eu-west-1',
        autoScaling: true,
        loadBalancer: true,
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      userId,
    },
    {
      id: 'demo_sim_4',
      name: 'Disaster Recovery Test',
      description: 'Multi-region failover testing environment',
      template: 'disaster-recovery',
      status: 'RUNNING',
      config: {
        instances: 6,
        cpuCores: 4,
        memoryGB: 16,
        storageGB: 200,
        region: 'us-east-1',
        autoScaling: false,
        loadBalancer: true,
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      updatedAt: new Date(),
      userId,
    },
  ]

  // Save simulations to localStorage
  localStorage.setItem('cloudsim_simulations', JSON.stringify(demoSimulations))

  // Generate historical metrics for running simulations
  const runningSimulations = demoSimulations.filter(sim => sim.status === 'RUNNING')
  
  runningSimulations.forEach(sim => {
    // Generate metrics for the last 24 hours (every 5 minutes)
    const now = Date.now()
    const hoursBack = 24
    const intervalMinutes = 5
    const totalPoints = (hoursBack * 60) / intervalMinutes

    for (let i = totalPoints; i >= 0; i--) {
      const timestamp = new Date(now - (i * intervalMinutes * 60 * 1000))
      
      // Generate realistic metrics based on simulation type
      let baseCpu = 30
      let baseMemory = 40
      let baseNetwork = 500
      let baseDisk = 100

      if (sim.template === 'web-server') {
        baseCpu = 45
        baseMemory = 60
        baseNetwork = 800
        baseDisk = 150
      } else if (sim.template === 'disaster-recovery') {
        baseCpu = 70
        baseMemory = 80
        baseNetwork = 1200
        baseDisk = 300
      }

      // Add some variation and daily patterns
      const hourOfDay = timestamp.getHours()
      const dailyMultiplier = 0.7 + 0.6 * Math.sin((hourOfDay - 6) * Math.PI / 12) // Peak around 2 PM
      const randomVariation = 0.8 + Math.random() * 0.4 // ±20% variation

      const cpuUsage = Math.max(5, Math.min(95, baseCpu * dailyMultiplier * randomVariation))
      const memoryUsage = Math.max(10, Math.min(90, baseMemory * dailyMultiplier * randomVariation))
      const networkIO = Math.max(50, baseNetwork * dailyMultiplier * randomVariation)
      const diskIO = Math.max(20, baseDisk * dailyMultiplier * randomVariation)

      addSimulationMetric({
        cpuUsage,
        memoryUsage,
        networkIO,
        diskIO,
        timestamp,
        simulationId: sim.id,
      })
    }
  })

  console.log('Demo data generated successfully!')
}

// Clear all demo data
export const clearDemoData = () => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('cloudsim_simulations')
  localStorage.removeItem('cloudsim_metrics')
  localStorage.removeItem('cloudsim_user_id')
  
  console.log('Demo data cleared!')
}

// Check if demo data exists
export const hasDemoData = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const simulations = localStorage.getItem('cloudsim_simulations')
  if (!simulations) return false
  
  try {
    const parsed = JSON.parse(simulations)
    return Array.isArray(parsed) && parsed.length > 0
  } catch {
    return false
  }
}

// Initialize demo data on first visit
export const initializeDemoData = () => {
  if (typeof window === 'undefined') return
  
  // Only generate if no data exists
  if (!hasDemoData()) {
    generateDemoData()
  }
}

// Export for use in components
export { simulationTemplates }
