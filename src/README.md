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
- `bg-<color>-400` for the accent colors and similar.
- `text-<color>-900` for the font color.

On **dark** themes, colors will be the following ones:

- `bg-<color>-900` for the background colors.
- `bg-<color>-800` for the sub-background colors and `hover:` colors on buttons and similar.
- `bg-<color>-700` for the accent colors and similar.
- `text-<color>-100` for the font color.

On **both** themes we'll use this styles:

- `enabled:shadow-sm enabled:shadow-black/50` for shadows.
- `disabled:opacity-50` for disabled elements.
- `enabled:hover:scale-105` for button hover styles.

> [!WARNING]
> If you set a `duration-<time>` that affect colors it's extremely important to set `t-<themename>:text-<color>-<variant>` if the element contains text or Icons, otherwise the color change animation of those will take more time than expected to change the color.  
> This is a bug or something on CSS. If an element with a `duration-<time>` has a text color and a child element has another `duration-<time>` but inheriths the text color of the parent element the child `duration-<time>` will be added to the parent one increasing the duration time of the animation. If you have 2 `duration-[2s]` the child text animation will take 4 seconds for example.  
> Changing the color of the child element(even if the color is the same one) will break this bug and work normally.  
> This may happen on `bg-<color>-<variant>` too, I didn't tested it.

_Any element not listed here can use any color from the same palette!_

### Create a new theme

To create a new theme you've to follow the next steps.

#### Add the new `@custom-variant` on the `app.css` like this:

```css
@custom-variant t-<themename> {
  &:where([data-theme="<themename>"] *) {
    @slot;
  }
}
```

> _Replace `<themename>` with the name of the theme. Only letters and lowercase._

#### If Tailwind CSS doesn't have the colors you need, add the color palette on the `@layout {}` of the `app.css` like this:

```css
@layout {
  ...
  --color-<themename>-50: #fdfdf5;
  --color-<themename>-100: #fbfaeb;
  --color-<themename>-200: #f0e9b0;
  --color-<themename>-300: #e9d97c;
  --color-<themename>-400: #e0c141;
  --color-<themename>-500: #cfa92d;
  --color-<themename>-600: #b68721;
  --color-<themename>-700: #926420;
  --color-<themename>-800: #805422;
  --color-<themename>-900: #64411f;
  --color-<themename>-950: #4b2b12;
  ...
}
```

> _Replace `<themename>` with the name of the theme. Only letters and lowercase._

#### Add the theme to the selector on the `lib/ui/settings/Theme.svelte` like this:

```ts
export const THEMES_DATA = [
  ...
  { key: "<themename>", localesKey: "themes.<Themename>", color: "bg-<color/themename>-<variant>" },
  ...
];
```

> _Replace `<themename>` with the name of the theme. Only letters and lowercase._  
> _Replace `<Themename>` with the name of the theme. Only letters and lowercase with the first letter uppercase._  
> _Replace `<color/themename>` and `<variant>` with the name and variant of the background color used on the first div of the `router/+layout.svelte` element of the app. That's the main background color. Usually `bg-<color/themename>-900` on dark themes and `bg-<color/themename>-100` on light themes._  
> _Translate the `localesKey` using `i18n Ally` or on the `i18n/en-EN.json`. Use another theme key as example._

#### Add the theme styles all over the app `.svelte` files as needed like this:

```ts
class={[
  ...
  "t-<themename>:text-<color/themename>-<variant> t-<themename>:bg-<color/themename>-<variant>",
  ...
]}
```

> _Replace `<themename>` with the name of the theme. Only letters and lowercase._  
> _Replace `<color/themename>` and `<variant>` with the name and variant of the color needed. Check the **Custom color palettes** and **How to use color palettes** sections above._

## z-index

This is an extremely important topic if we want everything to work as expected.  
Here's a table with the z-index layers used on the project:

| z-index  | layer       | elements                    |
| :------: | :---------- | :-------------------------- |
|   0-99   | Basic UI    | Dropdowns, context menus... |
| 100-499  | Floating UI | Popups, notifications...    |
| 500-1000 | Cover UI    | Loaders...                  |
