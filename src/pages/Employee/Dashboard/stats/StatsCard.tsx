import { ReactNode } from 'react'
import '../dashboard.css'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      if (val >= 1000) {
        return val.toLocaleString()
      }
      return val.toString()
    }
    return val
  }

  return (
    <div className="statsCard">
      {/* Watermark Icon */}
      <div className="statsWatermark">
        {icon}
      </div>
      
      {/* Content */}
      <div className="statsContent">
        <div className="statsHeader">
          <p className="statsTitle">{title}</p>
          <p className="statsValue">{formatValue(value)}</p>
        </div>
        {description && (
          <p className="statsDescription">{description}</p>
        )}
      </div>
    </div>
  )
}

export default StatsCard