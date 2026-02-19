import { useState, useEffect } from 'react'
import './filter.css'

type FilterType = "custom" | "month" | "year"

interface FilterProps {
  onFilterChange?: (filter: {
    type: FilterType
    from?: string
    to?: string
    month?: number
    year?: number
  }) => void
  initialFilter?: {
    type?: FilterType
    from?: string
    to?: string
    month?: number
    year?: number
  }
}

const Filter = ({ onFilterChange, initialFilter }: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(initialFilter?.type || "month")
  const [fromDate, setFromDate] = useState(initialFilter?.from || "")
  const [toDate, setToDate] = useState(initialFilter?.to || "")
  const [selectedMonth, setSelectedMonth] = useState(initialFilter?.month || new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(initialFilter?.year || new Date().getFullYear())

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const monthsFull = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
  
  const today = new Date().toISOString().split("T")[0]
  const minDate = new Date(currentYear - 4, 0, 1).toISOString().split("T")[0]

  useEffect(() => {
    if (initialFilter) {
      if (initialFilter.type !== undefined) setSelectedFilter(initialFilter.type)
      if (initialFilter.from !== undefined) setFromDate(initialFilter.from)
      if (initialFilter.to !== undefined) setToDate(initialFilter.to)
      if (initialFilter.month !== undefined) setSelectedMonth(initialFilter.month)
      if (initialFilter.year !== undefined) setSelectedYear(initialFilter.year)
    }
  }, [initialFilter])

  const applyFilter = (type: FilterType, skipCustomCheck = false) => {
    setSelectedFilter(type)
    if (onFilterChange) {
      onFilterChange({
        type,
        ...(type === "custom" && (skipCustomCheck || (fromDate && toDate)) ? { from: fromDate, to: toDate } : {}),
        ...(type === "month" ? { month: selectedMonth, year: selectedYear } : {}),
        ...(type === "year" ? { year: selectedYear } : {}),
      })
    }
  }

  const handleCustomFilterClick = () => {
    setSelectedFilter("custom")
  }

  useEffect(() => {
    if (selectedFilter === "custom" && !fromDate && !toDate) {
      const today = new Date()
      const thirtyDaysAgo = new Date(today)
      thirtyDaysAgo.setDate(today.getDate() - 30)
      const fromDateStr = thirtyDaysAgo.toISOString().split("T")[0]
      const toDateStr = today.toISOString().split("T")[0]
      setFromDate(fromDateStr)
      setToDate(toDateStr)
      if (onFilterChange) {
        onFilterChange({
          type: "custom",
          from: fromDateStr,
          to: toDateStr,
        })
      }
    }
  }, [selectedFilter])

  return (
    <div className="filterContainer">
      {/* Filter Type Buttons */}
      <div className="filterButtons">
        {(["custom", "month", "year"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => type === "custom" ? handleCustomFilterClick() : applyFilter(type)}
            className={`filterBtn ${selectedFilter === type ? 'active' : ''}`}
          >
            {type === "custom" ? "Custom" : type === "month" ? "Month" : "Year"}
          </button>
        ))}
      </div>

      {/* Custom Date Range */}
      {selectedFilter === "custom" && (
        <div className="dateRange">
          <input
            type="date"
            value={fromDate}
            min={minDate}
            max={toDate || today}
            onChange={(e) => {
              const newFromDate = e.target.value
              setFromDate(newFromDate)
              if (toDate && newFromDate && newFromDate > toDate) {
                setToDate("")
              }
              if (newFromDate && toDate && newFromDate <= toDate) {
                applyFilter("custom", true)
              }
            }}
            onBlur={() => {
              if (fromDate && toDate && fromDate <= toDate) {
                applyFilter("custom", true)
              }
            }}
            className="dateInput"
          />
          <span className="dateSeparator">to</span>
          <input
            type="date"
            value={toDate}
            min={fromDate || minDate}
            max={today}
            onChange={(e) => {
              const newToDate = e.target.value
              setToDate(newToDate)
              if (fromDate && newToDate && fromDate <= newToDate) {
                applyFilter("custom", true)
              }
            }}
            onBlur={() => {
              if (fromDate && toDate && fromDate <= toDate) {
                applyFilter("custom", true)
              }
            }}
            className="dateInput"
          />
        </div>
      )}

      {/* Month + Year Selectors */}
      {selectedFilter === "month" && (
        <div className="monthYearSelectors">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(Number(e.target.value))
              applyFilter("month")
            }}
            className="filterSelect"
          >
            {months.map((month, i) => {
              const monthValue = i + 1
              if (selectedYear === currentYear && monthValue > currentMonth) {
                return null
              }
              return (
                <option key={i} value={monthValue}>
                  {monthsFull[i]}
                </option>
              )
            })}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value))
              applyFilter("month")
            }}
            className="filterSelect"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Year Selector Only */}
      {selectedFilter === "year" && (
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(Number(e.target.value))
            applyFilter("year")
          }}
          className="filterSelect"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default Filter