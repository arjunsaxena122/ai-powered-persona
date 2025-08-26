"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { useChatActiveStore } from "@/store/useChatActive.store";

export interface IResponse {
  content: string;
  role: string;
}

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<IResponse[]>([]);

  const { isActiveChat, chatUser } = useChatActiveStore();

  const handleChatButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);
    try {
      const res = await axios.post("/api/chat", { message, chatUser });
      const aiResponse = res.data.response.choices[0].message;
      setResponse((prev) => [
        ...prev,
        { role: "user", content: message },
        aiResponse,
      ]);
      setMessage("");
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800">
      <div className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 font-medium lg:text-xl">
        {isActiveChat
          ? `Chat with ${chatUser}`
          : "Choose a mentor to start chatting"}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50 dark:bg-neutral-950">
        {response.map((data, index) => (
          <div
            key={index}
            className={`flex ${
              data.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm shadow-sm leading-6 lg:max-w-xl
                ${
                  data.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white border border-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 rounded-bl-none"
                }
              `}
            >
              {data.content}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleChatButton}
        className="flex items-center gap-2 px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
      >
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-sm h-10 bg-neutral-50 dark:bg-neutral-800"
        />
        <Button type="submit" size="icon" className="h-10 w-10">
          {isLoading ? "..." : <IoMdSend size={18} />}
        </Button>
      </form>
    </div>
  );
};

export default ChatContainer;
