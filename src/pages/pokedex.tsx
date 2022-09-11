import type { NextPage } from "next";
import Head from "next/head";
import { PokemonSprites } from "pokenode-ts";
import React from "react";
import { number, string } from "zod";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PokeDex on Blais.gg</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="" href="" />
      </Head>

      <main className="p-6 justify-center items-center">
        <div className="container flex flex-wrap items-center justify-start gap-5">
          <AllPokemon />
        </div>
      </main>
    </>
  );
};

//<AllPokemon />

type PokemonCardProps = {
  name?: string;
  type1?: string;
  type2?: string;
  sprite?: string;
};

const PokemonCard = ({ name, type1, type2, sprite }: PokemonCardProps) => {
  return (
    <section className="flex flex-col w-48 h-48 justify-center p-6 rounded-md border-4 border-gray-400 motion-safe:hover:scale-105 duration-500">
      <h3 className="font-bold text-gray-300">{name}</h3>
      <p className="text-gray-400"></p>
      <img src={sprite} className="w-full" />
    </section>
  );
};

const AllPokemon = () => {
  let PokeArray: [string?, string?, string?, string?][] = new Array();

  for (let i: number = 1; i < 800; i++) {
    const pokemon = trpc.useQuery(["pokemon-get", { id: i }]);
    PokeArray.push([
      pokemon.data?.name,
      "",
      "",
      pokemon.data?.sprites.front_default != null
        ? pokemon.data?.sprites.front_default
        : "",
    ]);
  }

  return (
    <>
      {PokeArray.map((item, index) => {
        return (
          <PokemonCard
            name={item[0]}
            type1={item[1]}
            type2={item[2]}
            sprite={item[3]}
          />
        );
      })}
    </>
  );
};

export default Home;
