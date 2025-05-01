import { toast } from 'sonner'

import { APIRoutes } from './routes'

import { Agent, ComboboxAgent, SessionEntry } from '@/types/playground'
import { getUserId } from '@/lib/utils'

export const getPlaygroundAgentsAPI = async (
  endpoint: string
): Promise<ComboboxAgent[]> => {
  const userId = getUserId()
  const url = `${APIRoutes.GetPlaygroundAgents(endpoint)}?user_id=${userId}`
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      toast.error(`Failed to fetch playground agents: ${response.statusText}`)
      return []
    }
    const data = await response.json()
    // Transform the API response into the expected shape.
    const agents: ComboboxAgent[] = data.map((item: Agent) => ({
      value: item.agent_id || '',
      label: item.name || '',
      model: item.model || '',
      storage: item.storage || false
    }))
    return agents
  } catch {
    toast.error('Error fetching playground agents')
    return []
  }
}

export const getPlaygroundStatusAPI = async (base: string): Promise<number> => {
  const userId = getUserId()
  const response = await fetch(
    `${APIRoutes.PlaygroundStatus(base)}?user_id=${userId}`,
    {
      method: 'GET'
    }
  )
  return response.status
}

export const getAllPlaygroundSessionsAPI = async (
  base: string,
  agentId: string
): Promise<SessionEntry[]> => {
  const userId = getUserId()
  try {
    const response = await fetch(
      `${APIRoutes.GetPlaygroundSessions(base, agentId)}?user_id=${userId}`,
      {
        method: 'GET'
      }
    )
    if (!response.ok) {
      if (response.status === 404) {
        // Return empty array when storage is not enabled
        return []
      }
      throw new Error(`Failed to fetch sessions: ${response.statusText}`)
    }
    return response.json()
  } catch {
    return []
  }
}

export const getPlaygroundSessionAPI = async (
  base: string,
  agentId: string,
  sessionId: string
) => {
  const userId = getUserId()
  const response = await fetch(
    `${APIRoutes.GetPlaygroundSession(base, agentId, sessionId)}?user_id=${userId}`,
    {
      method: 'GET'
    }
  )
  return response.json()
}

export const deletePlaygroundSessionAPI = async (
  base: string,
  agentId: string,
  sessionId: string
) => {
  const userId = getUserId()
  const response = await fetch(
    `${APIRoutes.DeletePlaygroundSession(base, agentId, sessionId)}?user_id=${userId}`,
    {
      method: 'DELETE'
    }
  )
  return response
}
