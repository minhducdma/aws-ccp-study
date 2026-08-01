# @study/ui

The shared design system: tokens, components, animation and SVG art. The web app no longer writes its own buttons, cards or badges, and takes them all from here.

This package ships TypeScript source and has no build step of its own. Vite compiles it together with the app code, so a change shows up at once with no extra watcher.

## Folders

| Folder | What is inside |
|---|---|
| `src/tokens.css` | Design tokens in a Tailwind v4 `@theme` block, plus the `prefers-reduced-motion` rule and the `focus-ring` utility |
| `src/components/controls/` | Interactive controls such as `Button`, `Switch` and `Tabs` |
| `src/components/data-display/` | Components that present values and status, such as `Badge`, `Progress` and `StatTile` |
| `src/components/feedback/` | Loading, empty and confirmation states |
| `src/components/layout/` | Reusable containers and overlays such as `Card` and `Sheet` |
| `src/icons/` | Small interface icons that inherit `currentColor` |
| `src/illustrations/` | Larger, domain-specific SVG artwork |
| `src/motion/` | The animation provider and the shared variant presets |
| `src/utils/` | Framework-independent helpers shared by components |

## Setup in an app

Add two lines to the main stylesheet. Without the second one Tailwind does not scan this folder, and the classes inside the components are never generated.

```css
@import '@study/ui/tokens.css';
@source '../../../packages/ui/src';
```

Then wrap the app once in `MotionProvider`, as `apps/web/src/main.tsx` does.

## Tokens

Every variable in `@theme` also becomes a Tailwind utility. `--color-brand-500` gives `bg-brand-500`, `--ease-out-expo` gives `ease-out-expo`, and `--animate-shimmer` gives `animate-shimmer`.

Tailwind removes a variable that nobody uses. The illustrations paint with `var(--color-pass)` instead of a class, so when you add a token only for SVG, check that it is still in the CSS output.

## Animation

`MotionProvider` loads `LazyMotion` with the `domAnimation` feature set instead of all of Motion. It leaves out the layout projection engine and the drag engine, which this app does not use.

So inside a component you import `m`, not `motion`:

```tsx
import { m, fadeUp } from '@study/ui';

<m.div variants={fadeUp} initial="hidden" animate="visible" />;
```

The provider runs in `strict` mode, so `motion.div` throws an error at once instead of quietly pulling the bigger bundle back in.

`reducedMotion="user"` makes Motion drop every movement when the reader asks the operating system for less motion, and keep only the fade. CSS animation is handled apart from that, by the `@media (prefers-reduced-motion: reduce)` block in `tokens.css`.

The rule we follow: animation that loops for ever, and small feedback like hover or press, is written in CSS, because it costs no main thread. Animation that is arranged — items that appear one after another, a change of view, an overlay coming in and out — is written with Motion.

## Accessibility

This is the main reason we chose Radix. The parts that are easy to get wrong by hand are already correct:

- `Dialog` and `ConfirmDialog` keep focus inside the overlay, give it back on close, close on Escape, and join `aria-labelledby` and `aria-describedby` for you.
- `Sheet` is the phone menu. It keeps the focus inside the panel and turns off the page behind it.
- `Progress` sends `role="progressbar"` with `aria-valuenow`. The `label` prop is required, because a progress bar read out as a bare number means nothing.
- `Switch` sends `role="switch"` with `aria-checked`, which a normal button cannot do.

Outside Radix: every part you can click uses the shared `focus-ring` utility, and a `md` size `Button` is at least 44px tall, so a finger can hit it on a phone.

## No copy lives here

This package holds no sentence of its own. Every label a reader can see or hear is a required prop, including the ones that are easy to forget: `ConfirmDialog` takes `cancelLabel`, and each illustration takes a `label` for its `aria-label`. A default such as `cancelLabel = 'Cancel'` would look harmless and then quietly show English inside a Vietnamese dialog, so there are none.

The app translates them: it passes `t('common.cancel')` and friends from its catalogue. See [the web app README](../../apps/web/README.md#languages).

## Bundle cost

The web app grew from 283 KB to 354 KB gzip. Of those 71 KB, about 56 KB are the libraries: Motion 36 KB and five Radix primitives 20 KB. The rest is the components, the pictures and the CSS of this package.

Radix Tooltip used to live here, but it is gone. It pulls in `@floating-ui` and costs 18 KB gzip on its own, while the five Radix primitives that stayed cost 20 KB together, and all of that was for two short hints that fit on the screen anyway. A hint you can always see is also better on a phone, where nobody hovers. Add it back if you ever need a real popover, but look at the number first.

When you add a library, measure it on its own to learn the real price:

```bash
echo "export * as x from '<package>';" > /tmp/probe.js
npx esbuild /tmp/probe.js --bundle --minify --format=esm --external:react --external:react-dom | gzip -c | wc -c
```

## Add a component

Put the file in the `src/components/` group that owns its role, and export it from that group's `index.ts`. The root barrel already re-exports every group, so consumers continue to import from `@study/ui`.

Use `cva` for variants and `cn()` to join classes. `cn()` runs through `tailwind-merge`, so a class passed from outside beats the default class of the same group, which is why `className="px-8"` can override the `px-4` of a variant. Keep small interface symbols in `src/icons/`; reserve `src/illustrations/` for larger artwork.

## Related docs

| Doc | What it covers |
|---|---|
| [`../../README.md`](../../README.md) | The platform and the commands |
| [`../../courses/README.md`](../../courses/README.md) | How to write the content of a course |
| [`../content/README.md`](../content/README.md) | The markdown parser and its scripts |
| [`../../apps/web/README.md`](../../apps/web/README.md) | The web app |
