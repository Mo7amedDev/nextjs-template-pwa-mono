"use client";

import { useAutoScroll, useHttpFastAPIStream } from "@repo/ui";
import { useState } from "react";
 
type StreamChunk = {
    type: "token" | "done";
    index?: number;
    content?: string;
};

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState("");
    const [mes, setMes] = useState([""]);
    const { stop, start } = useHttpFastAPIStream();

    // use hook to auto-scroll when messages change
    const messagesRef = useAutoScroll([mes.length,messages]);

    function sendMessage() {
        setMessages("");
        stop();

        start({
            url: "http://localhost:8000/chat/stream-json",
            method: "POST",
            body: { message: input },
            onChunk: (data: StreamChunk) => {
                if (data.type === "token") {
                    setMessages(prev => prev + data.content);
                }
            },
            onDone: () => {
                setMes((prev) => [...prev, messages])
            },
            onError: (err) => console.error(err),
        });
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <h1 className="text-xl font-bold">Streaming Chatbot with Auto Scroll</h1>
            
            <div
                ref={messagesRef}
                className="border p-4 rounded h-[120px]  whitespace-pre-wrap overflow-auto"
            >

                <div>
                    {mes.map((m,index) => (<p key={index}>{m}</p>))}
                </div>
                {messages || "Bot response will stream here..."}
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
                >
                    Send
                </button>
                <button
                    onClick={stop}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Stop
                </button>
            </div>
        </div>
    );
}
