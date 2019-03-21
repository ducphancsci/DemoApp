import {AsyncStorage} from "react-native";
import Deck from "./../data/Deck";
import {MockDecks} from "./../data/Mocks"
export const DECK_KEY = "DemoApp:decks";

async function read(key, deserializer) {
    try {
      let val = await AsyncStorage.getItem(key);
      if (val == null) {
          console.info(`${key} not found`);
      }
      
      let readValue = JSON.parse(val).map(serialized => {
        return deserializer(serialized);
      });
      return readValue;
    } catch (error) {
      console.warn("AsyncStorage error: ", error.message);
    }
  }
  
  async function write(key, item) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error("AsyncStorage error: ", error.message);
    }
  }
  
  export const readDecks = () => {
    return read(DECK_KEY, Deck.fromObject);
  };
  
  export const writeDecks = decks => {
    return write(DECK_KEY, decks);
  };