"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [messageStore, setMessageStore] = useState<string[]>([]);
  const [responseStore, setResponseStore] = useState<string[]>([]);
  const handleChatButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/v1/chat/hiteshsir", { message });
      const aiResponse = res.data.response.choices[0].message.content;
      setResponse(aiResponse);
      setMessageStore((prev) => [...prev, message]);
      setResponseStore((prev) => [...prev, aiResponse]);
      setMessage("");
    } catch (error) {
      console.log(`ERROR from chai container ${error}`);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className="border border-amber-400">
      <div className="lg:w-2xl lg:h-[650px] overflow-y-auto overflow-x-hidden">
        <h1 className="text-center text-2xl font-bold my-2 ">
          Chat with Hitesh Sir
        </h1>
        <div className="flex flex-col gap-2 my-10">
          <div className="text-right bg-blue-500 text-white text-lg px-10 rounded-full">
            {messageStore.map((data: string, index) => (
              <p key={index}>{isLoading ? "Loading..." : data || ""}</p>
            ))}
          </div>
          <div className="text-left bg-blue-500 text-white text-lg px-10 rounded-full">
            {responseStore.map((data, index) => (
              <p key={index}>{isLoading ? "Typing..." : data || ""}</p>
            ))}
          </div>
        </div>
      </div>

      <form
        className="flex justify-center items-center"
        onSubmit={handleChatButton}
      >
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Start typing..."
          className="placeholder:font-bold h-12"
        />
        <Button type="submit" className="cursor-pointer">
          {isLoading ? "Loading..." : <IoMdSend />}
        </Button>
      </form>
    </div>
  );
};

export default ChatContainer;
