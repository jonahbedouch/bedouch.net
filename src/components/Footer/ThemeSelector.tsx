'use client'

import { Checkbox, Field, Label, MenuSeparator, Popover, PopoverButton, PopoverPanel, Switch, Transition } from "@headlessui/react";
import { IconBallAmericanFootball, IconBomb, IconBurger, IconChristmasTree, IconDeviceDesktop, IconDeviceDesktopAnalytics, IconDeviceImac, IconDots, IconMoon, IconSun } from "@tabler/icons-react";
import React, { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import Boop from "../Boop";
import { calculateSeasonal } from "@/helpers/calculate-themes.helper";
// import { BoopIconDesktop } from "../BoopIcons/Monitor";

const ThemeVariants = ['system', 'light', 'dark'] as const;
type ThemeVariant = typeof ThemeVariants[number];
function validateThemeVariant(x: any): x is ThemeVariant {
    return typeof x === 'string' && ThemeVariants.includes(x as ThemeVariant);
}

const Themes = ['base', 'seasonal'] as const;
type Theme = typeof Themes[number];
function validateTheme(x: any): x is Theme {
    return typeof x === 'string' && Themes.includes(x as Theme);
}

function ThemeIcon(props: { className?: string, theme?: Theme, variant?: ThemeVariant, seasonalFallback?: ReactElement }) {
    const seasonal = calculateSeasonal();
    if (props.theme === 'seasonal' && seasonal !== 'base') {
        if (seasonal === "america") {
            return <IconBurger className={`${props.className}`} aria-hidden={true} focusable={false} />
        }
        else if (props.seasonalFallback !== undefined) {
            return React.cloneElement(props.seasonalFallback, { className: props.className, 'aria-hidden': true, focusable: false });
        }
    }

    if (props.variant === 'light') {
        return <IconSun className={props.className} aria-hidden={true} focusable={false} />
    }
    else if (props.variant === 'dark') {
        return <IconMoon className={props.className} aria-hidden={true} focusable={false} />
    }
    else if (props.variant === "system") {
        // return (<BoopIconDesktop className={`${props.className}`} />)
        return (<IconDeviceDesktop className={props.className} aria-hidden={true} focusable={false} />)
    }
    else {
        return <IconDots className={`animate-pulse ${props.className}`} aria-hidden={true} focusable={false} />
    }
}

export function ThemeSelector(props: { className?: string }) {
    const [theme, setThemeState] = useState<Theme>()
    const [variant, setThemeVariant] = useState<ThemeVariant>();

    function getTheme() {
        if (typeof localStorage === "undefined") { return 'base' }
        const theme = localStorage.getItem('theme');

        return validateTheme(theme) ? theme : 'base';
    }

    function getVariant() {
        if (typeof localStorage === "undefined") { return 'system' }
        const theme = localStorage.getItem("variant")

        return validateThemeVariant(theme) ? theme : 'system';
    }

    function setVariant(variant: ThemeVariant) {
        if (typeof localStorage === "undefined") { return }
        if (variant == 'system') {
            localStorage.removeItem('variant');
        } else {
            localStorage.variant = variant;
        }

        try {
            if (localStorage.variant === 'dark' || (!('variant' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        } catch (_) { }
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC

        setThemeVariant(variant);
    }

    function setTheme(theme: Theme) {
        if (typeof localStorage === "undefined") { return }
        localStorage.theme = theme;

        if (theme === 'seasonal') {
            document.documentElement.setAttribute('data-theme', calculateSeasonal());
        } else {
            document.documentElement.setAttribute('data-theme', theme)
        }

        setThemeState(theme)
    }

    useEffect(() => {
        setThemeState(getTheme())
        setThemeVariant(getVariant())

        const mq = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        mq.addEventListener("change", (evt) => {
            try {
                if (variant === 'system' && evt.matches) {
                    document.documentElement.classList.add('dark')
                } else {
                    document.documentElement.classList.remove('dark')
                }
            } catch (_) { }
        });

        document.body.classList.add('transition-colors', 'transition-[background]')
    })

    return (
        <Popover className="relative flex align-middle">
            <PopoverButton aria-label="Open Theme Menu" ><ThemeIcon theme={theme} variant={variant} /></PopoverButton>
            <PopoverPanel transition anchor="top"
                className="overflow-hidden rounded-lg ease-in-out shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-10 [--anchor-gap:16px] transition data-[enter]:duration-200 data-[enter]:ease-out data-[leave]:duration-150 data-[leave]:ease-in data-[closed]:opacity-0 data-[closed]:scale-90 data-[open]:opacity-100 data-[open]:scale-100"
            >
                <div className="relative grid gap-4 bg-secondary-0 dark:bg-secondary-1000 p-4">
                    <button className={`flex w-full h-10 px-2 rounded items-center transition-colors ${variant === "system" ? 'bg-secondary-200 dark:bg-secondary-900' : "hover:bg-secondary-100 dark:hover:bg-secondary-900/60"}`} onClick={() => { setVariant('system') }}>
                        <IconDeviceDesktop className="mr-2" aria-hidden={true} focusable={false} /> System
                    </button>
                    <button className={`flex w-full h-10 px-2 rounded items-center transition-colors ${variant === "light" ? 'bg-secondary-200 dark:bg-secondary-900' : "hover:bg-secondary-100 dark:hover:bg-secondary-900/60"}`} onClick={() => { setVariant('light') }}>
                        <IconSun className="mr-2" aria-hidden={true} focusable={false} /> Light
                    </button>
                    <button className={`flex w-full h-10 px-2 rounded items-center transition-colors ${variant === "dark" ? 'bg-secondary-200 dark:bg-secondary-900' : "hover:bg-secondary-100 dark:hover:bg-secondary-900/60"}`} onClick={() => { setVariant('dark') }}>
                        <IconMoon className="mr-2" aria-hidden={true} focusable={false} /> Dark
                    </button>
                    <MenuSeparator className="my-0.5 h-px bg-secondary-300 dark:bg-secondary-800" />
                    <button className={`flex w-full h-10 px-2 rounded items-center transition-colors ${theme === "seasonal" ? 'bg-secondary-200 dark:bg-secondary-900' : "hover:bg-secondary-100 dark:hover:bg-secondary-900/60"}`} onClick={() => { setTheme(theme === 'seasonal' ? 'base' : 'seasonal') }}>
                        <ThemeIcon className="mr-2" theme={'seasonal'} variant={variant} seasonalFallback={<IconChristmasTree />} /> Seasonal
                    </button>
                </div>
            </PopoverPanel>
        </Popover>
    )
}