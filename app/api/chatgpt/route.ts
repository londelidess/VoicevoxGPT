import { NextRequest, NextResponse } from 'next/server'
import { newMessageType, RoleType } from '../../components/types'
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai'
import GPT3Tokenizer from 'gpt3-tokenizer'

// Configuration for the OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// Maximum token count
const MAX_TOKEN_COUNT = 3000

export async function POST(req: NextRequest) {
  try {
    // Retrieve the question and message list
    const { question, messages } = await req.json()

    // Create message list
    const newMessages: newMessageType[] = [
      { role: ChatCompletionRequestMessageRoleEnum.User, content: question },
    ]

    // Configuration for GPT3Tokenizer
    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

    // Initialize token count
    let count = 0

    if (messages.length) {
      // Add new messages to history
      for (const data of messages.slice().reverse()) {
        let role: RoleType
        // Set role
        if (data.type === 'question') {
          role = ChatCompletionRequestMessageRoleEnum.User
        } else {
          role = ChatCompletionRequestMessageRoleEnum.Assistant
        }

        // Retrieve token count
        const encoded = tokenizer.encode(data.text)
        // Calculate count
        const newCount = count + encoded.text.length

        // If the count exceeds MAX_TOKEN_COUNT, stop adding to history
        if (newCount > MAX_TOKEN_COUNT) {
          break
        }

        // Update count
        count = newCount

        // Add to history
        newMessages.push({ role, content: data.text })
      }
    }

    // Sort messages in order of oldest first
    newMessages.reverse()

    // Add a system message at the beginning of the array
    newMessages.unshift({
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are an AI assistant. Please answer concisely.',
    })

    // Get a response from ChatGPT
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: newMessages,
      max_tokens: 256,
      temperature: 0.7,
    })

    // Get the response message
    const message = completion.data.choices[0].message?.content

    return NextResponse.json({ response: message })
  } catch (error) {
    console.log('error', error)
    return NextResponse.error()
  }
}
