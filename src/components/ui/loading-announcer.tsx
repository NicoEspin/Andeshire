import * as React from "react"
import { useEffect, useState } from "react"

interface LoadingAnnouncerProps {
  isLoading: boolean
  loadingMessage?: string
  completedMessage?: string
  delay?: number
}

/**
 * LoadingAnnouncer component for screen reader accessibility
 * Announces loading state changes to assistive technologies
 */
const LoadingAnnouncer: React.FC<LoadingAnnouncerProps> = ({
  isLoading,
  loadingMessage = "Content is loading",
  completedMessage = "Content has finished loading",
  delay = 500
}) => {
  const [announcement, setAnnouncement] = useState("")
  const [shouldAnnounce, setShouldAnnounce] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isLoading) {
      // Delay the loading announcement to avoid too many announcements
      timeoutId = setTimeout(() => {
        setAnnouncement(loadingMessage)
        setShouldAnnounce(true)
      }, delay)
    } else if (shouldAnnounce) {
      // Announce completion only if we previously announced loading
      setAnnouncement(completedMessage)
      
      // Clear the announcement after a short delay
      timeoutId = setTimeout(() => {
        setAnnouncement("")
        setShouldAnnounce(false)
      }, 1000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isLoading, loadingMessage, completedMessage, delay, shouldAnnounce])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  )
}

export { LoadingAnnouncer }