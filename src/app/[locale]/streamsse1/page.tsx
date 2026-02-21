'use client'
import MarkdownAIComponent, { PROMPT_RULE_MARKDOWN_MATH } from "@/components/markdownComponent";
import { useFetchSSEStream } from "@repo/ui"
import { useState, useEffect } from "react";

export default function Page() {
  const { start, stop } = useFetchSSEStream();
  const [m, setM] = useState("");

  useEffect(() => {
    start({
      url: '/api/sseChat',//http://localhost:8000/generale_chat2
      method: 'POST',

      body: JSON.stringify({
        threadId: "123",
        userId: "123",
        content: `${PROMPT_RULE_MARKDOWN_MATH}\n\nquestion:how to solve this equation 3x2 + 2x +4=0`,
      }),
      onMessage: (chunk) => {
        console.log('token:', chunk);
        setM(prev => prev + chunk.token); // append token
      },
      onDone: () => console.log('stream done'),
      onError: (err) => console.error(err),
    });

    return () => stop(); // cleanup on unmount
  }, []);

  return <div className="max-w-2xl m-auto overflow-auto my-20">

    <MarkdownAIComponent content={m}  />
  </div>;
}
