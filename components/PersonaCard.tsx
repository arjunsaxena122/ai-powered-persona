import Image from "next/image";
import { useChatActiveStore } from "@/store/useChatActive.store";
import { Button } from "./ui/button";

interface IProps {
  name: string;
  src: string;
  alt: string;
}

export default function PersonaCard({ name, src, alt }: IProps) {
  const { isActiveChat, setIsActiveChat } = useChatActiveStore();
  const active = isActiveChat === name;

  return (
    <div
      className={`flex items-center justify-around py-3 px-1 rounded-lg cursor-pointer transition-colors
        ${
          active
            ? "bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800"
            : "hover:bg-neutral-100 border  dark:hover:bg-neutral-800"
        }
      `}
      onClick={() => setIsActiveChat(name)}
    >
      <div className="flex items-center gap-3">
        <Image
          src={src}
          alt={alt}
          width={50}
          height={50}
          className="rounded-full border border-neutral-200 dark:border-neutral-700"
        />
        <span className="text-md font-medium">{name}</span>
      </div>
      {active && (
        <Button size="sm" className="text-xs h-7 px-3">
          Chatting
        </Button>
      )}
    </div>
  );
}
