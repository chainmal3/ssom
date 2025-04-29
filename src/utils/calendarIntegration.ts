/**
 * Calendar Integration Utilities
 *
 * This module provides functions for integrating with Google Calendar and iCal.
 * It handles the generation of URLs for adding individual events to calendars
 * and subscribing to the entire calendar feed.
 *
 * Future maintainers:
 * - Keep URL formats updated with Google/Apple documentation
 * - Test with actual calendar applications when making changes
 * - Add support for additional calendar types as needed
 */

import { parseISO } from 'date-fns'

// Constants
export const GOOGLE_CALENDAR_ID = 'soundsystemsofmelbourne@gmail.com'

// Error messages for user-friendly feedback
export const ERROR_MESSAGES = {
  GOOGLE_CALENDAR:
    'Unable to add to Google Calendar. Please check your connection and try again.',
  ICAL: 'Unable to create iCal file. Please try again.',
  SUBSCRIPTION: 'Unable to subscribe to calendar. Please try again later.',
  DOWNLOAD: 'Unable to download calendar file. Please try again later.',
}

/**
 * Calendar event interface matching the structure from Google Calendar API
 */
export interface CalendarEvent {
  id: string
  summary: string
  description?: string
  location?: string
  start: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  end: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
}

/**
 * Properly formats a calendar ID for use in URLs
 * This handles special cases like email-based IDs
 *
 * @param calendarId The raw calendar ID (often an email address)
 * @returns Properly formatted ID for use in calendar URLs
 */
export const getProperlyFormattedCalendarId = (calendarId: string): string => {
  // For email-based calendar IDs (common with Google Calendar)
  if (calendarId.includes('@')) {
    // Format specifically for Google Calendar's required encoding
    return calendarId.replace('@', '%40')
  }

  // For other ID formats, use standard encoding
  return encodeURIComponent(calendarId)
}

/**
 * Generates a URL for directly downloading the calendar ICS file
 * For testing or as a fallback option
 *
 * @param calendarId The Google Calendar ID
 * @param format The format to use ('full' or 'basic')
 * @returns URL for direct download of calendar file
 */
export const generateCalendarDownloadUrl = (
  calendarId: string = GOOGLE_CALENDAR_ID,
  format: 'full' | 'basic' = 'basic',
): string => {
  // Format the calendar ID properly
  const formattedId = getProperlyFormattedCalendarId(calendarId)

  // Generate direct HTTPS download URL
  return `https://calendar.google.com/calendar/ical/${formattedId}/public/${format}.ics`
}

/**
 * Creates an object with multiple calendar URL variants
 * This is useful for diagnostics and offering multiple options
 *
 * @param calendarId The Google Calendar ID
 * @returns Object containing various calendar URL formats
 */
export const generateCalendarUrlVariants = (
  calendarId: string = GOOGLE_CALENDAR_ID,
) => {
  // Format the calendar ID properly
  const formattedId = getProperlyFormattedCalendarId(calendarId)

  // Log ID information for debugging
  console.log('Calendar ID information:', {
    original: calendarId,
    formatted: formattedId,
  })

  // Create multiple URL variants for testing
  const urls = {
    // Google Calendar subscription
    google: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(
      `https://calendar.google.com/calendar/ical/${formattedId}/public/basic.ics`,
    )}`,

    // iCal subscription variants
    ical: {
      // Primary variant (calendar.google.com)
      primary: `webcal://calendar.google.com/calendar/ical/${formattedId}/public/basic.ics`,

      // Alternate variant (www.google.com)
      alternate: `webcal://www.google.com/calendar/ical/${formattedId}/public/basic.ics`,

      // Full format variant
      full: `webcal://calendar.google.com/calendar/ical/${formattedId}/public/full.ics`,

      // With explicit parameters
      withParams: `webcal://calendar.google.com/calendar/ical/${formattedId}/public/full.ics?ctz=UTC`,
    },

    // Direct download links (HTTPS) for testing and fallback options
    download: {
      basic: `https://calendar.google.com/calendar/ical/${formattedId}/public/basic.ics`,
      full: `https://calendar.google.com/calendar/ical/${formattedId}/public/full.ics`,
    },
  }

  // Log URL variants for debugging
  console.log('Calendar URLs generated:', urls)

  return urls
}

/**
 * Generates a Google Calendar URL for adding a single event
 *
 * @param event The calendar event to generate a URL for
 * @returns URL for adding the event to Google Calendar
 */
export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
  // Format dates for Google Calendar URL
  const startDate = event.start.dateTime
    ? parseISO(event.start.dateTime)
        .toISOString()
        .replace(/-|:|\.\d+/g, '')
    : event.start.date?.replace(/-/g, '')

  const endDate = event.end.dateTime
    ? parseISO(event.end.dateTime)
        .toISOString()
        .replace(/-|:|\.\d+/g, '')
    : event.end.date?.replace(/-/g, '')

  // Build the URL with proper encoding
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.summary,
    dates: `${startDate}/${endDate}`,
    ...(event.description && { details: event.description }),
    ...(event.location && { location: event.location }),
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Generates iCal content for a calendar event
 *
 * @param event The calendar event to generate iCal content for
 * @returns String content of the iCal file
 */
export const generateICalContent = (event: CalendarEvent): string => {
  // Create a unique identifier
  const uid = `${event.id}@soundsystemsofmelbourne.com`

  // Format dates for iCal
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''

    return dateString.replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const startDate = event.start.dateTime
    ? formatDate(event.start.dateTime)
    : event.start.date
      ? event.start.date.replace(/-/g, '')
      : ''

  const endDate = event.end.dateTime
    ? formatDate(event.end.dateTime)
    : event.end.date
      ? event.end.date.replace(/-/g, '')
      : ''

  // Format location and description with proper escaping
  const formatText = (text?: string) => {
    if (!text) return ''

    return text
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
  }

  // Build the iCal content
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SSOM//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `SUMMARY:${formatText(event.summary)}`,
    ...(event.description
      ? [`DESCRIPTION:${formatText(event.description)}`]
      : []),
    ...(event.location ? [`LOCATION:${formatText(event.location)}`] : []),
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/**
 * Downloads an iCal file for a calendar event
 *
 * @param event The calendar event to download as iCal
 * @returns void - triggers a file download in the browser
 */
export const downloadICalFile = (event: CalendarEvent): void => {
  try {
    // Generate iCal content
    const icalContent = generateICalContent(event)

    // Create file for download
    const blob = new Blob([icalContent], {
      type: 'text/calendar;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)

    // Create and trigger download link
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${event.summary.replace(/\s+/g, '_')}.ics`)
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating iCal file:', error)
    // Allow calling code to handle the error
    throw new Error(ERROR_MESSAGES.ICAL)
  }
}

/**
 * Generates a URL for directly subscribing to the full Google Calendar
 * Uses a format that adds the calendar in a single click without opening settings
 *
 * @param calendarId The Google Calendar ID to subscribe to (default: SSOM calendar)
 * @returns URL for subscribing to the Google Calendar
 */
export const generateGoogleCalendarSubscriptionUrl = (
  calendarId: string = GOOGLE_CALENDAR_ID,
): string => {
  // Get all URL variants
  const urls = generateCalendarUrlVariants(calendarId)

  // Return the Google Calendar subscription URL
  return urls.google
}

/**
 * Generates a URL for subscribing to the calendar via iCal
 * Creates a properly formatted calendar URL following Apple Calendar documentation
 * https://developer.apple.com/documentation/foundation/calendar
 *
 * @param calendarId The Google Calendar ID to subscribe to (default: SSOM calendar)
 * @returns iCal subscription URL
 */
export const generateICalSubscriptionUrl = (
  calendarId: string = GOOGLE_CALENDAR_ID,
): string => {
  // Format the calendar ID properly for Google Calendar
  const formattedId = getProperlyFormattedCalendarId(calendarId)

  // Create a standard webcal:// URL for Apple Calendar
  // Using webcal:// protocol is critical for creating a subscribable calendar
  // Format follows Apple Calendar's expected URI scheme for calendar subscriptions
  return `webcal://calendar.google.com/calendar/ical/${formattedId}/public/basic.ics`
}

/**
 * Initiates a direct download of the full calendar file
 * This is a fallback option when subscription doesn't work
 *
 * @param calendarId The Google Calendar ID to download (default: SSOM calendar)
 * @param format The format to use ('full' or 'basic')
 */
export const downloadFullCalendar = (
  calendarId: string = GOOGLE_CALENDAR_ID,
  format: 'full' | 'basic' = 'full',
): void => {
  try {
    // Get the download URL
    const downloadUrl = generateCalendarDownloadUrl(calendarId, format)

    // Create and trigger download link
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', 'ssom_calendar.ics')
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading calendar file:', error)
    throw new Error(ERROR_MESSAGES.DOWNLOAD)
  }
}

/**
 * Tests direct access to the calendar feed and logs results
 * This is useful for debugging when calendar integration isn't working
 *
 * @param calendarId The Google Calendar ID to test
 */
export const testCalendarAccess = async (
  calendarId: string = GOOGLE_CALENDAR_ID,
): Promise<void> => {
  // Get the download URLs
  const urls = generateCalendarUrlVariants(calendarId)

  // Test both feed formats
  const testUrls = [urls.download.basic, urls.download.full]
  const results = []

  console.log('Testing calendar access...')

  for (const url of testUrls) {
    try {
      // Attempt to fetch the calendar data
      const response = await fetch(url)
      const data = await response.text()

      // Check if the feed contains events
      const hasEvents = data.includes('BEGIN:VEVENT')
      const eventCount = (data.match(/BEGIN:VEVENT/g) || []).length

      results.push({
        url,
        status: response.status,
        hasEvents,
        eventCount,
        sampleData: data.substring(0, 200) + '...',
      })
    } catch (error) {
      results.push({
        url,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  // Log the results
  console.table(results)

  return
}
