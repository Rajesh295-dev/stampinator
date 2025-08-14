# Stampinator 🖋️

A modern **quote generator** built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
Designed to display inspirational quotes with a clean, minimal UI, fully responsive layout, and a reusable layout component that renders all pages between a shared header and footer.

---

## 🚀 Features

- **Next.js 14** + **TypeScript** for a fast and type-safe development experience.
- **Tailwind CSS** for rapid and consistent styling.
- **Global Layout**: Pages are automatically wrapped with a Header and Footer.
- **Dark Mode Friendly** — uses `bg-neutral-900` and `text-gray-200` for contrast.
- Fully responsive design for desktop and mobile.
- Clean `.gitignore` to prevent large files like `node_modules` from being pushed.

---

## 📦 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Version Control**: Git + GitHub
- **Deployment**: Vercel (recommended) or any Node.js hosting platform

---

## 📂 Project Structure

```plaintext
stampinator/
├── app/
│   ├── layout.tsx        # Global layout with Header & Footer
│   ├── page.tsx          # Home page
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
├── public/               # Static assets
├── styles/               # Global CSS
├── .gitignore
├── package.json
└── tsconfig.json
