import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid'; // Tailwind CSS Icons
import HeroDarkImg from './path/to/hero-dark.png'; // Adjust the path as needed
import HeroLightImg from './path/to/hero-light.png'; // Adjust the path as needed

const Hero = () => {
  return (
    <section id="hero" className="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8">
      <div className="group inline-flex h-7 -translate-y-4 items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black">
        <div className="inline-flex items-center justify-center">
          <span>✨ Introducing Svee UI Template</span>
          <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>
      </div>
      <h1 className="-translate-y-4 text-transparent bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter opacity-0 dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">
        Svee UI is the new way
        <br className="hidden md:block" />
        to build landing pages.
      </h1>
      <p className="mb-12 -translate-y-4 text-lg tracking-tight text-gray-400 opacity-0 md:text-xl">
        Beautifully designed, animated components and templates built with
        <br className="hidden md:block" />
        Tailwind CSS, <a href="https://svelte.dev" className="underline underline-offset-2">Svelte</a>, and
        <a href="https://animation-svelte.vercel.app" className="underline underline-offset-2">Svelte Animations</a>.
      </p>
      <button className="relative -translate-y-4 gap-1 rounded-lg bg-blue-500 text-white py-2 px-4 text-sm font-medium opacity-0 dark:bg-gray-800">
        <span>Get Started for free </span>
        <ArrowRightIcon className="ml-1 w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </button>
      <div className="relative mt-32 opacity-0 perspective-2000">
        <div className="relative rounded-xl border border-white/10 bg-white bg-opacity-[0.01]">
          <img
            src={HeroDarkImg}
            alt="Hero Dark"
            className="relative hidden size-full rounded-[inherit] border object-contain dark:block"
          />
          <img
            src={HeroLightImg}
            alt="Hero Light"
            className="relative block size-full rounded-[inherit] border object-contain dark:hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
