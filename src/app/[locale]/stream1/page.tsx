"use client";

import { useHttpFastAPIStream } from "@repo/ui";
import { useState } from "react";
 
type StreamChunk = {
  type: "token" | "done";
  index?: number;
  content?: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const { stop, start } = useHttpFastAPIStream();

  function sendMessage() {
    setMessages("");       // clear previous message
    stop();                // stop any running stream
    setIsStreaming(true);
    start({
      url: "http://localhost:8000/chat/stream-json",
      method: "POST",
      body: { message: input }, // only body needed for POST
      onChunk: (data: StreamChunk) => {
        if (data.type === "token") {
          setMessages((prev) => prev + data.content);
        }
      },
      onDone: () => {
        setIsStreaming(false);
        setMessages((prev) => prev + '**--done--**');
        console.log("Stream finished ✅");
      },
      onError: (err) => {
        setIsStreaming(false);
        console.error("Stream error:", err);
      },
    });
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">JSON Streaming Chatbot</h1>

      <div className="border p-4 rounded min-h-[120px] whitespace-pre-wrap">
        {messages || "Bot response will stream here..."}
        {isStreaming && <span className="animate-pulse text-gray-400">▌</span>}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Say something..."
      />

      <div className="flex gap-2">
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
          disabled={isStreaming}
        >
          Send
        </button>
        <button
           onClick={()=>{
            stop();
            setIsStreaming(false)
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={!isStreaming}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
