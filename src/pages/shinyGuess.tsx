import dynamic from "next/dynamic";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import classNames from "classnames";

const nextShiny = (mon: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${mon}.png`;

const nextNormal = (mon: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${mon}.png`;

function dex(from: number, to: number) {
  const next = Math.round(Math.random() * (to - from + 1) + 0.5) + from;
  // I like clean bs
  if ([718, 774].includes(next)) return next + 1;

  return next;
}

//151 g1
//251 g2
//386 g3
//493 g4
//649 g5
//721 g6
//809 g7
//905 g8
//1008 g9

const divName =
  "container flex flex-wrap items-center justify-start gap-5 w-40 h-40 rounded-md border-4 border-gray-900";

const Vote: NextPage = () => {
  const [to, setTo] = useState(905);
  const [from, setFrom] = useState(1);
  const [streak, setStreak] = useState(0);
  const [currentMon, setCurrentMon] = useState(dex(to, from));
  const [nextMon, setNextMon] = useState(dex(to, from));

  const set = async (right: boolean) => {
    setStreak(right ? streak + 1 : 0);
    setGuess(true);
  };

  const reset = () => {
    setRand(Math.random() > 0.5);
    setGuess(false);

    // Update current mon to next
    setCurrentMon(nextMon);

    restNext();
  };

  const restNext = () => {
    // Select next mon
    const newNext = dex(to, from);

    // Cache images
    new Image().src = nextShiny(newNext);
    new Image().src = nextNormal(newNext);

    // Update next
    setNextMon(newNext);
  };

  const contain = async (right: boolean) => {
    if (!guess) {
      await set(right);
      setTimeout(() => reset(), 1000);
    }
  };

  const [guess, setGuess] = useState(false); // false = unguessed true = wrong

  const shinyClass: string = classNames(divName, {
    "bg-green-400": guess,
    "bg-slate-600": !guess,
  });

  const normalClass: string = classNames(divName, {
    "bg-red-400": guess,
    "bg-slate-600": !guess,
  });

  const showShiny = () => {
    return (
      <div className={shinyClass} onClick={() => contain(true)}>
        <img src={nextShiny(currentMon)} className="w-full" />
      </div>
    );
  };

  const showNormal = () => {
    return (
      <div className={normalClass} onClick={() => contain(false)}>
        <img src={nextNormal(currentMon)} className="w-full" />
      </div>
    );
  };

  const [rand, setRand] = useState(true);

  const showPokemon = () => {
    if (rand) {
      return (
        <>
          {showShiny()}
          {showNormal()}
        </>
      );
    } else {
      return (
        <>
          {showNormal()}
          {showShiny()}
        </>
      );
    }
  };

  //set true means we set TO
  function setVal(num: number, set: boolean) {
    if (set && num - from > 0 && num != to) {
      setTo(num);
      restNext();
      reset();
      setStreak(0);
    } else if (!set && to - num > 0 && num != from) {
      setFrom(num);
      restNext();
      reset();
      setStreak(0);
    }
  }

  const SetterButton: React.FC<{
    num: number;
    gen: string;
    set: boolean;
  }> = (props) => {
    return (
      <button
        className="flex justify-center items-center text-base text-black text-center border-4 rounded-md border-gray-400 p-2 bg-gray-300 w-20 h-10"
        onClick={() => setVal(props.num, props.set)}
      >
        {props.gen}
      </button>
    );
  };

  const ShowSetter = () => {
    return (
      <div className=" gap-2 flex flex-row space-x-8 items-center">
        <div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl md:text-[5rem] leading-normal font-extrabold text-gray-200">
              From
            </div>
            <div className="p-6 bg-slate-600 rounded-md grid grid-cols-4 grid-rows-2 gap-3 border-4 border-gray-900 ">
              <SetterButton num={1} gen={"Gen 1"} set={false} />
              <SetterButton num={152} gen={"Gen 2"} set={false} />
              <SetterButton num={252} gen={"Gen 3"} set={false} />
              <SetterButton num={387} gen={"Gen 4"} set={false} />
              <SetterButton num={494} gen={"Gen 5"} set={false} />
              <SetterButton num={650} gen={"Gen 6"} set={false} />
              <SetterButton num={722} gen={"Gen 7"} set={false} />
              <SetterButton num={810} gen={"Gen 8"} set={false} />
            </div>
          </div>
        </div>
        <div className="p-6 justify-center items-center flex w-40 h-20 bg-slate-600 rounded-md border-4 border-gray-900">
          {from} to {to}
        </div>
        <div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl md:text-[5rem] leading-normal font-extrabold text-gray-200">
              To
            </div>
            <div className="p-6 bg-slate-600 rounded-md grid grid-cols-4 grid-rows-2 gap-3 border-4 border-gray-900 ">
              <SetterButton num={151} gen={"Gen 1"} set={true} />
              <SetterButton num={251} gen={"Gen 2"} set={true} />
              <SetterButton num={386} gen={"Gen 3"} set={true} />
              <SetterButton num={493} gen={"Gen 4"} set={true} />
              <SetterButton num={649} gen={"Gen 5"} set={true} />
              <SetterButton num={721} gen={"Gen 6"} set={true} />
              <SetterButton num={809} gen={"Gen 7"} set={true} />
              <SetterButton num={905} gen={"Gen 9"} set={true} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  //{ShowSetter()}

  return (
    <>
      <Head>
        <title>Shiny Guesser</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="" href="" />
      </Head>
      <main className="p-6 justify-center items-center flex flex-col bg-slate-800 w-screen h-screen gap-3">
        <div className="justify-center items-center flex gap-3">
          {showPokemon()}
        </div>
        <div className="p-6 justify-center items-center flex bg-slate-600 gap-x-3 min-w-fit h-5 rounded-md border-4 border-gray-900">
          Current Streak: {streak}
        </div>
      </main>
    </>
  );
};

//This part makes it so that random is set on load and is not predetermined on Next
const ClientOnlyVote = dynamic(() => Promise.resolve(Vote), { ssr: false });

const Home = () => {
  return <ClientOnlyVote />;
};

export default Home;
