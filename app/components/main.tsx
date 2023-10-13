"use client";

import { useRef, useState } from "react";
import { CharacterType, MessageType } from "./types";
import { TestMessages, Characters } from "./config";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import CharacterSelect from "./character-select";
import Scroll from "./scroll";
import Character from "./character";
import axios from "axios";

// Main Component
const Main = () => {
  const [character, setCharacter] = useState<CharacterType>(Characters[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const questionRef = useRef<HTMLInputElement>(null);

  // Set the message
  const messageHandler = (message: MessageType) => {
    setMessages((messages) => [...messages, message]);
  };

  // Play audio
  const playAudio = async (text: string, speaker: string) => {
    try {
      // Get audio
      const responseAudio = await axios.post("/api/audio", {
        text,
        speaker,
      });

      // Retrieve in Base64 format
      const base64Audio = responseAudio?.data?.response;
      // Convert to Buffer
      const byteArray = Buffer.from(base64Audio, "base64");
      // Convert to Blob
      const audioBlob = new Blob([byteArray], { type: "audio/x-wav" });
      // Convert to URL
      const audioUrl = URL.createObjectURL(audioBlob);
      // Create audio
      const audio = new Audio(audioUrl);
      // Set volume [0-1]
      audio.volume = 1;
      // Play
      audio.play();
    } catch (e) {
      console.error(e);
    }
  };

  // On submit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Start loading
    setLoading(true);

    try {
      // Get the question
      const question = questionRef.current?.value;

      // Check the question
      if (!question) {
        setLoading(false);
        return;
      }

      // Add to the message list
      const messageQuestion = { type: "question", text: question };
      messageHandler(messageQuestion);

      // Send the question to ChatGPT and get an answer
      const responseChatGPT = await axios.post("/api/chatgpt", {
        question,
        messages,
      });

      // Get the answer
      const answer = responseChatGPT?.data?.response;

      // Add to the message list
      const messageAnswer = { type: "answer", text: answer };
      messageHandler(messageAnswer);

      // Clear the question form
      questionRef.current!.value = "";

      // End loading
      setLoading(false);

      // Play the audio
      playAudio(answer, character.value);
    } catch (e) {
      console.error(e);
    } finally {
      // End loading
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Character Selection */}
      <CharacterSelect setCharacter={setCharacter} playAudio={playAudio} />

      <div className="px-3">
        {/* Messages */}
        {messages.map((data, index) => (
          <div key={index}>
            {data.type === "question" ? (
              <div className="mb-4">
                <div className="leading-relaxed break-words whitespace-pre-wrap text-gray-600">
                  {data.text}
                </div>
              </div>
            ) : data.type === "answer" ? (
              <div className="mb-4">
                <div className="leading-relaxed break-words whitespace-pre-wrap font-bold">
                  {data.text}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>

      <div>
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center my-2">
            <ArrowPathIcon className="h-6 w-6 animate-spin text-gray-600" />
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        {/* Input form */}
        <input
          className="w-full border-b py-2 px-3 focus:outline-none bg-transparent"
          placeholder="Your question..."
          ref={questionRef}
          disabled={loading}
          id="question"
          required
        />
      </form>

      {/* scroll */}
      <Scroll messages={messages} />
      {/* show illust */}
      <Character character={character} />
    </div>
  );
};

export default Main;
