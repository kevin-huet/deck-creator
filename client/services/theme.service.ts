import { ColorScheme } from "@mantine/core";
import { DarkTheme } from "../themes/dark.theme";
import { LightTheme } from "../themes/light.theme";

export abstract class ThemeService {
  private static darkTheme = DarkTheme;
  private static lightTheme = LightTheme;
  public static getThemeFormScheme(colorScheme: ColorScheme) {
    if (colorScheme === "dark") {
      return this.darkTheme;
    }
    return this.lightTheme;
  }
}
