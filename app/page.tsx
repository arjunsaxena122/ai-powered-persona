"use client";
import ChatContainer from "@/components/ChatContainer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function Home() {
  return (
    <div className=" flex mx-auto h-screen">
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel defaultSize={20}>
          <h1 className="text-center text-4xl my-20 capitalize">
            Chat with Best Tech-Industries Teacher{" "}
          </h1>
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={80}>
          <ChatContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
