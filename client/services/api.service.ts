export abstract class ApiService {
  public static BASE_URL = "http://localhost:8000/api";

  public static GET_DECK = "";
  public static GET_DECKS = "/hearthstone/decks";
  public static PUT_DECK = "";
  public static POST_DECK = "/hearthstone/deck";
  public static DELETE_DECK = "";

  public static GET_CARD = "";
  public static GET_CARDS = "";

  public static POST_DECK_CODE = "/hearthstone/encode";

  public static POST_VERIFY_CODE = "/auth/code";
  public static POST_SEND_NEW_CODE = "/auth/send_code";
  public static POST_LOGIN = "/auth/login";
  public static POST_REGISTER = "/auth/register";
  public static GET_USER = "/auth/user";
}
