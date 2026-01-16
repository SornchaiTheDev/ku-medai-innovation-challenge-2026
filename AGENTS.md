# AGENTS.md - AI Coding Agent Guidelines for ku-medai-innovation-challenge

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

ku-medai-innovation-challenge is a TanStack Start application using React 19, TypeScript, Tailwind CSS v4, and Shadcn UI. The project uses TanStack Router for file-based routing and TanStack Query for data fetching.

## Build, Lint, and Test Commands

```bash
pnpm install && pnpm dev          # Install and start dev server
pnpm build                        # Build for production
pnpm preview                      # Preview production build
pnpm test                         # Run all tests
pnpm test -- <file>               # Run single test file
pnpm test -- --watch              # Watch mode
pnpm lint                         # Run linter
pnpm format && pnpm check         # Format and fix lint issues
npx tsc --noEmit                  # Type check
```

## Code Style Guidelines

### TypeScript

- Enable `strict: true` in tsconfig.json
- Always define explicit return types for functions
- Use `interface` for object shapes, `type` for unions/primitives
- Prefer `unknown` over `any`, avoid `any` completely
- Leverage Zod for runtime validation (see `src/env.ts`)

### Imports and Module Organization

```tsx
import { useState, useEffect } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { ChevronDown, ChevronRight, Home, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { env } from '@/env'
import Header from '@/components/Header'
```

### Naming Conventions

- **Components**: PascalCase (`Header`, `Sidebar`)
- **Variables/Functions**: camelCase (`isOpen`, `handleClick`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase (`UserResponse`, `ApiError`)
- **Files**: kebab-case (`api-request.tsx`, `utils.ts`)

### Formatting (Prettier)

Configured in `prettier.config.js`:

- Semicolons: **false**
- Single quotes: **true**
- Trailing commas: **all**

### Component Structure

```tsx
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({})

  const handleMenuToggle = () => setIsOpen(!isOpen)

  return (
    <header className="p-4">
      <button onClick={handleMenuToggle}>Menu</button>
    </header>
  )
}
```

### Tailwind CSS

- Use Tailwind v4 utility classes
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Keep classes organized: layout → spacing → typography → colors → effects

### Error Handling

- Use try/catch for async operations
- Throw errors with descriptive messages
- Use Zod for validation (see `src/env.ts` pattern)

### Shadcn UI Components

Install new components using the shadcn CLI:

```bash
pnpm dlx shadcn@latest add button
```

Component aliases in `components.json`:

- `@/components/ui` - shadcn components
- `@/components` - custom components
- `@/lib/utils` - utility functions (`cn`)
- `@/hooks` - custom hooks

### Environment Variables

Use T3Env pattern from `@t3-oss/env-core` with Zod validation (see `src/env.ts`).

### TanStack Router

- Routes are file-based in `src/routes/`
- Use `<Link>` from `@tanstack/react-router` for navigation
- Use `activeProps` for active link styling

### State Management

- Use `useState` for local component state
- Use TanStack Query (`useQuery`, `useMutation`) for server state

### Testing

- Use Vitest for unit and integration tests
- Place tests alongside source files (`*.test.tsx` or `*.spec.tsx`)

### Linting

ESLint configured with `@tanstack/eslint-config`. Key rules:

- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

Run `pnpm check` to auto-fix linting issues.

## Important Files

| File               | Purpose                         |
| ------------------ | ------------------------------- |
| `src/routes/`      | File-based routes               |
| `src/components/`  | React components                |
| `src/lib/utils.ts` | Utility functions (`cn`)        |
| `src/env.ts`       | Environment variable validation |
| `vite.config.ts`   | Vite configuration              |
| `components.json`  | Shadcn configuration            |

## File Editing Workflow

1. Read existing files before editing
2. Follow existing code patterns and conventions
3. Run `pnpm check` after making changes
4. Run `pnpm test` to verify no regressions
