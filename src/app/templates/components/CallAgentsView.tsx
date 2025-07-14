import EmptyState from '@/app/components/EmptyState'
import { Card } from '@/components/ui/card'
import React from 'react'

type Props = {}

const CallAgentsView = (props: Props) => {
  return (
    <div>
      <Card>
      <EmptyState />
      </Card>
    </div>
  )
}

export default CallAgentsView