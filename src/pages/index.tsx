import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcom to Blais.gg</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-start w-screen h-screen p-4 bg-zinc-800">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-200">
          Welcome to <span className="text-red-400">Blais.gg</span>
        </h1>
        <div className="flex flex-wrap w-screen justify-center pt-3 space-x-3 space-y-3 mt-3 text-center">
          <ProjectCard
            name="PokeDex"
            description="A quick showcase of all pokemon"
            link="/pokedex"
          />
          <ProjectCard
            name="Wordle Clone"
            description="Who Doesn't like a good Wordle Clone?"
            link="/wordle"
          />
          <ProjectCard
            name="Shiny Game!"
            description="Find the shiny"
            link="/shinyGuess"
          />
        </div>
      </main>
    </>
  );
};

export default Home;

type ProjectCardProps = {
  name: string;
  description: string;
  link: string;
};

const ProjectCard = ({ name, description, link }: ProjectCardProps) => {
  return (
    <a href={link}>
      <section className="flex flex-col justify-center p-6 duration-500 border-4 border-gray-300 bg-zinc-600 rounded-md motion-safe:hover:scale-110">
        <h2 className="text-lg text-gray-200">{name}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </section>
    </a>
  );
};
