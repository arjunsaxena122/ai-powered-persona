import Image from "next/image";
import { Card } from "./ui/card";

const GridCard = ({ src, name }: { name: string; src: string }) => {
  return (
    <Card className="flex justify-center items-center px-10 cursor-pointer hover:bg-gray-800 transition-all ease-in-out ">
      <Image
        src={src}
        alt="Hitesh Sir image"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="text-xl font-bold">{name}</h1>
    </Card>
  );
};

export default GridCard;
