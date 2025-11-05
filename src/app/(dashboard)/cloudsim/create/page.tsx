'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import InfoBar from '@/components/infobar'
import CreateSimulationForm from '@/components/cloudsim/create-simulation-form'
import { useCloudSim } from '@/hooks/cloudsim/use-cloudsim'
import { CreateSimulationProps } from '@/schemas/cloudsim.schema'

type Props = {}

const CreateSimulationPage = (props: Props) => {
  const router = useRouter()
  const { createSimulation, loading } = useCloudSim()

  const handleSubmit = async (data: CreateSimulationProps) => {
    const result = await createSimulation(data)
    
    if (result.success) {
      router.push('/cloudsim')
    }
  }

  const handleCancel = () => {
    router.push('/cloudsim')
  }

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Simulation</h1>
            <p className="text-gray-600 mt-2">
              Configure and launch your cloud infrastructure simulation
            </p>
          </div>

          <CreateSimulationForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default CreateSimulationPage
