# GitHub Finder 2.0

A blazing-fast, modern web app to discover and explore GitHub users with advanced search, beautiful UI, and real-time results.

---

![GitHub Finder Banner](public/manifest.json)

## 🚀 Overview

**GitHub Finder 2.0** lets you search, filter, and explore GitHub users and their repositories with precision. Built with the latest web technologies, it offers a seamless, responsive, and accessible experience for developers, recruiters, and researchers alike.

---

## ✨ Features

- **Advanced Search**: Filter users by location, language, followers, repositories, account type, join date, and more
- **Real-Time Results**: Instant feedback and live search powered by React Query
- **Detailed Profiles**: View user stats, repositories, and social links
- **Modern UI/UX**: Responsive, accessible, and animated with Tailwind CSS & Framer Motion
- **Error Handling**: Graceful error boundaries and user feedback
- **Mobile Ready**: Fully responsive for all device sizes
- **Performance**: Lightning-fast with Vite and code-splitting

---

## 🛠️ Tech Stack

- **React 18** (UI)
- **TypeScript** (Type safety)
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **TanStack Query** (Data fetching/caching)
- **React Hook Form** (Forms)
- **Zustand** (State management)
- **React Router v6** (Routing)
- **Lucide React** (Icons)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Github-Finder-master
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

- Uses the public GitHub REST API (no authentication required for basic use)
- For higher rate limits, you can add a `.env.local` file:

```env
# Optional: Override GitHub API URL
VITE_GITHUB_API_URL=https://api.github.com
```

---

## 🧩 Project Structure

```
src/
├── components/    # UI components (forms, cards, layout)
├── hooks/         # Custom React hooks
├── lib/           # API and utility libraries
├── pages/         # Main app pages (Home, User, About, NotFound)
├── types/         # TypeScript types
├── App.tsx        # App root
├── main.tsx       # Entry point
└── index.css      # Global styles
```

---

## 🧪 Testing

- Run all tests: `npm run test`
- Lint code: `npm run lint`
- Format code: `npm run format`

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## 📄 License

MIT (see LICENSE)

---

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

> Built with ❤️ using modern web technologies
