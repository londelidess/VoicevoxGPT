'use client'

import { useCallback, useEffect, useRef } from 'react'
import { MessageType } from './types'

// bottom scroll
const Scroll = ({ messages }: { messages: MessageType[] }) => {
  const messageEndRef = useRef<HTMLDivElement>(null)

  // scroll when you get messages
  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return (
    <div>
      <div ref={messageEndRef} />
    </div>
  )
}

export default Scroll
