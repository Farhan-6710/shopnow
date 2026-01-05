# 👟 ShopNow – Full-Stack Shoe Hunt Platform

ShopNow is a **high-performance, frontend-focused full-stack shoe discovery and listing application** designed for real-world shopping flows. Built with a strong emphasis on usability, accessibility, and speed, it leverages **Next.js** for the frontend and API routes, with **Supabase** handling authentication and database management.

The application is engineered to handle large product datasets efficiently using **list virtualization** and includes a **context-aware AI assistant** to enhance product discovery and user decision-making.

---

## 🚀 Key Features

### 🛍️ Core Shopping Experience

- **Search-Driven Navigation**  
  A global search bar available in the header on every page. Searching routes users directly to **dynamic product detail pages**.

- **Advanced Filtering**  
  Sidebar-based filtering by brand, size, color, and price range, implemented using **custom React hooks** for clean and reusable state management.

- **Dynamic Product Pages**  
  SEO-friendly, server-rendered product detail pages using dynamic routing.

- **Cart & Wishlist**  
  Dedicated routes for managing cart and wishlist items with instant UI feedback.

---

### 🧠 Smart & Interactive

- **Context-Aware AI Assistant**  
  Implemented using a **shadcn Sheet (drawer)**, allowing users to ask product-related questions and receive insights without leaving the current page.

- **Optimistic UI Updates**  
  Actions like *Add to Cart* and *Add to Wishlist* update the UI instantly using **Redux Toolkit**, while **Redux Saga** handles API calls and side effects in the background.

- **User Feedback System**  
  Non-intrusive **toast notifications** provide clear success and failure feedback for user actions.

---

### 🔐 Authentication & Data Sync

- **Modal-Based Authentication**  
  Login and signup flows are handled via accessible modals, preserving user context without page redirects.

- **Supabase Integration**  
  Secure authentication and user management using Supabase Auth.

- **Automatic Data Synchronization**  
  Guest cart and wishlist data are automatically merged with persistent backend data when a user logs in.

---

### ⚡ Performance & Engineering

- **List Virtualization**  
  Ensures smooth 60fps scrolling even with large product lists.

- **Loading Skeletons**  
  Improve perceived performance during data fetching.

- **Next.js API Routes**  
  Serve as the backend layer for business logic and database communication.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

### State Management & Async Logic
- **Global State:** Redux Toolkit
- **Side Effects:** Redux Saga (optimistic updates, async flows, error handling)

### Backend & Database
- **API Layer:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

---

## 🏗️ Architecture Highlights

### Optimistic UI with Redux Saga

1. User triggers an action (e.g., *Add to Cart*).
2. Redux updates the UI immediately.
3. A Redux Saga handles the API request in the background.
4. On success, the state is confirmed; on failure, changes are rolled back and an error toast is shown.

### Authentication Flow

Authentication is handled via modals instead of full-page redirects, allowing users to sign in or sign up without losing their current browsing context.

---

## 📂 Project Structure

```
├── app/               # Next.js App Router
│   ├── api/           # Backend API Routes
│   ├── products/[id]/ # Dynamic Product Details Page
│   ├── cart/          # Cart Page
│   ├── wishlist/      # Wishlist Page
│   ├── layout.tsx     # Root Layout
│   └── page.tsx       # Home Page
├── components/        # Reusable UI components
├── hooks/             # Custom hooks (filters, cart)
├── redux/             # Redux Toolkit & Sagas
│   ├── slices/
│   └── sagas/
├── lib/               # Utilities & Supabase client
└── public/            # Static assets
```

---

## 🧭 Navigation Structure

### Header
- Global search bar accessible from all pages

### Sidebar
- Product filtering controls

### Routes
- `/products` – Shoe listings
- `/products/[id]` – Product detail pages
- `/cart` – Cart
- `/wishlist` – Wishlist

### Modals
- Login & Signup
- User feedback interactions

### Drawer (Sheet)
- Context-aware AI assistant

---

## 🎨 UI & Accessibility

- Built with **shadcn UI** and **Tailwind CSS**
- Fully responsive, pixel-perfect layout
- Dark mode support
- Accessibility best practices followed

---

## 🎯 Project Focus

ShopNow is intentionally designed as a **frontend-specialized full-stack application**, prioritizing UI/UX quality, performance optimization, and scalable frontend architecture while keeping backend complexity clean and manageable. The project demonstrates strong proficiency in modern React patterns, real-world state management, and production-ready frontend engineering practices.


