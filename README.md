# GitHub Finder 2.0

A modern, fast, and intuitive GitHub user search application built with the latest web technologies.

![GitHub Finder](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.0.5-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-teal.svg)

## ✨ Features

- 🔍 **Advanced Search** - Search GitHub users with real-time results
- 👤 **Detailed User Profiles** - View comprehensive user information and statistics
- 📚 **Repository Explorer** - Browse user repositories with detailed metrics
- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🔧 **TypeScript** - Full type safety and better developer experience
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🌐 **Error Handling** - Comprehensive error boundaries and user feedback
- 🎯 **Accessibility** - WCAG compliant with proper ARIA attributes

## 🚀 Tech Stack

### Frontend
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript for better development
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library

### Data & State Management
- **TanStack Query (React Query)** - Powerful data synchronization
- **React Hook Form** - Performant, flexible forms
- **Zustand** - Lightweight state management

### Developer Experience
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing framework

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Github-Finder-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, etc.)
│   ├── ErrorFallback.tsx
│   ├── SearchForm.tsx
│   └── UserCard.tsx
├── hooks/              # Custom React hooks
│   └── useGitHub.ts
├── lib/                # Utility libraries
│   └── github-api.ts
├── pages/              # Page components
│   ├── Home.tsx
│   ├── User.tsx
│   ├── About.tsx
│   └── NotFound.tsx
├── types/              # TypeScript type definitions
│   └── github.ts
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory (optional):
```env
# GitHub API configuration (optional)
VITE_GITHUB_API_URL=https://api.github.com
```

### API Rate Limiting
The application uses the GitHub REST API v3. Without authentication, you're limited to 60 requests per hour per IP address. For higher rate limits, consider implementing GitHub OAuth or Personal Access Tokens.

## 🎨 Design System

The application uses a modern design system built with Tailwind CSS:

- **Colors**: Primary blue palette with gray neutrals
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable component library with variants
- **Animations**: Smooth micro-interactions with Framer Motion

## 🚀 Performance Optimizations

- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Lazy loading and responsive images
- **Caching** - Intelligent query caching with React Query
- **Bundle Analysis** - Optimized bundle size with tree shaking
- **Modern Build** - ES modules and modern JavaScript features

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [React](https://reactjs.org/) team for the amazing library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📊 Version History

### 2.0.0 (Current)
- Complete rewrite with modern technologies
- TypeScript migration
- Vite build system
- TanStack Query for data fetching
- Modern UI with Tailwind CSS
- Improved performance and accessibility

### 1.0.0 (Legacy)
- Initial version with Create React App
- JavaScript with Context API
- Basic styling with custom CSS

---

Built with ❤️ using modern web technologies
