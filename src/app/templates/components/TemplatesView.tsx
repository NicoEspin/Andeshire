import React from 'react'
import TemplatesViewHeader from './Templates/TemplatesViewHeader'
import TemplatesViewContentRender from './Templates/TemplatesViewContentRender'
import { Card } from '@/components/ui/card'


type Props = {}

const TemplatesView = (props: Props) => {
  return (
    <Card><TemplatesViewHeader />
      <TemplatesViewContentRender />
    </Card>
  )
}

export default TemplatesView