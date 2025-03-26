'use client'
import Sidebar from '@/components/playground/Sidebar/Sidebar'
import { ChatArea } from '@/components/playground/ChatArea'

export default function Home() {
  return (
    <div className="bg-background/80 flex h-screen">
      <Sidebar />
      <ChatArea />
    </div>
  )
}
