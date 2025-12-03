
# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository, emphasizing senior development practices and solid engineering principles.

## Development Commands

### Core Commands
- `bun install` - Install dependencies (instead of npm/yarn/pnpm install)
- `bun run dev` - Start Next.js development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Testing
- `bun test` - Run tests (instead of jest/vitest)
- Test files use `bun:test` import pattern:
```ts
import { test, expect } from "bun:test";
test("example", () => {
  expect(1).toBe(1);
});
```

### Bun-Specific Operations
- `bun <file>` - Run JavaScript/TypeScript files directly
- `bun build <file>` - Bundle files (instead of webpack/esbuild)
- Bun automatically loads .env files - no dotenv needed
- Use `Bun.file()` for file operations instead of node:fs
- Use `Bun.$`command`` for shell commands instead of execa

## Senior Development Principles

### SOLID Principles Implementation

**Single Responsibility Principle (SRP)**
- Each component/service/hook has one reason to change
- UI components focus solely on presentation and interaction
- Custom hooks handle specific business logic (e.g., `useLoginForm` handles form state only)
- Schemas define validation rules exclusively
- Utilities contain pure functions with single purposes

**Open/Closed Principle (OCP)**
- Components use composition over inheritance
- Extensible through props and configuration, not modification
- Class Variance Authority (CVA) pattern for component variants
- Plugin architecture for form validation (Zod resolvers)
- Theme system through CSS variables for extensibility

**Liskov Substitution Principle (LSP)**
- All UI components follow consistent interfaces
- Form components are substitutable within the form system
- Custom hooks return predictable shapes and methods
- Higher-order components maintain base component contracts

**Interface Segregation Principle (ISP)**
- Split large interfaces into smaller, focused ones
- Form field components only require props they actually use
- Schema validation interfaces are domain-specific
- Component props are grouped by functionality

**Dependency Inversion Principle (DIP)**
- Components depend on abstractions (Radix UI primitives)
- Business logic abstracted through custom hooks
- Form validation through Zod schema contracts
- API calls abstracted behind service layers (when implemented)

### KISS, DRY, YAGNI Manifesto

**Keep It Simple, Stupid (KISS)**
- Favor readable code over clever optimizations
- Use standard React patterns and conventions
- Avoid premature abstraction - abstract when duplication appears 3+ times
- Choose simple solutions that solve the current problem
- Prefer built-in browser APIs over complex libraries when possible

**Don't Repeat Yourself (DRY)**
- Share common logic through custom hooks
- Reusable UI components in `src/components/ui/`
- Utility functions in `src/lib/utils.ts`
- Consistent validation patterns across features
- Shared TypeScript types and interfaces

**You Aren't Gonna Need It (YAGNI)**
- Build features based on current requirements
- Avoid speculative generality
- Don't implement features "just in case"
- Prefer incremental development over big design up front
- Remove unused code and dependencies

## Architecture Overview

### Project Structure
This is a Next.js application optimized for Bun with the following key architectural patterns:

**Feature-Based Organization:**
- Features are organized in `src/features/` directory
- Each feature contains its own hooks, components, and schemas
- Login feature demonstrates this pattern: `src/features/login/`
- Follows domain-driven design principles

**UI Component System:**
- Reusable UI components in `src/components/ui/`
- Built on Radix UI primitives for accessibility
- Tailwind CSS for styling with class-variant-authority patterns
- Custom form components wrapping react-hook-form
- Composition over inheritance patterns

**Authentication Flow:**
- Auth routes grouped in `src/app/(auth)/` layout
- Separate login and sign-up pages
- Form validation using Zod schemas with react-hook-form
- Protected route patterns for authenticated areas

### Technology Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives + custom components
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Development**: Bun runtime with TypeScript

### Key Architectural Patterns

**Form Management:**
- Custom hooks for form logic (`useLoginForm`)
- Zod schemas for validation with type safety
- Reusable form components in `src/components/ui/form.tsx`
- Graceful error handling with user-friendly messages

**Component Design:**
- Server components by default (Next.js App Router)
- Client components marked with `"use client"` directive
- UI components are server-compatible but provide client functionality when needed
- Atomic design principles with composable components

**Path Aliases:**
- `@/*` maps to `src/*` for cleaner imports
- Configured in `tsconfig.json` paths
- Enables absolute imports throughout the codebase

### Configuration Files
- `next.config.ts` - Next.js configuration (minimal setup)
- `postcss.config.mjs` - Tailwind CSS processing
- `eslint.config.mjs` - ESLint with Next.js TypeScript rules
- `tsconfig.json` - TypeScript with Next.js optimizations and path aliases

## Development Guidelines

### Decision-Making Frameworks

**When to Create New Components**
Create a new component when:
1. UI appears in 2+ places with slight variations
2. Component has complex state or logic
3. Component represents a distinct UI concept
4. Component needs its own lifecycle or event handlers
5. Testing would benefit from isolation

Keep inline when:
1. Used only once and is simple
2. Purely presentational with no logic
3. Would add unnecessary abstraction
4. Implementation is obvious and self-documenting

**When to Use Client Components**
Mark components with `"use client"` when:
- Using React hooks (useState, useEffect, useCallback)
- Handling browser events (onClick, onChange, onSubmit)
- Interacting with browser APIs (localStorage, window, document)
- Implementing form controls with state management
- Using third-party libraries that require browser environment

Keep as server components when:
- Purely presentational content
- Data fetching that can be done at build/request time
- Static content that doesn't need interactivity
- Components that benefit from server-side rendering

**State Management Decisions**
Use React Hook Form when:
- Building forms with validation
- Need complex form state management
- Handling nested form structures
- Require field-level validation and error handling

Use useState when:
- Simple component state
- UI-only state that doesn't affect data
- Temporary state that doesn't need persistence
- Component-specific state not shared elsewhere

### TypeScript Best Practices

**Type Safety First**
```tsx
// ✅ Good: Type inference with runtime validation
const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

// ✅ Good: Generic, reusable components
interface FieldProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  required?: boolean;
}
```

**Error Handling Standards**
- Always provide user-friendly error messages
- Log technical errors for debugging
- Use proper TypeScript error types
- Implement graceful degradation

### Form Development Patterns
Follow the established patterns:
1. Define Zod schemas in feature directories with clear validation rules
2. Create custom hooks for form logic with proper error handling
3. Use reusable UI form components with consistent styling
4. Implement proper TypeScript typing throughout
5. Add comprehensive form validation with user-friendly messages

### Styling Approach
- Use Tailwind CSS classes directly with semantic naming
- Leverage the `cn()` utility from `src/lib/utils.ts` for conditional classes
- Follow component styling patterns established in UI components
- Use CSS variables for theming when needed
- Implement responsive design from mobile-first approach

### API Integration
- Use Axios for HTTP requests (configured in dependencies)
- Consider Bun's built-in fetch API for simpler use cases
- Follow feature-based organization for API-related code
- Implement proper error handling and loading states
- Use TypeScript interfaces for API responses

## Testing Strategy

### Testing Pyramid Implementation
- **Unit Tests (70%)**: Test utility functions, custom hooks, and individual components
- **Integration Tests (20%)**: Test form submission workflows and component interactions
- **E2E Tests (10%)**: Test critical user journeys and authentication flows

### Testing Standards
```tsx
// Component Testing Example
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '@/features/login/components/login-form';

describe('LoginForm', () => {
  it('renders form fields correctly', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
  });
});

// Hook Testing Example
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '@/features/login/hooks/use-login-form';

describe('useLoginForm', () => {
  it('initializes form with correct default values', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.isLoading).toBe(false);
  });
});
```

## Performance Optimization

### React Performance Patterns
```tsx
// ✅ Good: Memoize expensive components
const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <ComplexVisualization data={data} />;
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});

// ✅ Good: Memoize event handlers passed to optimized components
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);
```

### Code Splitting Strategy
- Route-based splitting (automatic with Next.js App Router)
- Component-based splitting for heavy components:
```tsx
const HeavyChart = lazy(() => import('@/components/charts/heavy-chart'));

<Suspense fallback={<div>Loading chart...</div>}>
  <HeavyChart data={chartData} />
</Suspense>
```

## Security Considerations

### Input Validation and Sanitization
Always validate on both client and server:
```tsx
// ✅ Good: Client validation with Zod
const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});
```

### Authentication and Authorization
Implement proper authentication patterns with protected routes and role-based access control.

## Code Review Checklist

### Before Submitting Code
- [ ] Code implements requirements correctly
- [ ] Edge cases are handled appropriately
- [ ] Error handling is comprehensive and user-friendly
- [ ] Form validation provides clear feedback
- [ ] Follows established patterns and conventions
- [ ] No hardcoded values (use constants or configuration)
- [ ] Proper TypeScript types are used throughout
- [ ] Code is self-documenting with clear naming

### Performance and Security
- [ ] No unnecessary re-renders
- [ ] Large components are properly memoized
- [ ] Input validation is implemented
- [ ] No sensitive data in client-side code
- [ ] Proper authentication/authorization checks

## Troubleshooting Guide

### Common Issues and Solutions

**Form Validation Not Working**
- Check Zod schema configuration
- Verify resolver is properly attached to useForm
- Ensure form field names match schema keys
- Check that validation mode is appropriate

**Component Re-rendering Excessively**
- Verify memo usage is correct
- Check for unnecessary object/array recreations
- Review useCallback and useMemo dependencies
- Ensure props are stable when possible

**TypeScript Errors**
- Verify path aliases in tsconfig.json
- Check that type imports are correct
- Ensure Zod types are properly inferred
- Validate that component props match interfaces

## Runtime Notes

While this project uses Bun for development and tooling, it maintains Next.js compatibility and can run on standard Node.js environments for deployment. The architecture prioritizes developer experience with Bun while preserving deployment flexibility.

This codebase emphasizes clean, maintainable, and scalable software development practices following SOLID, KISS, DRY, and YAGNI principles. When working with this codebase, prioritize code readability and maintainability over clever optimizations, follow established patterns rather than introducing new approaches, and write tests as you write features, not as an afterthought.
