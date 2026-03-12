# AwesomeBuy.com

An e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS featuring user authentication, product browsing, shopping cart functionality, and 10-minute same-day delivery.

### Live Preview

Check out the live demo here: [AwesomeBuy](https://codeyogi-lecture-85-86.netlify.app/)

### Implementation Notes

- **TypeScript Migration**: The entire codebase has been migrated to TypeScript for better type safety and developer experience.
- **Modern Approach**: Higher-Order Components (HOCs) are avoided in favor of Custom Hooks, which are considered a more modern and overall better way of React programming.
- **Robust Error Handling**: Comprehensive error handling for API calls and user interactions.
- **Optimized Performance**: Improved state management and reduced unnecessary re-renders.
- **Class Components**: Used class component for the product details page as assigned in the lecture 42 of CodeYogi. Wrapped it in a Functional Component passing hooks as props to it.
- **Storybook**: Integrated storybook for component development.

## Features

### Core Functionality

- **Product Catalog**: Browse products with search, filtering, and pagination
- **Product Details**: View detailed information about each product with star ratings
- **Shopping Cart**: Add, remove, and manage items in your cart
- **User Authentication**: Complete auth flow with signup, login, and password recovery
- **Protected Routes**: Secure dashboard accessible only to authenticated users
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### User Experience

- **Real-time Cart Updates**: Instant cart total calculations
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: User-friendly error messages and alerts
- **Empty States**: Clear messaging for empty cart
- **Mobile Menu**: Optimized navigation for mobile devices

## Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5+)
- **Frontend Framework**: [React](https://reactjs.org/) (v19+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: React Context API (`UserContext`, `CartContext`, `AlertContext`)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Form Handling**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
CodeYogi-Lecture-86/
├── public/                  # Static assets
│   ├── images/
│   └── _redirects           # Netlify redirects
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Alert.tsx
│   │   ├── AuthRoute.tsx
│   │   ├── CartDetails.tsx
│   │   ├── CartList.tsx
│   │   ├── CartRow.tsx
│   │   ├── CartTotals.tsx
│   │   ├── EmptyCart.tsx
│   │   ├── Filter.tsx
│   │   ├── Footer.tsx
│   │   ├── Input.tsx
│   │   ├── Loading.tsx
│   │   ├── LoadingProduct.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   ├── NoMatch.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── Providers.tsx
│   │   ├── StarRating.tsx
│   │   ├── UserRoute.tsx
│   │   └── ...
│   ├── context/             # React Context providers
│   │   ├── AlertContext.ts
│   │   ├── AlertProvider.tsx
│   │   ├── CartContext.ts
│   │   ├── CartProvider.tsx
│   │   ├── UserContext.ts
│   │   └── UserProvider.tsx
│   ├── pages/               # Page components
│   │   ├── CartPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ProductsPage.tsx
│   │   └── SignUpPage.tsx
│   ├── api.ts               # API client configuration
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles
│   ├── main.tsx             # App entry point
│   └── types.ts             # Type definitions
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.js           # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v25 or higher)
- bun.js (or npm/yarn/pnpm)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lakshgupta8/CodeYogi-Lecture-86
   cd "CodeYogi-Lecture-86"
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `dev` - Start development server with hot reload
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Run ESLint
- `storybook` - Run storybook
- `storybook:build` - Build storybook

## Authentication Flow

The application implements a complete authentication system:

1. **Sign Up**: New users can create an account with email and password
2. **Login**: Existing users can sign in with their credentials
3. **Token Management**: JWT tokens stored in localStorage for session persistence
4. **Protected Routes**: Dashboard accessible only to authenticated users
5. **Auto Login**: Users automatically logged in if valid token exists
6. **Logout**: Clear user session and redirect to home

## Shopping Cart

The cart system uses React Context API for state management:

- Add/remove products from cart
- Adjust item quantities
- Persistent cart state across navigation
- Real-time total calculation
- Empty cart state handling

## Responsive Design

- Mobile-first approach with Tailwind CSS
- Dedicated mobile menu component
- Optimized layouts for all screen sizes
- Touch-friendly UI elements

## API Integration

The application connects to a backend API for:

- Product data fetching
- User authentication
- Cart operations
- Order management

## UI Components

### Reusable Components

- **ProductCard**: Display product information in grid
- **Filter**: Search and filter products
- **Pagination**: Navigate through product pages
- **StarRating**: Visual product ratings
- **Loading**: Loading state indicators
- **Input**: Styled form input component
- **UserRoute**: Authentication wrapper for protected routes
- **AuthRoute**: Authentication wrapper for protected routes
- **NoMatch**: 404 page
- **NotFound**: 404 page
- **Providers**: Context providers
- **Footer**: Footer component
- **Navbar**: Navbar component
- **MobileMenu**: Mobile menu component
- **CartDetails**: Cart details component
- **CartList**: Cart list component
- **CartRow**: Cart row component
- **CartTotals**: Cart totals component
- **EmptyCart**: Empty cart component
- **Filter**: Filter component
- **LoadingProduct**: Loading product component
- **ProductGrid**: Product grid component
- **Alert**: Alert component

## Configuration

### Vite Configuration

Located in `vite.config.js` - configured for React with optimal build settings.

### Tailwind CSS

Using Tailwind CSS v4 with Vite plugin for styling.

### ESLint

Code quality maintained with ESLint and recommended React rules.

## Dependencies

### Production

- React & React DOM for UI
- React Router for navigation
- Axios for API calls
- Formik & Yup for forms and validation
- Tailwind CSS for styling

### Development

- Vite for fast development
- ESLint for code quality
- Prettier for code formatting
- Storybook for component development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the CodeYogi Lecture series.

## Developer

Created as part of CodeYogi Non-Assignment Lecture 86.

---

**Note**: This is a learning project built as part of a coding course. The backend API is hosted on AWS Lambda and may have usage limitations.
