"use client";
import ChatContainer from "@/components/ChatContainer";
import PersonaCard from "@/components/PersonaCard";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <aside className="hidden md:flex md:flex-col w-78 border-r border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 p-6">
        <h1 className="text-lg font-semibold mb-8 text-center">
          Top Best Tech Mentors
        </h1>

        <div className="flex flex-col gap-3">
          <PersonaCard src="/hiteshsir.jpg" alt="hiteshSir" name="Hitesh Sir" />
          <PersonaCard src="/piyushsir.jpg" alt="piyushSir" name="Piyush Sir" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <ChatContainer />
      </main>
    </div>
  );
}
