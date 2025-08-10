import { createContext } from "react";
import { initialState } from "../../store/reducers/reducer";

const PokemonContext = createContext<any>(initialState as any);
export default PokemonContext;