import axios from "axios";

export const searchCard = (values: any) => {
  return axios.get("http://localhost:8000/api/hearthstone/cards", {
    params: {
      page: values?.activePage,
      rarity: values?.rarity,
      cardType: values?.cardType,
      minionType: values?.minionType,
      cardClass: values?.cardClass,
      setGroup: values?.mode,
      keyword: values?.keyword,
      manaCost: values?.cost,
      name: values?.name,
    },
  });
};
