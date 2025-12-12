# Personalized Content Dashboard

A modern, full-stack dashboard application built with Next.js, React, Redux Toolkit, and TypeScript that provides users with a personalized feed of news, recommendations, and social content.

## Features

- **Personalized Content Feed**: Dynamic content from multiple sources (news, movies, social posts)
- **User Preferences**: Customizable categories with persistent storage
- **Advanced Search**: Debounced search functionality across all content types
- **Drag & Drop**: Reorder favorite items with native HTML5 drag-and-drop
- **Dark Mode**: Full dark mode support with smooth transitions
- **Infinite Scroll**: Efficient content loading with pagination
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Animations**: Smooth transitions using Framer Motion
- **State Management**: Redux Toolkit for predictable state handling
- **Testing**: Comprehensive unit, integration, and E2E test coverage

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Testing**: Jest, React Testing Library, Playwright
- **Code Quality**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd personalized-content-dashboard
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (routes)/          # Page routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── content/           # Content display components
│   ├── animations/        # Animation wrappers
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configuration
│   └── store/             # Redux store setup
│       └── slices/        # Redux slices
├── hooks/                 # Custom React hooks
├── __tests__/             # Unit and integration tests
├── e2e/                   # End-to-end tests
└── public/                # Static assets
\`\`\`

## Testing

### Unit & Integration Tests

\`\`\`bash
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:ci

# Generate coverage report
npm run test:coverage
\`\`\`

### E2E Tests

\`\`\`bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
\`\`\`

## Key Features Implementation

### 1. Content Feed
- Fetches from multiple APIs (news, recommendations, social)
- Infinite scroll with intersection observer
- Category-based filtering
- Loading states with skeleton screens

### 2. Search
- Debounced search (500ms)
- Real-time results across all content types
- Category filtering on results page

### 3. Favorites
- LocalStorage persistence
- Drag-and-drop reordering
- Star/unstar animation

### 4. User Preferences
- Category selection
- Dark mode toggle
- Persistent across sessions

### 5. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Collapsible sidebar on mobile

## Performance Optimizations

- Debounced search to reduce API calls
- Infinite scroll for efficient content loading
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Memoized Redux selectors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [v0](https://v0.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
