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

- `bg-<color>-100` for the background colors.
- `bg-<color>-300` for the sub-background colors and `hover:` colors on buttons and similar.
- `text-<color>-900` for the font color.

On **dark** themes, colors will be the following ones:

- `bg-<color>-900` for the background colors.
- `bg-<color>-800` for the sub-background colors and `hover:` colors on buttons and similar.
- `text-<color>-100` for the font color.

On **both** themes we'll use this styles:

- `enabled:shadow-sm enabled:shadow-black/50` for shadows.
- `disabled:opacity-50` for disabled elements.
- `enabled:hover:scale-105` for button hover styles.

> [!WARNING]
> If you set a `duration-<time>` that affect colors it's extremely important to set `t-<theme>:text-<color>-<variant>` if th element contains text or Icons, otherwise the color change animation of those will take double the time.  
> This is a bug or something on CSS. If an element with a `duration-<time>` has a text color and a child element has another `duration-<time>` but inheriths the text color of the parent element the child `duration-<time>` will be added to the parent one increasing the duration time of the text color changing of the children. If you have 2 `duration-[2s]` the child text animation will take 4 seconds for example.  
> Changing the color of the child element(even if the color is the same one) will break this bug and work normally.  
> This may happen on `bg-<color>-<variant>` too, I didn't tested it.

_Any element not listed here can use any color from the same palette!_

## z-index

This is an extremely important topic if we want everything to work as expected.  
Here's a table with the z-index layers used on the project:

| z-index  | layer       | elements                    |
| :------: | :---------- | :-------------------------- |
|   0-99   | Basic UI    | Dropdowns, context menus... |
| 100-499  | Floating UI | Popups, notifications...    |
| 500-1000 | Cover UI    | Loaders...                  |
