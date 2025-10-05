# Vite React Tailwind Framer Motion Portfolio

![Project Preview](/public/images/screen/portfolio_alexandremachado.jpeg)

A modern and responsive portfolio website built using Vite, React, Tailwind CSS, and Framer Motion. This project showcases my latest work and provides a platform to demonstrate my skills in full-stack web development.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [3D Hero Canvas](#3d-hero-canvas)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.
- **Interactive Animations**: Utilizes Framer Motion for smooth and engaging animations.
- **Immersive 3D hero**: Lazy-loaded Three.js canvas adds depth while respecting reduced-motion preferences.
- **Dark Mode Ready**: Built atop a custom Tailwind design system that can easily support light and dark themes.
- **SEO Optimized**: Meta tags and structure optimized for search engines.
- **Custom Components**: Reusable and customizable React components.
- **Fast Loading**: Built with Vite for lightning-fast development and production builds.

## Technologies

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A fast build tool and development server.
- **Custom Tailwind Design System**: A handcrafted set of tokens and components built with Tailwind CSS.
- **[Framer Motion](https://www.framer.com/motion/)**: A powerful library for animations in React.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for styling.
- **[React Three Fiber](https://github.com/pmndrs/react-three-fiber)**: React renderer for Three.js powering the hero canvas.
- **[Three.js](https://threejs.org/)**: WebGL 3D engine used to render the hero scene.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/LXMachado/vite-react-daisy-ui-portfolio.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   The hero canvas relies on `@react-three/fiber` and `three`. These packages are installed automatically through the command above. If you are upgrading an existing clone, re-run `npm install` to pull in the new 3D stack.

3. Start the development server:

   ```sh
   npm run dev
   ```

## 3D Hero Canvas

- The 3D scene is lazy-loaded and falls back to a gradient background when `prefers-reduced-motion` is enabled or when loading fails.
- Lighting colors are tuned to match the Tailwind accent, highlight, and amberglow tokens defined in `tailwind.config.cjs`.
- The canvas is responsive and fills the hero section container. No additional configuration is required, but you can tweak the scene by editing `src/components/HeroCanvas.jsx`.

## Project Structure

The project structure follows a standard Vite + React organization with components located in `src/components`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build locally.

## Contributing

Contributions are welcome! Please open an issue to discuss what you would like to change or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/lxmachado/) or [email](mailto:contact@alexandremachado.dev).
