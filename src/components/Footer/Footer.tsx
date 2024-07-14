import * as React from 'react';
import { ThemeSelector } from './ThemeSelector';

function Footer() {
  return (
    <footer className="flex h-7 w-max mx-auto items-center justify-center rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-950 ring-opacity-10 dark:ring-opacity-5 bg-secondary-0 dark:bg-secondary-1000 p-1 mt-md  mb-2xs">
      <small className="font-lato text-base oldstyle-nums mr-4">&#127279; 2023 Jonah Bedouch</small>
      <ThemeSelector />
    </footer>
  )
}

export default Footer;
