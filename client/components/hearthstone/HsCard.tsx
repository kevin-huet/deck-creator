import React, { useState } from "react";
import { Skeleton } from "@mantine/core";
import Image from "next/image";

export const HsCard = ({ card }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Skeleton visible={!isLoaded}>
      <Image
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
        alt={card.name}
        src={card.image}
        layout={"responsive"}
        width={"100%"}
        height={"150"}
      />
    </Skeleton>
  );
};
