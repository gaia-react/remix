# Welcome to the GAIA Framework!

<img src="./app/assets/images/gaia-logo.svg" height="100" alt="GAIA"/>

GAIA is a **fully comprehensive** React framework for building modern web applications.

It comes with **EVERYTHING** you need, fully configured and ready to go.

The DX (Developer Experience) is top-notch.

- Automated and robust code quality tools are all set up, keeping your code clean and tech debt to a minimum.
- Best practices are baked into the source code examples for you to follow.
- Unit, integration, visual regression, and end-to-end tests are all included.
- Code Generation scripts speed up development and simplify workflow.
- Utilities, hooks, authentication, internationalization, components, services, styles, test, stories, and other code examples are all included to help you get started quickly.
- While GAIA comes with recommended packages, conventions, and settings, you're free to change them to suit your needs.

Read the [GAIA Documentation](https://github.io/gaia-framework) for detailed information.

### Is this associated with the GAIA Flash Framework?

**Yes!**

The GAIA Flash Framework revolutionized Flash website development and became the most popular Flash framework in the world (second only to Adobe Flex, which was focused on enterprise applications). It was used to build over 100,000 Flash sites and relied upon by every major digital agency worldwide.

This is its spiritual successor. The GAIA Framework has been reborn as a React framework. Like its predecessor, it's designed to be the most comprehensive and easy-to-use React framework available.

## Installation

All you need to do is install and get to work.

```sh
npx create-remix@latest --template gaia-react/remix
```

### Install packages

```sh
npm install
npx playwright install
```

## Development

Make sure you have [Node.js](https://nodejs.org/en/) 20.17.0 LTS installed.

Duplicate the `.env.example` file and name it `.env`

### Storybook

```sh
npm run storybook
```

### Remix

```sh
npm run dev
```

### Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) configured. You're free to change it if you like.

See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

### Icons

[FontAwesome](https://fontawesome.com/) is configured. You're free to change it if you like.

### i18n

[Remix-i18next](https://github.com/sergiodxa/remix-i18next) is configured with examples.

Storybook is already configured with react-i18n support.

## Testing

GAIA comes with a full testing suite already configured.

### Unit and Integration

- [vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

```sh
  npm t
  // or
  npm run test
```

### Visual Regression

[Chromatic](https://chromatic.com)

You'll need to set your `CHROMATIC_PROJECT_TOKEN` env variable on your CI.

### E2E

[PlayWright](https://playwright.dev/docs/intro)

```sh
npx playwright test
```

Interactive mode:

```sh
npx playwright test --ui
```

## Deployment

GAIA comes with the default Remix deployment configuration. You can change this to whatever deployment process you prefer.

Here's the basic Remix deployment process:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

You'll need to pick a host to deploy it to. Jacob Paris wrote a [great article](https://www.jacobparis.com/content/where-to-host-remix) on where to host your Remix app.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
