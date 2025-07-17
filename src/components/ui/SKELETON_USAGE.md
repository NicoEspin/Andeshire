# Skeleton Loading Components Usage Guide

## Overview

This guide covers the comprehensive skeleton loading system designed for the ATS application. The skeleton components provide modern, accessible loading states that match the visual structure of the actual content.

## Components

### Base Skeleton Component (`skeleton.tsx`)

The foundation component with customizable variants and animations.

```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Basic usage
<Skeleton className="h-4 w-[250px]" />

// With variants
<Skeleton variant="circular" className="h-10 w-10" />
<Skeleton variant="text" className="w-3/4" />

// Custom dimensions
<Skeleton width={200} height={24} />

// Different animations
<Skeleton animation="pulse" />
<Skeleton animation="wave" />
<Skeleton animation="none" />
```

**Props:**
- `variant`: "default" | "circular" | "text" | "rectangular"
- `width`: string | number
- `height`: string | number  
- `animation`: "pulse" | "wave" | "none"

### Specialized Skeleton Variants (`skeleton-variants.tsx`)

#### TableSkeleton

For table loading states with customizable rows and columns.

```tsx
import { TableSkeleton } from "@/components/ui/skeleton-variants"

<TableSkeleton 
  rows={8} 
  columns={6} 
  showHeader={true}
/>
```

#### CardSkeleton

For card-based content loading.

```tsx
import { CardSkeleton } from "@/components/ui/skeleton-variants"

<CardSkeleton 
  showHeader={true}
  showAvatar={true}
  lines={3}
/>
```

#### PageLoadingSkeleton

Complete page skeleton combining filters and tables.

```tsx
import { PageLoadingSkeleton } from "@/components/ui/skeleton-variants"

<PageLoadingSkeleton type="jobs" />
<PageLoadingSkeleton type="candidates" />
<PageLoadingSkeleton type="companies" />
```

### LoadingAnnouncer (`loading-announcer.tsx`)

Provides screen reader announcements for loading state changes.

```tsx
import { LoadingAnnouncer } from "@/components/ui/loading-announcer"

<LoadingAnnouncer 
  isLoading={loading}
  loadingMessage="Loading jobs data and filters"
  completedMessage="Jobs data has been loaded successfully"
  delay={500}
/>
```

## Implementation Patterns

### Pattern 1: Full Page Initial Loading

Use when the page has no data yet and is loading for the first time.

```tsx
export default function JobList() {
  const { jobList, loading } = useAppSelector(state => state.jobList)
  
  // Show full page skeleton on initial load
  if (loading && jobList.length === 0) {
    return <PageLoadingSkeleton type="jobs" />;
  }
  
  return (
    <>
      <LoadingAnnouncer isLoading={loading} />
      {/* Rest of component */}
    </>
  )
}
```

### Pattern 2: Table Row Loading

Use when data exists but is being refreshed/filtered.

```tsx
<TableBody>
  {loading ? (
    Array.from({ length: 8 }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({ length: 8 }).map((_, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton 
              className="h-4 rounded" 
              style={{ width: getColumnWidth(colIndex) }}
            />
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    data.map(item => <DataRow key={item.id} item={item} />)
  )}
</TableBody>
```

### Pattern 3: Simulated Loading (Static Data)

For demonstrating skeleton behavior with static data.

```tsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500);
  return () => clearTimeout(timer);
}, []);
```

## Best Practices

### 1. Match Content Shape

Skeleton elements should closely match the size and shape of actual content.

```tsx
// Good: Matches actual content dimensions
<Skeleton className="h-4 w-32" /> // For names
<Skeleton className="h-6 w-16 rounded-full" /> // For badges
<Skeleton variant="circular" className="h-10 w-10" /> // For avatars

// Avoid: Generic shapes that don't match content
<Skeleton className="h-4 w-full" /> // Too wide for all content
```

### 2. Vary Widths for Realism

Use varying widths to simulate realistic text content.

```tsx
{Array.from({ length: lines }).map((_, index) => (
  <Skeleton 
    key={index} 
    className="h-4" 
    style={{ 
      width: index === lines - 1 ? "60%" : "100%" 
    }} 
  />
))}
```

### 3. Accessibility First

Always include proper ARIA labels and screen reader support.

```tsx
<div 
  role="status" 
  aria-label="Loading table content..."
>
  <TableSkeleton />
  <span className="sr-only">Loading data, please wait...</span>
</div>
```

### 4. Performance Considerations

- Use consistent number of skeleton items
- Avoid too many skeleton elements (max 10-15 table rows)
- Prefer CSS animations over JavaScript

### 5. Animation Guidelines

- Use "wave" animation for modern feel
- Use "pulse" for simpler designs
- Use "none" for minimal/clean interfaces

## Column-Specific Skeleton Widths

Different content types should have appropriate skeleton widths:

```tsx
const getSkeletonWidth = (columnType: string) => {
  switch (columnType) {
    case 'name': return '120px'
    case 'email': return '140px'
    case 'date': return '85px'
    case 'status': return '80px'
    case 'badge': return '60px'
    case 'actions': return '100px'
    default: return '100px'
  }
}
```

## Dark Mode Support

Skeletons automatically adapt to dark mode through CSS custom properties:

```css
/* Light mode */
--color-muted: oklch(0.97 0 0);

/* Dark mode */
.dark {
  --color-muted: oklch(0.269 0 0);
}
```

## Animation Customization

The shimmer animation can be customized in `globals.css`:

```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

## Testing Checklist

- [ ] Skeleton matches actual content shape
- [ ] Proper loading/non-loading state transitions
- [ ] Screen reader announcements work
- [ ] Dark mode compatibility
- [ ] Animation performance is smooth
- [ ] No layout shift when content loads
- [ ] Accessible keyboard navigation
- [ ] Proper ARIA labels and roles

## Common Patterns by Page Type

### Jobs Page
- Filter card skeleton
- 8 table rows × 8 columns
- Badge skeletons for status/priority
- Link skeletons for job titles

### Candidates Page  
- Filter card with 2 input skeletons
- 6 table rows × 7 columns
- Avatar skeletons for profile images
- Tag badge skeletons

### Companies Page
- Search input skeleton
- 7 table rows × 6 columns
- Multi-line description skeletons
- Badge skeletons for job counts

## Integration with State Management

```tsx
// Redux state typically includes loading flag
const { data, loading, error } = useAppSelector(state => state.feature)

// Use loading flag to control skeleton display
{loading && data.length === 0 ? (
  <PageLoadingSkeleton type="jobs" />
) : (
  <ActualContent />
)}
```

## Error Handling

Skeletons should be replaced with error states when loading fails:

```tsx
if (error) {
  return <ErrorState message={error} />
}

if (loading) {
  return <SkeletonComponent />
}

return <ActualContent />
```

This skeleton system provides a consistent, accessible, and modern loading experience across the entire ATS application.