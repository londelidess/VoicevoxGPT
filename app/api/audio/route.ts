import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    // Get the text and character
    const { text, speaker } = await req.json()

    // Create query for voice synthesis
    const responseQuery = await axios.post(
      `${process.env.VOICEVOX_URL}/audio_query?speaker=${speaker}&text=${text}`
    )

    // Retrieve the query
    const query = responseQuery.data

    // Synthesize the voice
    const responseSynthesis = await axios.post(
      `${process.env.VOICEVOX_URL}/synthesis?speaker=${speaker}`,
      query,
      {
        responseType: 'arraybuffer',
      }
    )

    // Convert to base64 format
    const base64Data = Buffer.from(responseSynthesis.data, 'binary').toString('base64')

    return NextResponse.json({ response: base64Data })
  } catch (error) {
    console.log('error', error)
    return NextResponse.error()
  }
}
