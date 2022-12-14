import { createRouter } from "./context";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";



export const pokeRouter = createRouter().query("pokemon-get", {
  input: z.object({id: z.number()}),
    async resolve({input}){
      const api = new PokemonClient();
      const pokemon = api.getPokemonById(input.id);
    return pokemon;
  },
});

//Test
export const pokeNames = createRouter().query("pokemon-get-names", {
  input: z.object({id: z.number()}),
    async resolve({input}){
      const api = new PokemonClient();
      const pokemon = api.listPokemons(0, 905);
    return pokemon;
  },
});
