# AETHER — Digital Design Studio

A state-of-the-art digital atelier and interactive 3D configurator built with Next.js, React 19, Three.js / React Three Fiber, GSAP ScrollTrigger, and Tailwind CSS.

---

> [!NOTE]
> **Note:** The 60-frame render sequence is excluded to keep repository size light. Replace `/frames` with your own rendered sequence.
>
> *(A sample starter frame `public/sequence/0001.png` is included. To experience the full scrub animation, place your rendered frame sequence in `/public/sequence/` formatted as `0001.png`, `0002.png`, etc.)*

---

## ✨ Features

- **Interactive 3D Atelier & Configurator**: Powered by Three.js and `@react-three/fiber` for real-time 3D asset interaction and customization.
- **GSAP Canvas Sequence Animation**: Ultra-smooth scroll-driven canvas scrubbing powered by GSAP and ScrollTrigger.
- **Editorial Typography & Luxury Aesthetic**: Distinctive design featuring Hanken Grotesk, Rokkitt, Outfit, and custom typography (`Gendy.otf`).
- **State Management**: Reactive, lightweight client-side state handling with Zustand.
- **Responsive & Modern UI**: Built with Tailwind CSS and Lucide React icons, optimized for fluid interactions across all screen sizes.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Motion**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
aether/
├── app/
│   ├── (dashbord)/       # Dashboard workspace and layouts
│   ├── globals.css       # Global styles and design tokens
│   ├── layout.tsx        # Root layout, fonts, and metadata
│   └── page.tsx          # Main canvas sequence and interactive landing page
├── Components/
│   ├── navbar.tsx        # Navigation bar
│   └── footer.tsx        # Atelier footer
├── public/
│   ├── Gendy.otf         # Custom typography
│   └── sequence/         # Image sequence frames (e.g. 0001.png)
├── store/
│   └── useConfiguratorStore.ts # Zustand configurator state
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18.17+ or 20+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codekid-cyber1/Aether.git
   cd Aether
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Add your render sequence:
   Place your numbered frames (e.g. `0001.png` to `0120.png` or your custom sequence) into the `public/sequence/` directory.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm run dev` — Starts the Next.js local development server.
- `npm run build` — Builds the application for production.
- `npm run start` — Starts the production server.
- `npm run lint` — Runs ESLint checks.

---

## 📄 License

This project is private and proprietary. All rights reserved.
