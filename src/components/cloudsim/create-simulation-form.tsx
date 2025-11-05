'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateSimulationSchema, CreateSimulationProps } from '@/schemas/cloudsim.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Server, Cpu, MemoryStick, HardDrive, Globe, DollarSign } from 'lucide-react'

interface CreateSimulationFormProps {
  onSubmit: (data: CreateSimulationProps) => void
  onCancel: () => void
  isLoading?: boolean
}

const CreateSimulationForm: React.FC<CreateSimulationFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateSimulationProps>({
    resolver: zodResolver(CreateSimulationSchema),
    defaultValues: {
      config: {
        instances: 1,
        cpuCores: 2,
        memoryGB: 4,
        storageGB: 20,
        region: 'us-east-1',
        autoScaling: false,
        loadBalancer: false,
      },
    },
  })

  const watchedConfig = watch('config')

  const templates = [
    {
      id: 'web-server',
      name: 'Web Server',
      description: 'Simple 3-tier web application with database',
      config: {
        instances: 3,
        cpuCores: 2,
        memoryGB: 4,
        storageGB: 50,
        region: 'us-east-1',
        autoScaling: false,
        loadBalancer: true,
      },
      estimatedCost: 45.50,
    },
    {
      id: 'microservices',
      name: 'Microservices',
      description: 'Container-based microservices architecture',
      config: {
        instances: 5,
        cpuCores: 4,
        memoryGB: 8,
        storageGB: 100,
        region: 'us-west-2',
        autoScaling: true,
        loadBalancer: true,
      },
      estimatedCost: 120.75,
    },
    {
      id: 'auto-scaling',
      name: 'Auto-scaling Demo',
      description: 'Demonstrates automatic scaling based on load',
      config: {
        instances: 2,
        cpuCores: 2,
        memoryGB: 4,
        storageGB: 30,
        region: 'eu-west-1',
        autoScaling: true,
        loadBalancer: true,
      },
      estimatedCost: 67.25,
    },
    {
      id: 'disaster-recovery',
      name: 'Disaster Recovery',
      description: 'Multi-region setup with failover capabilities',
      config: {
        instances: 4,
        cpuCores: 4,
        memoryGB: 8,
        storageGB: 200,
        region: 'us-east-1',
        autoScaling: false,
        loadBalancer: true,
      },
      estimatedCost: 156.80,
    },
  ]

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  ]

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setValue('template', templateId as any)
      setValue('config', template.config)
    }
  }

  const calculateEstimatedCost = () => {
    const { instances, cpuCores, memoryGB, storageGB } = watchedConfig
    const baseCost = instances * cpuCores * 0.05 + instances * memoryGB * 0.02 + storageGB * 0.1
    return baseCost.toFixed(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic details about your simulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Simulation Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter simulation name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your simulation..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Template</CardTitle>
          <CardDescription>
            Select a pre-configured template or customize your own
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-orange-500 bg-orange-50'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      <DollarSign className="w-3 h-3 mr-1" />
                      ${template.estimatedCost}/mo
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>{template.config.instances} instances</span>
                    <span>{template.config.cpuCores} CPU</span>
                    <span>{template.config.memoryGB}GB RAM</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Customize your simulation resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resource Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instances" className="flex items-center space-x-2">
                <Server className="w-4 h-4" />
                <span>Instances</span>
              </Label>
              <Input
                id="instances"
                type="number"
                min="1"
                max="10"
                {...register('config.instances', { valueAsNumber: true })}
                className={errors.config?.instances ? 'border-red-500' : ''}
              />
              {errors.config?.instances && (
                <p className="text-sm text-red-500 mt-1">{errors.config.instances.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cpuCores" className="flex items-center space-x-2">
                <Cpu className="w-4 h-4" />
                <span>CPU Cores</span>
              </Label>
              <Input
                id="cpuCores"
                type="number"
                min="1"
                max="8"
                {...register('config.cpuCores', { valueAsNumber: true })}
                className={errors.config?.cpuCores ? 'border-red-500' : ''}
              />
              {errors.config?.cpuCores && (
                <p className="text-sm text-red-500 mt-1">{errors.config.cpuCores.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="memoryGB" className="flex items-center space-x-2">
                <MemoryStick className="w-4 h-4" />
                <span>Memory (GB)</span>
              </Label>
              <Input
                id="memoryGB"
                type="number"
                min="1"
                max="32"
                {...register('config.memoryGB', { valueAsNumber: true })}
                className={errors.config?.memoryGB ? 'border-red-500' : ''}
              />
              {errors.config?.memoryGB && (
                <p className="text-sm text-red-500 mt-1">{errors.config.memoryGB.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="storageGB" className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4" />
                <span>Storage (GB)</span>
              </Label>
              <Input
                id="storageGB"
                type="number"
                min="10"
                max="1000"
                {...register('config.storageGB', { valueAsNumber: true })}
                className={errors.config?.storageGB ? 'border-red-500' : ''}
              />
              {errors.config?.storageGB && (
                <p className="text-sm text-red-500 mt-1">{errors.config.storageGB.message}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Region Selection */}
          <div>
            <Label className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Region</span>
            </Label>
            <Select
              value={watchedConfig.region}
              onValueChange={(value) => setValue('config.region', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Advanced Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Advanced Options</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoScaling">Auto Scaling</Label>
                <p className="text-sm text-gray-600">
                  Automatically scale instances based on demand
                </p>
              </div>
              <Switch
                id="autoScaling"
                checked={watchedConfig.autoScaling}
                onCheckedChange={(checked) => setValue('config.autoScaling', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="loadBalancer">Load Balancer</Label>
                <p className="text-sm text-gray-600">
                  Distribute traffic across instances
                </p>
              </div>
              <Switch
                id="loadBalancer"
                checked={watchedConfig.loadBalancer}
                onCheckedChange={(checked) => setValue('config.loadBalancer', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Estimation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Estimated Cost</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${calculateEstimatedCost()}/month
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Estimated monthly cost based on your configuration
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-orange hover:bg-orange/90">
          {isLoading ? 'Creating...' : 'Create Simulation'}
        </Button>
      </div>
    </form>
  )
}

export default CreateSimulationForm
