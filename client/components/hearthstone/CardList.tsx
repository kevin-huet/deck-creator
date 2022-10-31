import React, { useEffect, useState } from "react";
import { CardType } from "../../types/hearthstone.types";
import { CardMenu } from "./CardMenu";
import { Col, Grid } from "@mantine/core";
import { HsCard } from "./HsCard";

export const CardList = ({ cards, setDeckCards, deckCards }: any) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [target, setTarget] = useState(undefined);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const moveMenu = (e: MouseEvent) => {
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };
  const addCardToDeck = (card: CardType) => {
    if (deckCards.length >= 30) return;
    if (
      deckCards.some(function (el: CardType) {
        return el.blizzard_id === card.blizzard_id;
      })
    ) {
      setDeckCards((oldArray: CardType[]) => [
        ...oldArray?.map((item) => {
          if (item.blizzard_id === card.blizzard_id) {
            item.nb = 2;
            return item;
          }
          return item;
        }),
      ]);
    } else setDeckCards((oldArray: CardType[]) => [...oldArray, card]);
    setMenuOpened(false);
  };
  useEffect(() => {
    const concernedElement = document.querySelector(".click-event-card");
    document.addEventListener("mousedown", (event) => {
      if (!concernedElement?.contains(event.target as Node)) {
        setMenuOpened(false);
      }
    });
  }, []);
  return (
    <>
      <CardMenu
        menuType={"menu-card"}
        addCardToDeck={addCardToDeck}
        position={menuPosition}
        card={target}
        opened={menuOpened}
      />
      <Grid gutter="md" className={"click-event-card"}>
        {cards?.map((card: any) => {
          return (
            <Col
              onClick={(e) => {
                setMenuOpened(true);
                setTarget(card);
                moveMenu(e as any);
              }}
              span={6}
              sm={4}
              md={3}
              lg={2}
              key={card.id}
              className={"hvr-grow"}
            >
              <HsCard card={card} />
            </Col>
          );
        })}
      </Grid>
    </>
  );
};
