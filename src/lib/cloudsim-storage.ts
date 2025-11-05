'use client'
import { CreateSimulationProps, UpdateSimulationProps, SimulationStatusType } from '@/schemas/cloudsim.schema'

export interface CloudSimulation {
  id: string
  name: string
  description?: string
  template: string
  status: SimulationStatusType
  config: {
    instances: number
    cpuCores: number
    memoryGB: number
    storageGB: number
    region: string
    autoScaling: boolean
    loadBalancer: boolean
  }
  createdAt: Date
  updatedAt: Date
  userId: string
  metrics?: SimulationMetric[]
}

export interface SimulationMetric {
  id: string
  cpuUsage: number
  memoryUsage: number
  networkIO: number
  diskIO: number
  timestamp: Date
  simulationId: string
}

const STORAGE_KEYS = {
  SIMULATIONS: 'cloudsim_simulations',
  METRICS: 'cloudsim_metrics',
  USER_ID: 'cloudsim_user_id',
}

// Generate a simple UUID
const generateId = (): string => {
  return 'sim_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

// Get current user ID (mock for demo)
export const getCurrentUserId = (): string => {
  if (typeof window === 'undefined') return 'demo_user'
  
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID)
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId)
  }
  return userId
}

// Get all simulations for current user
export const getSimulations = (): CloudSimulation[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SIMULATIONS)
    if (!stored) return []
    
    const allSimulations = JSON.parse(stored) as CloudSimulation[]
    const userId = getCurrentUserId()
    
    // Parse dates and filter by user
    return allSimulations
      .filter(sim => sim.userId === userId)
      .map(sim => ({
        ...sim,
        createdAt: new Date(sim.createdAt),
        updatedAt: new Date(sim.updatedAt),
      }))
  } catch (error) {
    console.error('Error loading simulations:', error)
    return []
  }
}

// Get simulation by ID
export const getSimulation = (id: string): CloudSimulation | null => {
  const simulations = getSimulations()
  return simulations.find(sim => sim.id === id) || null
}

// Save simulation
export const saveSimulation = (simulation: CloudSimulation): void => {
  if (typeof window === 'undefined') return
  
  try {
    const allSimulations = getAllSimulations()
    const existingIndex = allSimulations.findIndex(sim => sim.id === simulation.id)
    
    if (existingIndex >= 0) {
      allSimulations[existingIndex] = simulation
    } else {
      allSimulations.push(simulation)
    }
    
    localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(allSimulations))
  } catch (error) {
    console.error('Error saving simulation:', error)
  }
}

// Get all simulations (across all users)
const getAllSimulations = (): CloudSimulation[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SIMULATIONS)
    if (!stored) return []
    
    return JSON.parse(stored) as CloudSimulation[]
  } catch (error) {
    console.error('Error loading all simulations:', error)
    return []
  }
}

// Create new simulation
export const createSimulation = (data: CreateSimulationProps): CloudSimulation => {
  const userId = getCurrentUserId()
  const now = new Date()
  
  const simulation: CloudSimulation = {
    id: generateId(),
    name: data.name,
    description: data.description,
    template: data.template,
    status: 'STOPPED',
    config: data.config,
    createdAt: now,
    updatedAt: now,
    userId,
  }
  
  saveSimulation(simulation)
  return simulation
}

// Update simulation
// Allow updating either a Partial<CloudSimulation> or the UpdateSimulationProps
export const updateSimulation = (
  id: string,
  updates: Partial<CloudSimulation> | UpdateSimulationProps
): CloudSimulation | null => {
  const simulation = getSimulation(id)
  if (!simulation) return null
  
  // If updates contain a partial `config`, merge it with existing config
  const updatesAny = updates as any
  const mergedConfig = updatesAny && updatesAny.config ? { ...simulation.config, ...updatesAny.config } : simulation.config

  const updatedSimulation: CloudSimulation = {
    ...simulation,
    ...updatesAny,
    config: mergedConfig,
    updatedAt: new Date(),
  }

  saveSimulation(updatedSimulation)
  return updatedSimulation
}

// Delete simulation
export const deleteSimulation = (id: string): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const allSimulations = getAllSimulations()
    const filteredSimulations = allSimulations.filter(sim => sim.id !== id)
    
    localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(filteredSimulations))
    
    // Also delete associated metrics
    deleteSimulationMetrics(id)
    
    return true
  } catch (error) {
    console.error('Error deleting simulation:', error)
    return false
  }
}

// Metrics management
export const getSimulationMetrics = (simulationId: string, limit: number = 50): SimulationMetric[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.METRICS)
    if (!stored) return []
    
    const allMetrics = JSON.parse(stored) as SimulationMetric[]
    
    return allMetrics
      .filter(metric => metric.simulationId === simulationId)
      .map(metric => ({
        ...metric,
        timestamp: new Date(metric.timestamp),
      }))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  } catch (error) {
    console.error('Error loading metrics:', error)
    return []
  }
}

export const addSimulationMetric = (metric: Omit<SimulationMetric, 'id'>): void => {
  if (typeof window === 'undefined') return
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.METRICS)
    const allMetrics = stored ? JSON.parse(stored) as SimulationMetric[] : []
    
    const newMetric: SimulationMetric = {
      ...metric,
      id: generateId(),
    }
    
    allMetrics.push(newMetric)
    
    // Keep only last 100 metrics per simulation to avoid storage bloat
    const metricsPerSim = allMetrics.filter(m => m.simulationId === metric.simulationId)
    if (metricsPerSim.length > 100) {
      const toRemove = metricsPerSim
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .slice(0, metricsPerSim.length - 100)
      
      const filteredMetrics = allMetrics.filter(m => 
        !toRemove.some(r => r.id === m.id)
      )
      
      localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify([...filteredMetrics, newMetric]))
    } else {
      localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(allMetrics))
    }
  } catch (error) {
    console.error('Error saving metric:', error)
  }
}

const deleteSimulationMetrics = (simulationId: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.METRICS)
    if (!stored) return
    
    const allMetrics = JSON.parse(stored) as SimulationMetric[]
    const filteredMetrics = allMetrics.filter(metric => metric.simulationId !== simulationId)
    
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(filteredMetrics))
  } catch (error) {
    console.error('Error deleting metrics:', error)
  }
}

// Get simulation statistics
export const getSimulationStats = () => {
  const simulations = getSimulations()
  
  return {
    total: simulations.length,
    running: simulations.filter(s => s.status === 'RUNNING').length,
    stopped: simulations.filter(s => s.status === 'STOPPED').length,
    paused: simulations.filter(s => s.status === 'PAUSED').length,
  }
}

// Clear all data (for development/testing)
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(STORAGE_KEYS.SIMULATIONS)
  localStorage.removeItem(STORAGE_KEYS.METRICS)
  localStorage.removeItem(STORAGE_KEYS.USER_ID)
}
