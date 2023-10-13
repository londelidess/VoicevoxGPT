import { Dispatch, SetStateAction } from 'react'

export type CharacterType = {
    value: string
    label: string
    word: string
  }

  export type CharacterSelectProps = {
    setCharacter: Dispatch<SetStateAction<CharacterType>>
    playAudio: (text: string, speaker: string) => Promise<void>
  }

  export type MessageType = {
    text: string
    type: string
  }

export type RoleType = 'system' | 'user' | 'assistant'

// ChatGPT's message
export type newMessageType = {
  role: RoleType
  content: string
}
