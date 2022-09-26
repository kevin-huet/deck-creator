import {Button, Menu} from "@mantine/core";
import {IconSettings, IconPhoto, IconArrowsLeftRight, IconTrash, IconCheck} from "@tabler/icons";
import React, {ChangeEvent, ChangeEventHandler} from "react";
import {Vector2} from "../../types/global.types";
import {Callback} from "escalade";
import {CardType} from "../../types/hearthstone.types";

type CardMenuProps = {
    card?: CardType,
    position: Vector2,
    opened: boolean,
    addCardToDeck?: any,
    removeCardFromDeck?: any,
    menuType: 'menu-card' | 'menu-deck'
}

export const CardMenu = (props: CardMenuProps) => {
    const { position, opened, card, addCardToDeck, menuType, removeCardFromDeck } = props;
    return (
        <div style={{ position: 'fixed', zIndex: 1, left: position.x, top: position.y}}>
            <Menu shadow="md" width={200} opened={opened}>
                <Menu.Dropdown>
                    {menuType === 'menu-card' &&
                        <>
                            <Menu.Item icon={<IconCheck size={14}/>} onClick={() => {
                                console.log(card);
                                addCardToDeck(card);
                            }}>Add to deck</Menu.Item>
                            <Menu.Item icon={<IconPhoto size={14}/>}>View Details</Menu.Item>
                        </>
                    }
                    {menuType === 'menu-deck' &&
                        <>
                            <Menu.Item icon={<IconCheck size={14}/>} onClick={() => {
                                console.log(card);
                                removeCardFromDeck(card);
                            }}>Remove</Menu.Item>
                            <Menu.Item icon={<IconPhoto size={14}/>}>View Details</Menu.Item>
                        </>
                    }
                </Menu.Dropdown>
            </Menu>
        </div>
    )
};