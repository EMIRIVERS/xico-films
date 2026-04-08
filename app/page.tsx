'use client'

import WaterScene from '@/components/webgl/WaterScene'
import UnderwaterTitle from '@/components/experience/UnderwaterTitle'
import FloatingProjects from '@/components/experience/FloatingProjects'
import { getAllProjects } from '@/lib/projects'

const projects = getAllProjects()

export default function Home() {
  return (
    <>
      <WaterScene />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <UnderwaterTitle />
        <FloatingProjects projects={projects} />
      </div>
    </>
  )
}
