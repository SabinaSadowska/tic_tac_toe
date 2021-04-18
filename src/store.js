import { createStore } from "redux";
import rootReducer from "./modules/rootReducer";
export default function configureStore(intialState) {
  return createStore(rootReducer, intialState);
}
