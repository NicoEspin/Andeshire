import * as React from "react"
import { Skeleton } from "./skeleton"
import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table"
import { Card, CardHeader, CardContent } from "./card"

interface TableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  className?: string
}

interface CardSkeletonProps {
  showHeader?: boolean
  showAvatar?: boolean
  lines?: number
  className?: string
}

interface ListSkeletonProps {
  items?: number
  showAvatar?: boolean
  className?: string
}

interface FilterSkeletonProps {
  className?: string
}

// Table Skeleton Component
const TableSkeleton = React.forwardRef<HTMLDivElement, TableSkeletonProps>(
  ({ rows = 5, columns = 6, showHeader = true, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("w-full", className)} 
        role="status" 
        aria-label="Loading table content..."
        {...props}
      >
        <Table>
          {showHeader && (
            <TableHeader>
              <TableRow>
                {Array.from({ length: columns }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton 
                      className="h-4 w-20" 
                      aria-label={`Loading column ${index + 1} header`}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton 
                      className="h-4 w-full max-w-[120px]" 
                      style={{ 
                        width: `${Math.random() * 40 + 60}%` 
                      }}
                      aria-label={`Loading row ${rowIndex + 1}, column ${colIndex + 1} content`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <span className="sr-only">Loading table data, please wait...</span>
      </div>
    )
  }
)

// Card Skeleton Component
const CardSkeleton = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({ showHeader = true, showAvatar = false, lines = 3, className, ...props }, ref) => {
    return (
      <Card 
        ref={ref} 
        className={cn("w-full", className)} 
        role="status" 
        aria-label="Loading card content..."
        {...props}
      >
        {showHeader && (
          <CardHeader className="space-y-2">
            <div className="flex items-center space-x-3">
              {showAvatar && (
                <Skeleton 
                  variant="circular" 
                  className="h-10 w-10" 
                  aria-label="Loading avatar"
                />
              )}
              <div className="space-y-2 flex-1">
                <Skeleton 
                  className="h-5 w-1/3" 
                  aria-label="Loading title"
                />
                <Skeleton 
                  className="h-3 w-1/2" 
                  aria-label="Loading subtitle"
                />
              </div>
            </div>
          </CardHeader>
        )}
        <CardContent className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton 
              key={index} 
              className="h-4" 
              style={{ 
                width: index === lines - 1 ? "60%" : "100%" 
              }}
              aria-label={`Loading content line ${index + 1}`}
            />
          ))}
        </CardContent>
        <span className="sr-only">Loading card information, please wait...</span>
      </Card>
    )
  }
)

// List Skeleton Component
const ListSkeleton = React.forwardRef<HTMLDivElement, ListSkeletonProps>(
  ({ items = 5, showAvatar = true, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg">
            {showAvatar && (
              <Skeleton variant="circular" className="h-12 w-12" />
            )}
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }
)

// Filter Bar Skeleton
const FilterSkeleton = React.forwardRef<HTMLDivElement, FilterSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full sm:w-1/2" />
            <Skeleton className="h-10 w-full sm:w-1/3" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    )
  }
)

// Jobs Table Specific Skeleton
const JobsTableSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <TableSkeleton 
            rows={8} 
            columns={8} 
            showHeader={true}
          />
        </CardContent>
      </Card>
    )
  }
)

// Candidates Table Specific Skeleton
const CandidatesTableSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <TableSkeleton 
            rows={6} 
            columns={7} 
            showHeader={true}
          />
        </CardContent>
      </Card>
    )
  }
)

// Companies Table Specific Skeleton
const CompaniesTableSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <TableSkeleton 
            rows={7} 
            columns={6} 
            showHeader={true}
          />
        </CardContent>
      </Card>
    )
  }
)

// Page Loading Skeleton - Combines filter + table
const PageLoadingSkeleton = React.forwardRef<HTMLDivElement, { 
  type?: "jobs" | "candidates" | "companies"
  className?: string 
}>(({ type = "jobs", className, ...props }, ref) => {
  const SkeletonComponent = {
    jobs: JobsTableSkeleton,
    candidates: CandidatesTableSkeleton,
    companies: CompaniesTableSkeleton,
  }[type]

  const typeLabels = {
    jobs: "jobs",
    candidates: "candidates",
    companies: "companies"
  }

  return (
    <div 
      ref={ref} 
      className={cn("space-y-6 pr-8", className)} 
      role="status"
      aria-label={`Loading ${typeLabels[type]} page...`}
      {...props}
    >
      <FilterSkeleton />
      <SkeletonComponent />
      <span className="sr-only">
        Loading {typeLabels[type]} data and filters, please wait...
      </span>
    </div>
  )
})

TableSkeleton.displayName = "TableSkeleton"
CardSkeleton.displayName = "CardSkeleton"
ListSkeleton.displayName = "ListSkeleton"
FilterSkeleton.displayName = "FilterSkeleton"
JobsTableSkeleton.displayName = "JobsTableSkeleton"
CandidatesTableSkeleton.displayName = "CandidatesTableSkeleton"
CompaniesTableSkeleton.displayName = "CompaniesTableSkeleton"
PageLoadingSkeleton.displayName = "PageLoadingSkeleton"

export {
  TableSkeleton,
  CardSkeleton,
  ListSkeleton,
  FilterSkeleton,
  JobsTableSkeleton,
  CandidatesTableSkeleton,
  CompaniesTableSkeleton,
  PageLoadingSkeleton,
}