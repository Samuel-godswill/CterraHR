import { ReactNode } from 'react'
import StatsCard from './StatsCard'
import '../dashboard.css'

interface Stat {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
}

interface StatsGridProps {
  stats: Stat[]
  columns?: 2 | 3 | 4
}

const StatsGrid = ({ stats, columns = 4 }: StatsGridProps) => {
  return (
    <div className={`statsGrid statsGrid-${columns}`}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  )
}

export default StatsGrid