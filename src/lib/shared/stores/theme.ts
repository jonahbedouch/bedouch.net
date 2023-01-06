import { browser } from '$app/environment';
import { getThemeFile } from '$lib/utils';

import { writable } from 'svelte/store';


export interface ThemeOptions {
    color: 'dark' | 'light' | 'system',
    highContrast: boolean,
    seasonal: boolean
}

const defaultValue = {color: 'system', highContrast: false, seasonal: true};
const localStorageThemeStr = browser ? window.localStorage.getItem('theme') : null;
export const initialThemeValue =  localStorageThemeStr ? JSON.parse(localStorageThemeStr) : defaultValue;
export const theme = writable<ThemeOptions>(initialThemeValue);
export const showThemeModal = writable<boolean>(false);


theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('theme', JSON.stringify(value));
        window.localStorage.setItem('theme-str', getThemeFile(value))
    }

});