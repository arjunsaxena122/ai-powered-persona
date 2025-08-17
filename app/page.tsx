"use client"
import ChatContainer from "@/components/ChatContainer";
import GridContainer from "@/components/GridContainer";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-4xl my-20 capitalize">
        Chat with Best Tech-Industries Teacher{" "}
      </h1>
      <div className="grid grid-cols-2 place-items-center">
        <GridContainer />
        <ChatContainer />
      </div>
    </div>
  );
}
