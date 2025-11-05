'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateDemoData, clearDemoData, hasDemoData } from '@/lib/demo-data-generator'
import { useToast } from '@/components/ui/use-toast'
import { RefreshCw, Trash2, Database } from 'lucide-react'

interface DemoControlsProps {
  onDataChange?: () => void
}

const DemoControls: React.FC<DemoControlsProps> = ({ onDataChange }) => {
  const { toast } = useToast()
  const hasData = hasDemoData()

  const handleGenerateData = () => {
    try {
      generateDemoData()
      toast({
        title: 'Success',
        description: 'Demo data generated successfully!',
      })
      onDataChange?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate demo data',
        variant: 'destructive',
      })
    }
  }

  const handleClearData = () => {
    try {
      clearDemoData()
      toast({
        title: 'Success',
        description: 'All data cleared successfully!',
      })
      onDataChange?.()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear data',
        variant: 'destructive',
      })
    }
  }

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <Card className="mb-6 border-dashed border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-orange-800">
          <Database className="w-5 h-5" />
          <span>Demo Data Controls</span>
        </CardTitle>
        <CardDescription className="text-orange-600">
          Development tools for managing CloudSim demo data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3">
          <Button
            onClick={handleGenerateData}
            variant="outline"
            size="sm"
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {hasData ? 'Regenerate Demo Data' : 'Generate Demo Data'}
          </Button>
          
          {hasData && (
            <Button
              onClick={handleClearData}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          )}
        </div>
        
        <div className="mt-3 text-sm text-orange-600">
          Status: {hasData ? '✅ Demo data loaded' : '❌ No data found'}
        </div>
      </CardContent>
    </Card>
  )
}

export default DemoControls
