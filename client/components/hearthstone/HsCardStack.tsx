import { CardType } from "../../types/hearthstone.types";
import React, { useEffect, useState } from "react";
import { CardMenu } from "./CardMenu";
import { BackgroundImage, Box, Stack, Text } from "@mantine/core";

export const HsCardStack = ({
  deckCards,
  setDeckCards,
}: {
  deckCards: CardType[];
  setDeckCards: any;
}) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [cardTarget, setTarget] = useState(undefined);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const removeCardFromDeck = (card: CardType) => {
    let nextDeckCards: CardType[] = [...deckCards];
    const find: CardType | undefined = deckCards.find(
      (deckCard: CardType) => deckCard.blizzard_id === card.blizzard_id
    );
    if (find) {
      if (find.nb === 2) {
        find.nb--;
      } else {
        nextDeckCards = nextDeckCards.filter(
          (item: CardType) => item.blizzard_id !== card.blizzard_id
        );
      }
      setDeckCards(nextDeckCards);
    }
    setMenuOpened(false);
  };
  const moveMenu = (e: MouseEvent) => {
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    const concernedElement = document.querySelector(".click-event-deck");
    document.addEventListener("mousedown", (event) => {
      if (!concernedElement?.contains(event.target as Node)) {
        setMenuOpened(false);
      }
    });
  }, []);
  return (
    <>
      <CardMenu
        menuType={"menu-deck"}
        removeCardFromDeck={removeCardFromDeck}
        position={menuPosition}
        card={cardTarget}
        opened={menuOpened}
      />

      <Stack>
        {deckCards?.map((card: any, index: number) => {
          return (
            <Box
              className={"click-event-deck"}
              onClick={(e: any) => {
                setMenuOpened(true);
                setTarget(card);
                moveMenu(e);
              }}
              sx={{ width: "100%" }}
              mx="auto"
              key={index}
            >
              <BackgroundImage
                src={card.cropImage ? card.cropImage : card.image}
                radius="sm"
                sx={{ height: 45 }}
                style={{ alignItems: "center", display: "flex" }}
              >
                <Box
                  sx={{
                    background: "black",
                    width: "max-content",
                    borderRadius: 10,
                  }}
                  mx="xs"
                  px="xs"
                  py={2}
                >
                  <Text align={"left"}>{card.manaCost}</Text>
                </Box>
                <Box
                  sx={{
                    background: "black",
                    width: "max-content",
                    borderRadius: 10,
                  }}
                  px="xs"
                  py={2}
                >
                  <Text align={"center"}>{card.name}</Text>
                </Box>
                <Box
                  sx={{
                    background: "black",
                    width: "max-content",
                    borderRadius: 10,
                  }}
                  mx="xs"
                  px="xs"
                  py={2}
                >
                  <Text align={"left"}>x{card.nb ? card.nb : 1}</Text>
                </Box>
              </BackgroundImage>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};
