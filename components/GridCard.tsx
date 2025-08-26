import Image from "next/image";
import { Card } from "./ui/card";

const GridCard = ({ src, name }: { name: string; src: string }) => {

  function handleClickImage(e:any){
    console.log(e)
  }

  return (
    <Card className="flex justify-center items-center px-10 cursor-pointer hover:bg-gray-800 transition-all ease-in-out ">
      <Image
        src={src}
        alt="image"
        width={100}
        height={100}
        className="rounded-full"
        onClick={handleClickImage}
      />
      <h1 className="text-xl font-bold">{name}</h1>
    </Card>
  );
};

export default GridCard;
