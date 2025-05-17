# CONTRIBUTION GUIDE

On this page you'll see a detailed guide explaining the basics to contribute to Rustory.  
Some things we'll see here are: how to use colors, how to use some html elements, how to almost evey important thing.

## Colors

One of the most important things on a project are colors.  
Most of the Rustory themes use Tailwind CSS default colors but some others, like rust theme, need a custom colro palette.

### Custom color palettes

The custom color palette can be defined on the `app.css` file on this folder. Check the rust palette and use it as a base.  
Color palettes must be formed by 11 variants: **50**, **100**, **200**, **300**, **400**, **500**, **600**, **700**, **800**, **900** and **950**.

### How to use color palettes

On **light** themes, colors will be the following ones:

- **x-100** for the background colors.
- **x-200** for the sub-background colors and `hover:` colors on buttons and similars. An example is the `<main>` background color o the `routes/+layout.svelte`.
- **x-900** for the font color.

On **dark** themes, colors will be the following ones:

- **x-900** for the background colors.
- **x-800** for the sub-background colors and `hover:` colors on buttons and similars. An example is the `<main>` background color o the `routes/+layout.svelte`.
- **x-100** for the font color.

On `both` themes we'll use this styles:

- **x-black/50** for shadows.
- **opacity-50** for disabled elements.
- **hover:scale-105** for hover styles. Mostly on buttons. We can still use other styles like MainNav links.

> [!WARNING]
> It's EXTREMELY important to set `duration-200` and both `t-theme:text-x-x` if it has text or Icons.  
> If you don't do this, the transition when changing themes will not be smooth.

_Any element not listed here can use any color from the same palette!_

## z-index

This is an extremely important topic if we want everything to work as expected.  
Here's a table with the z-index layers used on the project:

| z-index  | layer       | elements                    |
| :------: | :---------- | :-------------------------- |
|   0-99   | Basic UI    | Dropdowns, context menus... |
| 100-499  | Floating UI | Popups, notifications...    |
| 500-1000 | Cover UI    | Loaders...                  |
