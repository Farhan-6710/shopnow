# ShopNow - AGENTS.md

This file provides guidance for agentic coding agents working on the ShopNow e-commerce platform.

## Project Overview

ShopNow is a full-stack e-commerce shoe shopping platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The project uses Redux Toolkit for state management, Supabase for backend services, and follows modern React patterns with App Router.

## Development Commands

```bash
# Development
bun dev          # Start development server (preferred)
npm run dev     # Alternative with npm

# Production
npm run build   # Build for production
npm run start   # Start production server

# Code Quality
npm run lint    # Run ESLint (check before committing)

# Database
bun run seed    # Seed products database
```

**Important**: No testing framework is currently configured. Add test setup before implementing tests.

## Code Style Guidelines

### Import Organization
Order imports consistently:
1. External libraries (React, Next.js)
2. Third-party UI components (@/components/ui/*)
3. Internal components (@/components/*)
4. Utility functions (@/lib/utils, @/utils/*)
5. Types/interfaces (@/types/*)
6. Custom hooks (@/hooks/*)

```typescript
import React from "react"
import { Button } from "@/components/ui/button"
import ProductActions from "@/components/shared/ProductActions"
import { cn } from "@/lib/utils"
import { Product } from "@/types/product"
import { useCartManagement } from "@/hooks/useCartManagement"
```

### Component Patterns
- Use functional components with TypeScript interfaces
- Add `"use client"` directive for client-side components
- Default exports for components, named exports for utilities
- Descriptive prop names with clear typing

```typescript
"use client"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  className?: string
}

export default function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  // Component implementation
}
```

### Naming Conventions
- **Components**: PascalCase (`ProductActions`, `CartSection`)
- **Files**: kebab-case for components (`product-actions.tsx`), camelCase for hooks (`useCartManagement.ts`)
- **Variables/Functions**: camelCase (`handleAddToCart`, `filteredProducts`)
- **Constants**: UPPER_SNAKE_CASE (`HOME_ROUTE`, `PRODUCTS_DATA`)
- **Types/Interfaces**: PascalCase (`Product`, `CartState`)

### TypeScript Guidelines
- Strict mode enabled
- Define interfaces for all data structures
- Use optional properties (`?`) where appropriate
- Leverage union types for status enums
- Use generic types where appropriate

### Redux Patterns
- Use `createSlice` for Redux Toolkit slices
- Implement optimistic updates with rollback capability
- Use `createSelector` for memoized selectors
- Follow Redux Saga patterns for side effects
- Descriptive action creator names

### State Management
- **Local state**: useState for component-specific state
- **Global state**: Redux Toolkit for application state
- **Server state**: TanStack React Query for API data
- **Form state**: Use controlled components with validation

### Styling Guidelines
- Use Tailwind CSS v4 utility classes
- Leverage shadcn/ui components (New York style)
- Use `cn()` utility for conditional classes
- CSS variables for theming
- Dark mode support via class strategy

```typescript
import { cn } from "@/lib/utils"

const className = cn(
  "flex items-center justify-center p-4",
  isActive && "bg-blue-500",
  className
)
```

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks  
├── lib/           # Utilities and helpers
├── providers/     # React context providers
├── redux/         # Redux store and slices
├── services/      # API service layer
├── types/         # TypeScript type definitions
└── utils/         # Additional utilities
```

## Key Patterns and Best Practices

### Data Fetching
- Use TanStack React Query for server state
- Implement proper error handling and loading states
- Leverage Next.js built-in optimizations where appropriate

### Error Handling
- Use error boundaries for React errors
- Implement proper error states in API calls
- Show user-friendly error messages
- Log errors appropriately without exposing sensitive data

### Performance
- Use React.memo for expensive components
- Implement list virtualization for long lists
- Optimize bundle size with dynamic imports
- Use Next.js Image component for optimized images

### Authentication
- Use Supabase Auth for authentication
- Implement modal-based auth (no page redirects)
- Handle auth state changes gracefully
- Protect API routes with proper middleware

### Form Handling
- Use controlled components with proper validation
- Implement optimistic updates where appropriate
- Show loading states during form submission
- Handle form errors gracefully

## Environment Setup

- Use Bun as primary runtime (bun.lock present)
- Environment variables in `.env.local`
- Supabase for database and authentication
- OpenRouter API for AI assistant functionality

## Before Committing

1. Run `npm run lint` to check code quality
2. Ensure TypeScript compilation succeeds
3. Test functionality manually (no automated tests yet)
4. Follow all naming and style conventions
5. Add proper error handling for new features

## Path Aliases

```typescript
"@/components": "./src/components"
"@/lib": "./src/lib"
"@/utils": "./src/utils"
"@/ui": "./src/components/ui"
"@/hooks": "./src/hooks"
```

## Testing

Currently no testing framework is configured. When adding tests:
1. Choose appropriate framework (Jest/Vitest for unit, Cypress/Playwright for E2E)
2. Configure test scripts in package.json
3. Follow existing patterns for test organization
4. Test critical user paths and business logic