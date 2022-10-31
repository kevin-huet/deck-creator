import { CardType, hsClassType } from "../../types/hearthstone.types";
import axios from "axios";

export async function getDeckCode(cards: CardType[], hsClass: hsClassType) {
  return axios.post(`http://localhost:8000/api/hearthstone/encode`, {
    cards: cards,
    classSlug: hsClass.slug,
  });
}
