"use client";

import GridCard from "./GridCard";

const GridContainer = () => {
  return (
    <div className="flex flex-col gap-15">
      <GridCard src="/hiteshsir.jpg" name="Hitesh Sir" />
      <GridCard src="/piyushsir.jpg" name="Piyush Sir" />
    </div>
  );
};

export default GridContainer;
