import { CardType, hsClassType } from "../../types/hearthstone.types";
import axios from "axios";
import { ApiService } from "../api.service";

export async function getDeckCode(cards: CardType[], hsClass: string) {
  return axios.post(ApiService.BASE_URL + ApiService.POST_DECK_CODE, {
    cards: cards,
    classSlug: hsClass,
  });
}

export async function createDeck(
  cards: CardType[],
  hsClass: string,
  modeSlug: string,
  deck: { name: string; description: string; isPublic: boolean }
) {
  console.log(deck);
  return axios.post(ApiService.BASE_URL + ApiService.POST_DECK, {
    cards,
    hsClass,
    modeSlug,
    deck,
  });
}
