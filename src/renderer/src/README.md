# CONTRIBUTION GUIDE

On this page you'll see a detailed guide explaining the basics to contribute to Rustory.  
Some things we'll see here are: how to use colors, how to use some html elements, how to almost evey important thing.

## Colors

One of the most important things on a project are colors.  
Most of the Rustory themes use Tailwind CSS default colors but some others, like rust theme, need a custom colro palette.

### Custom color palettes

The custom color palette can be defined on the `app.css` file on this folder. Check the rust palette and use it as a base.  
Color palettes must be formed by 19 variants: **50**, **100**, **150**, **200**, **250**, **300**, **350**, **400**, **450**, **500**, **550**, **600**, **650**, **700**, **750**, **800**, **850**, **900** and **950**.

> [!WARNING]
> If you set a `duration-<time>` that affect colors it's extremely important to set `t-<themename>:text-<color>-<variant>` if the element contains text or Icons, otherwise the color change animation of those will take more time than expected to change the color.  
> This is a bug or something on CSS. If an element with a `duration-<time>` has a text color and a child element has another `duration-<time>` but inheriths the text color of the parent element the child `duration-<time>` will be added to the parent one increasing the duration time of the animation. If you have 2 `duration-[2s]` the child text animation will take 4 seconds for example.  
> Changing the color of the child element(even if the color is the same one) will break this bug and work normally.  
> This may happen on `bg-<color>-<variant>` too, I didn't tested it.

### Create a new theme

To create a new theme you've to follow the next steps.

#### Add the new `@custom-variant` on the `app.css` like this:

```css
@custom-variant t-<themename> {
  &:where([data-theme='<themename>'] *) {
    @slot;
  }
}
```

> Replace `<themename>` with the name of the theme. Only letters and lowercase.

#### If Tailwind CSS DOESN'T have the colors you need, add the color palette on the `@layout {}` of the `app.css` like this:

```css
@layout {
  ...
  --color-<themename>-50: #fdfdf5;
  --color-<themename>-100: #faf8e2;
  --color-<themename>-150: #f6f2ce;
  --color-<themename>-200: #f0e9b0;
  --color-<themename>-250: #ede196;
  --color-<themename>-300: #e9d97c;
  --color-<themename>-350: #e5cd5f;
  --color-<themename>-400: #e0c141;
  --color-<themename>-450: #d8b537;
  --color-<themename>-500: #cfa92d;
  --color-<themename>-550: #c39827;
  --color-<themename>-600: #b68721;
  --color-<themename>-650: #a47621;
  --color-<themename>-700: #926420;
  --color-<themename>-750: #895c21;
  --color-<themename>-800: #805422;
  --color-<themename>-850: #724b21;
  --color-<themename>-900: #64411f;
  --color-<themename>-950: #4b2b12;
  ...
}
```

> Replace `<themename>` with the name of the theme. Only letters and lowercase.

#### If Tailwind CSS HAVE the colors you need, add the missing colors on the `app.css` like this:

```css
@layout {
  ...
  --color-<color>-150: #ececee;
  --color-<color>-250: #dcdce0;
  --color-<color>-350: #bbbbc1;
  --color-<color>-450: #898992;
  --color-<color>-550: #62626b;
  --color-<color>-650: #494951;
  --color-<color>-750: #333338;
  --color-<color>-850: #202023;
  ...
}
```

> Replace `<color>` with the name of the theme. Only letters and lowercase.

#### Add the theme to the selector on the `lib/classes/RustoryConfig.svelte.ts` like this:

```ts
export const THEMES_DATA = [
  ...
  { key: "<themename>", name: m.themes__dark(), color: "bg-<color/themename>-<variant>" },,
  ...
];
```

> Replace `<themename>` with the name of the theme. Only letters and lowercase. Check another theme as example.  
> Replace `<color/themename>` and `<variant>` with the name and variant of the main background color.  
> Add the `name` on the `messages/en.json`. Use another theme key as example.

#### Add the theme styles all over the app `.svelte` files as needed like this:

```ts
class={[
  ...
  "t-<themename>:text-<color/themename>-<variant> t-<themename>:bg-<color/themename>-<variant> t-<themename>:border-<color/themename>-<variant> ...",
  ...
]}
```

> Replace `<themename>` with the name of the theme. Only letters and lowercase.  
> Replace `<color/themename>` and `<variant>` with the name and variant of the color needed. Check the **Custom color palettes** and **How to use color palettes** sections above.

## z-index

This is an extremely important topic if we want everything to work as expected. Also remember the stacking context! You can create new stacking contexts with position, backdrop... and this will create a new context where z-index will be different.  
Here's a table with the z-index layers used on the project:

| z-index  | layer       | elements                    |
| :------: | :---------- | :-------------------------- |
|  0-199   | Basic UI    | Dialogs, Alerts, Command... |
| 200-499  | Components  | Selects, Context Menus...   |
| 500-900  | Floating UI | Toasts, Tooltips...         |
| 900-1000 | Cover UI    | Loaders...                  |

> [!NOTE]
> When I'm writing this we have:  
> Z-1000: Loader  
> Z-600: Tooltip and Info  
> Z-500: Toasts  
> Z-300: Combobox and Select  
> Z-200: ContextMenu, DropdownMenu  
> Z-100: Dialog, Alert, Sheet and Command

## Paddings and Gaps

Most of the layout components we have designed count with 2 properties: gap and padding. This ones come in 6 variants:

- **xl**: `gap-8` & `p-8`
- **lg**: `gap-6` & `p-6`
- **base**: `gap-4` & `p-4`
- **sm**: `gap-2` & `p-2`
- **xs**: `gap-1` & `p-1`
- **none**: `gap-0` & `p-0`

## Size

Most of the components alco have 2 or 3 variants for the width and height:

- **fit**: `w-fit` & `h-fit`
- **full**: `w-full` & `h-full`
- **flex-1**: `flex-1`

## Rounded / Border radius

Most of the components also have a rounded property to set the border radius:

- **none**: `rounded-none`
- **xs**: `rounded-xs`
- **sm**: `rounded-sm`
- **base**: `rounded-md`
- **lg**: `rounded-lg`
- **xl**: `rounded-xl`

## Variants

Most of the components alco have variantes like this ones:

- **transparent**: Background and border/ring show on hover and focus only.
- **neutral**: Colors of the theme.
- **info**: Blue variant.
- **success**: Green variant.
- **warning**: Yellow variant.
- **danger**: Red variant.

## Icons

Icons MUST be created as Svelte components inside the `./src/renderer/src/lib/ui/components/Icons` folder following the folder structure.
