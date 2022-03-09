# MML React

[![NPM](https://img.shields.io/npm/v/mml-react.svg)](https://www.npmjs.com/package/mml-react)
[![CI](https://github.com/GetStream/mml-react/workflows/CI/badge.svg)](https://github.com/GetStream/mml-react/actions)
[![Component Reference](https://img.shields.io/badge/docs-component%20reference-blue.svg)](https://getstream.github.io/mml-react/)

## Installation

```bash
// YARN
yarn add mml-react

// NPM
npm install mml-react --save

```

## Usage

```jsx
import { MML } from 'mml-react';

<MML source="<mml>Text</mml>" />;
```

## Overwriting Components

Making basic changes to the components is quite easy. You can use this option to add support for more custom tags.

Here's an example of how to overwrite the button tag's React component:

```jsx
const converters = {
  button: (tag, children) => {
    return <MyCustomButton {...tag.node.attributes} text={tag.getText()} key={tag.key} />;
  },
};

<MML converters={converters} source={source} />;
```

## Components

MML React components could be divided in four categories:

### Naked Components

> Very basic pieces of UI typically beyond a matter of styling

- [`Row`](/components/row)
- [`Col`](/components/col)

### Container Components

> Always host other components, can be themable

- [`Card`](/components/card)
- [`CardHeader`](/components/card-header)
- [`CardBody`](/components/card-body)

### Core Components

> Basic components that can be composed and themed

- [`Text`](/components/text): a block of text
- [`Button`](/components/button): a simple button
- [`Image`](/components/image): a simple responsive image
- [`Input`](/components/input): an input field
- [`MD`](/components/md): renders markdown
- [`Icon`](/components/icon): simply displays an icon from material design icons
- [`Loading`](/components/loading): signals a _loading_ temporary state with a circular spinner
- [`Error`](/components/error): display an _error_ message
- [`Success`](/components/success): display a _success_ message

### Structured Components

> More complex components composed of other components, certainly themable

- [`AddToCalendar`](/components/add-to-calendar): wrapped in a [`Card`](/components/card)
- [`Scheduler`](/components/scheduler): wrapped in a [`Card`](/components/card)
- [`ButtonList`](/components/button-list): a list of [`Button`](/components/button)
- [`Carousel`](/components/carousel): a series of [`CarouselItem`](/components/carousel-item) typically containing [`Image`](/components/image), [`Text`](/components/text) and [`Button`](/components/button)
- [`Number`](/components/number): input spinner composed of two [`Button`](/components/button) and a counter

## Styles customization

MML react ships with some good looking default styles but it can be completely customised to suit your visual identity.

### Themes

MML ships with a default theme plus four variations. These differentiate from one another only in terms of colours providing different look and feels that suits common scenarios like Social messaging, Customer support, etc. Each theme is either available in the compiled and autoprefixed `dist/styles/{name}.css` file and in the `src/styles/{name}.scss` source file. You should always include only one of this files, either `css` or `scss`, as they all includes the basic styling your MML components need.

If your projects include a `sass` compilation step you might tweak the theme variables and roll out your branded style. A theme is made of the following SCSS map:

```scss
$mml-theme: (
  primary-accent: #006cff,
  app-canvas: #fff,
  text-high-emphasis: #0e1621,
  text-mid-emphasis: #8a898e,
  text-low-emphasis: #b2b1b5,
  text-self: #fff,
  text-pressed: #fff,
  card-bg: #f2f2f2,
  card-alt-bg: #fff,
  card-self-bg: #41affc,
  stroke: #e5e5e6,
  stroke-low-emphasis: #f2f2f2,
  shadow: 0px 2px 5px rgba(0, 0, 0, 0.15),
);
```

> If you are running `sass` within your project you might customize most aspects of mml styling other than the them through scss variables. Refer [to the source](https://github.com/GetStream/mml-react/blob/master/src/styles/common/_variables.scss) to see what is available.

By setting `$mml-use-css-vars: true` you can make each of these variables available as CSS variable that you can tweak dynamically client side, they are all prefixed with `--mml`:

```css
:root {
  --mml-primary-accent: #006cff;
  --mml-app-canvas: #fff;
}
```

The theme related data is also made available to javascript through [`icss :export`](https://github.com/css-modules/icss#export) so that you can import them and reuse them to coherently style other parts of your chat outside of MML attachments (these are used in the MML docz app for instance).

```js
import { locals as mmlTheme } from 'mml-react/dist/styles/index.css';
// or
import { locals as mmlTheme } from 'mml-react/src/styles/index.scss';

// variables for js are transformed into camelCase, e.g.:
primaryAccent: '#006cff',
appCanvas: '#fff',
// ...etc.
```

### Differentiations between mine and other's messages

Some components need to slightly change according to their position in the chat. To achieve this MML scope its `CSS` alterations in a configurable selector through the `SCSS` variables `$mml-selector-wrapper-align-right` and `$mml-selector-wrapper-align-left` whose default values are respectively `.mml-align-right` and `.mml-align-left` class selectors. These selectors need to be placed on the container element that wraps your MML attachment. Internally to this library these SCSS tweaks are implemented through the `SCSS mixins mml-align-right and mml-align-left`, e.g.:

```scss
@include mml-component('text') {
  @include mml-align-left() {
    text-align: left;
  }

  @include mml-align-right() {
    text-align: right;
  }
}
```

### HTML structure

MML attachments always have two wrapping elements with the following two classes:

```scss
.mml-container
  .mml-wrap
```

The class `.mml-container` is responsible for some very basic styling that other components inherit, like `border-box` and `font-family`.
The class `.mml-wrap` instead takes care of contextual styling, like `border-radius` and `margin`s, that are most likely dependent on the differentiation between _me_ and _other_ messages [seen above](#differentiations-between-mine-and-others-messages).

Inside `mml-wrap` you could have as immediate children either the components as they are or the components automatically wrapped in a `<div class="mml-card">...</div>` when `<mml type="card">` is used (see the [`MML` docs](/mml#with-card-type)). Note that the `mml-card` class (and its `Card` React component) is also used internally in various components like [`Scheduler`](/components/scheduler) and [`AddToCalendar`](/components/add-to-calendar).

## Development & Contributions

## commands

- `yarn docs` to run hot reload docs, best way to work on the components
- `yarn build` to build and type check
- `yarn lint` to run linting
- `yarn format` to prettify things
- `yarn test` to run tests
- `npm version patch|minor|major` to make a release

## Understanding the Parser

1. SourceToXML parse MML string into XML node structure
2. XMLtoMMLTree converts the XML nodes to a tree of MML nodes (MMLTree)
3. MMLTree can be converted to React nodes using ToReact method

## Tree

The tree has:

- The name of the MML tag (passed to callback data as `mml_name`)
- MMLTag Children

## Naming

- Tree: The tree of MML tags
- Converters: Mapping from MMLTag to React Component

## How to create a new tag

Let's say you want to create a new tag called `color_picker`.
Here's how you would go about implementing it.

### Step 1 - React node

In `src/components` directory create a file called `ColorPicker.tsx` and do something along these lines:

```jsx
export const ColorPicker: FC<ColorPickerProps> = ({ name, value = '' }) => {
  const [state, setState] = useState(value);
  return (
    <input
      className="mml-input"
      name={name}
      value={state}
      placeholder={placeholder}
      onChange={(event) => setState(event.target.value)}
    />
  );
};
```

### Step 2 - Converters

Add an entry to `converters.tsx` file

```jsx
color_picker: (tag: MMLTag) => {
  return <ColorPicker {...tag.attributes} key={tag.key} name={tag.attributes.name} value={tag.attributes.value} />;
};
```

### Step 3 - Doc

Docs is the easiest way to test your component in isolation. Simply create a new file named `ColorPicker.mdx` similar to other mdx files in the component directory and document/test the component.

## Contributing

We welcome code changes that improve this library or fix a problem. Please make sure to follow all best practices and add tests if applicable before submitting a Pull Request on Github. We are pleased to merge your code into the official repository. Make sure to sign our [Contributor License Agreement (CLA)](https://docs.google.com/forms/d/e/1FAIpQLScFKsKkAJI7mhCr7K9rEIOpqIDThrWxuvxnwUq2XkHyG154vQ/viewform) first. See our license file for more details.

## We are hiring!

We've recently closed a [$38 million Series B funding round](https://techcrunch.com/2021/03/04/stream-raises-38m-as-its-chat-and-activity-feed-apis-power-communications-for-1b-users/) and we keep actively growing.
Our APIs are used by more than a billion end-users, and you'll have a chance to make a huge impact on the product within a team of the strongest engineers all over the world.

Check out our current openings and apply via [Stream's website](https://getstream.io/team/#jobs).
