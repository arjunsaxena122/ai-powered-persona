"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

export interface IResponse {
  content: string;
  role: string;
}

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<IResponse[]>([]);
  const handleChatButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/chat", { message });
      const aiResponse = res.data.response.choices[0].message;
      setResponse((prev) => [
        ...prev,
        { role: "user", content: message },
        aiResponse,
      ]);
      setMessage("");
    } catch (error) {
      console.log(`ERROR from chai container ${error}`);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className="shadow-md shadow-white  rounded-xl mx-10 my-6">
      <div className="lg:w-2xl lg:h-[650px] overflow-y-auto overflow-x-hidden">
        <h1 className="text-center text-2xl font-bold my-2 ">
          Chat with Hitesh Sir
        </h1>
        {response.map((data, index) => (
          <div key={index} className="flex flex-col gap-4">
            {data.role === "user" ? (
              <span className="self-end text-right mx-4 px-4 py-2 rounded-2xl bg-blue-500 max-w-sm border border-red-500">
                {data.content}
              </span>
            ) : (
              <span className="self-starte text-left mx-4 px-4 py-2 rounded-2xl bg-blue-500 max-w-sm border-amber-400 border">
                {data.content}
              </span>
            )}
          </div>
        ))}
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
