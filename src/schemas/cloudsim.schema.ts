import { z } from 'zod'

// Simulation Status Enum
export const SimulationStatus = z.enum(['RUNNING', 'STOPPED', 'PAUSED', 'ERROR'])

// Create Simulation Schema
export const CreateSimulationSchema = z.object({
  name: z.string().min(1, 'Simulation name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  template: z.enum(['web-server', 'microservices', 'auto-scaling', 'disaster-recovery']),
  config: z.object({
    instances: z.number().min(1).max(10),
    cpuCores: z.number().min(1).max(8),
    memoryGB: z.number().min(1).max(32),
    storageGB: z.number().min(10).max(1000),
    region: z.string().min(1),
    autoScaling: z.boolean().default(false),
    loadBalancer: z.boolean().default(false),
  }),
})

// Update Simulation Schema
export const UpdateSimulationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  config: z.object({
    instances: z.number().min(1).max(10).optional(),
    cpuCores: z.number().min(1).max(8).optional(),
    memoryGB: z.number().min(1).max(32).optional(),
    storageGB: z.number().min(10).max(1000).optional(),
    region: z.string().min(1).optional(),
    autoScaling: z.boolean().optional(),
    loadBalancer: z.boolean().optional(),
  }).optional(),
})

// Simulation Control Schema
export const SimulationControlSchema = z.object({
  action: z.enum(['start', 'stop', 'pause', 'restart']),
})

// Simulation Metrics Schema
export const SimulationMetricsSchema = z.object({
  cpuUsage: z.number().min(0).max(100),
  memoryUsage: z.number().min(0).max(100),
  networkIO: z.number().min(0),
  diskIO: z.number().min(0),
  timestamp: z.date(),
})

// Simulation Template Schema
export const SimulationTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  defaultConfig: z.object({
    instances: z.number(),
    cpuCores: z.number(),
    memoryGB: z.number(),
    storageGB: z.number(),
    region: z.string(),
    autoScaling: z.boolean(),
    loadBalancer: z.boolean(),
  }),
  estimatedCost: z.number(),
})

// Type exports
export type CreateSimulationProps = z.infer<typeof CreateSimulationSchema>
export type UpdateSimulationProps = z.infer<typeof UpdateSimulationSchema>
export type SimulationControlProps = z.infer<typeof SimulationControlSchema>
export type SimulationMetricsProps = z.infer<typeof SimulationMetricsSchema>
export type SimulationTemplateProps = z.infer<typeof SimulationTemplateSchema>
export type SimulationStatusType = z.infer<typeof SimulationStatus>

// Simulation Response Schema
export const SimulationResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: SimulationStatus,
  config: z.object({
    instances: z.number(),
    cpuCores: z.number(),
    memoryGB: z.number(),
    storageGB: z.number(),
    region: z.string(),
    autoScaling: z.boolean(),
    loadBalancer: z.boolean(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export type SimulationResponseProps = z.infer<typeof SimulationResponseSchema>
