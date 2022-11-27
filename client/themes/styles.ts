import { createStyles } from "@mantine/core";

export const customStyles = createStyles((theme) => ({
  themeBackgroundColor: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    boxShadow:
      theme.colorScheme === "dark"
        ? "2px 5px -5px 0px #111"
        : "0px 4px 5px -5px darkgrey",
  },
  textColor: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[0]
        : theme.colors.dark[4],
  },
  shadow: {
    boxShadow:
      theme.colorScheme === "dark"
        ? "2px 5px -5px 0px #111"
        : "0px 4px 5px -5px darkgrey",
  },
  primary: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.violet[8]
        : theme.colors.cyan[6],
  },
}));
