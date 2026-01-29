# 🍳 Recipe Manager Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing and discovering recipes, built as part of the ReactJS course Homework #3 assignment.

## 📖 About This Project

This Recipe Manager is a complete full-stack web application that allows users to:
- **Register & Login** with secure JWT authentication
- **Create & Edit** personal recipes with image upload and validation
- **Delete** recipes with automatic cleanup
- **Browse** personal recipe collection with category filtering
- **Discover** recipes from around the world using TheMealDB API
- **Favorite** recipes with per-user persistent storage (Redux + localStorage)
- **Search** for specific dishes from external API
- **View** detailed recipe information with modal overlays
- **Switch themes** between light and dark mode (persisted per user)
- **Protected routes** requiring authentication for all main features

---

## 🏗️ Full-Stack Architecture

### Technology Stack

**Frontend:**
- React 18 with functional components and hooks
- React Router v6 for client-side routing with protected routes
- Redux Toolkit for global state management (favorites)
- Context API for authentication state
- Axios for HTTP requests
- Custom hooks (useLocalStorage, useFetch)

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- CORS enabled for cross-origin requests

**External API:**
- TheMealDB API for recipe discovery

### Authentication Flow

```
User Registration/Login
    ↓
Backend validates & creates JWT token
    ↓
Token stored in localStorage
    ↓
Token added to all API requests (axios interceptor)
    ↓
Backend middleware verifies token
    ↓
Protected routes accessible
```

### Data Flow

```
User Actions → React Components → Redux/Context → API Service → Backend Routes → MongoDB
                    ↓
              UI Updates ← State Changes ← API Response ← Database Operations
```

---

## 🎯 Homework #3 Requirements

### ✅ Part 1 – Custom Hook: useLocalStorage (COMPLETE)

**Location:** `src/hooks/useLocalStorage.js`

**Requirements Met:**
- ✅ Created `useLocalStorage(key, initialValue)` custom hook
- ✅ Reads initial value from localStorage on mount
- ✅ Automatically saves updates to localStorage when value changes
- ✅ Returns `[value, setValue]` like useState

**Usage in Application (2+ components):**
1. **App.jsx** - Theme persistence
   ```javascript
   const [theme, setTheme] = useLocalStorage('app-theme', 'light');
   ```
   - Persists user's theme preference (light/dark)
   - Survives page refreshes

2. **FormPage.jsx** - Form draft auto-save
   ```javascript
   const [formDraft, setFormDraft] = useLocalStorage('recipe-form-draft', {
       name: '', category: '', difficulty: '', cookTime: '', 
       servings: '', ingredients: '', instructions: '', image: ''
   });
   ```
   - Automatically saves form progress
   - Prevents data loss on accidental page refresh
   - Includes uploaded image preview

**How it works:**
- Syncs state with localStorage automatically
- Handles JSON serialization/deserialization
- Graceful error handling for localStorage access issues

---

### ✅ Part 2 – Custom Hook: useFetch (COMPLETE)

**Location:** `src/hooks/useFetch.js`

**Requirements Met:**
- ✅ Created `useFetch(url, options)` custom hook
- ✅ Manages `data`, `loading`, `error` states internally
- ✅ Exposes `refetch()` function for manual re-fetching
- ✅ Supports dynamic URLs (re-fetches when URL changes)
- ✅ Uses axios for HTTP requests
- ✅ **No fetch logic duplicated in components**

**Usage in Application:**
1. **ApiPage.jsx** - TheMealDB API integration
   ```javascript
   const { data, loading, error, refetch } = useFetch(apiUrl);
   const recipes = data?.meals || [];
   ```
   - Search recipes by keyword
   - Fetch random recipes
   - Dynamic URL updates trigger automatic re-fetch

**Features:**
- Loading states with spinner UI
- Error handling with user-friendly messages
- Automatic re-fetch when URL dependency changes
- `useCallback` optimization prevents unnecessary re-renders

---

### ✅ Part 3 – Redux Toolkit (COMPLETE)

**Packages Installed:**
- ✅ `@reduxjs/toolkit` - Redux logic and utilities
- ✅ `react-redux` - React bindings for Redux

**Store Configuration:** `src/store/store.js`
```javascript
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer
    }
});
```

**Slice Implementation:** `src/store/favoritesSlice.js`

**Feature Chosen:** ⭐ **Favorites**

**State Fields (2+):**
1. ✅ `items` - Array of favorited recipes
2. ✅ `lastUpdated` - Timestamp of last modification

**Actions (3+):**
1. ✅ `addFavorite(recipe)` - Add recipe to favorites
2. ✅ `removeFavorite(recipeId)` - Remove recipe from favorites
3. ✅ `toggleFavorite(recipe)` - Toggle favorite status
4. ✅ `clearAllFavorites()` - Clear all favorites (bonus)

**Selectors:**
- `selectFavorites` - Get all favorite recipes
- `selectFavoritesCount` - Get count of favorites
- `selectIsFavorite(state, recipeId)` - Check if recipe is favorited
- `selectLastUpdated` - Get last update timestamp

**Special Features:**
- Automatically syncs with localStorage
- Handles both user recipes (id) and API recipes (idMeal)
- Loads favorites from localStorage on app initialization

---

### ✅ Part 4 – Use Redux in UI (COMPLETE)

**`useSelector` Usage (3 components):**

1. **Header.jsx**
   ```javascript
   const favoritesCount = useSelector(selectFavoritesCount);
   ```
   - Displays favorites count badge in navigation
   - Updates in real-time when favorites change

2. **RecipeCard.jsx**
   ```javascript
   const isInFavorites = useSelector((state) => selectIsFavorite(state, recipeId));
   ```
   - Shows filled/outlined heart icon based on favorite status
   - Visual feedback for user

3. **FavoritesPage.jsx**
   ```javascript
   const favorites = useSelector(selectFavorites);
   ```
   - Displays all favorited recipes
   - Shows empty state when no favorites exist

**`useDispatch` Usage (2 components):**

1. **RecipeCard.jsx**
   ```javascript
   const dispatch = useDispatch();
   const handleFavoriteClick = () => {
       dispatch(toggleFavorite(recipe));
   };
   ```
   - Toggles favorite status on click
   - Works for both HomePage and ApiPage recipes

2. **FavoritesPage.jsx**
   ```javascript
   const dispatch = useDispatch();
   const handleClearAll = () => {
       dispatch(clearAllFavorites());
   };
   ```
   - Clear all favorites with one click
   - Shows confirmation message

**Visible UI Effects:**
- ❤️ Favorites badge in header shows live count
- 💛 Heart icon changes color when favorited
- 📋 FavoritesPage displays all saved recipes
- 🔄 All components stay in sync through Redux

**🚫 No Custom Hook for Redux** - Following best practices, Redux logic stays in the slice

---

### ✅ Part 5 – Replace Context (COMPLETE)

**Previous Implementation:** Used Context API for favorites (Homework #2)

**Current Implementation:** Completely replaced with Redux Toolkit

**Changes Made:**
- ~~`src/context/favoritesContext.jsx`~~ - **Removed** (replaced by Redux)
- Created `src/store/favoritesSlice.js` - Redux slice for favorites
- Created `src/store/store.js` - Redux store configuration
- Updated all components to use `useSelector` and `useDispatch`
- Added `<Provider store={store}>` in `index.js`

**Why Redux is Better:**
- Better DevTools integration
- Time-travel debugging
- Middleware support (logging, persistence)
- More predictable state updates
- Better TypeScript support

---



## 🎯 Previous Assignment Requirements (Homework #2)

### 1️⃣ Home / Content Page (`HomePage.jsx`)
**Location:** `src/pages/HomePage.jsx`

✅ **Requirements Met:**
- Uses `useState` to manage recipes array, loading, error, modal states
- Fetches recipes from MongoDB backend via API
- Renders recipe list using `.map()`
- Passes data to `RecipeCard` child component via props
- Fully styled with responsive design
- **Extra Features:** 
  - Category filtering with dynamic categories
  - Recipe statistics (total, avg cook time, categories)
  - Loading spinner during API fetch
  - Error handling with banner display
  - Delete functionality with state sync
  - Modal view for recipe details
  - Empty state messages
  - Edit navigation to FormPage

### 2️⃣ Form Page (`FormPage.jsx`)
**Location:** `src/pages/FormPage.jsx`

✅ **Requirements Met:**
- **7 controlled inputs** (all using `useState`):
  - Recipe Name (text)
  - Category (select)
  - Difficulty (select)
  - Cook Time (number)
  - Servings (number)
  - Ingredients (textarea)
  - Instructions (textarea)
  - Image Upload (file input with base64 conversion)
- **Comprehensive validation:**
  - Name must be 3+ characters
  - All required fields validated
  - Numbers must be positive
  - Clear error messages displayed inline
- **Backend Integration:**
  - Creates new recipes via POST /api/recipes
  - Updates existing recipes via PUT /api/recipes/:id
  - Edit mode detection from React Router location state
  - Success/error banners with API response messages
  - Loading state during submission
  - Automatic redirect to HomePage after success
- **Draft Auto-save:** Uses useLocalStorage to preserve form data
- **Edit Mode:** Pre-populates form with recipe data for editing
- Success message after submission with redirect

### 3️⃣ API Page (`ApiPage.jsx`)
**Location:** `src/pages/ApiPage.jsx`

✅ **Requirements Met:**
- Uses **axios** via custom `useFetch` hook to call TheMealDB API
- Shows **loading state** with animated spinner
- Shows **error state** with clear messages
- Displays data using `.map()`
- Each list item has proper `key={recipe.idMeal}`
- Displays meaningful data (title, image, category, area)
- **Extra Features:** 
  - Search functionality with dynamic URL updates
  - Random recipe generator
  - Detailed modal view with RecipeModal component
  - Category and area badges
  - Favorite button integration with Redux
  - Empty state when no results found

## 🏗️ Project Structure

```
recipe-app/
├── client/                  # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.jsx       # Navigation with logout (uses Redux + AuthContext)
│   │   │   ├── Header.css
│   │   │   ├── RecipeCard.jsx   # Recipe display (uses Redux)
│   │   │   ├── RecipeCard.css
│   │   │   ├── RecipeModal.jsx  # Recipe details with edit/delete
│   │   │   ├── RecipeModal.css
│   │   │   └── Loading.jsx      # Loading spinner
│   │   ├── pages/               # Main page components
│   │   │   ├── HomePage.jsx     # User's recipe collection (API + Redux)
│   │   │   ├── HomePage.css
│   │   │   ├── FormPage.jsx     # Add/Edit recipe (API + useLocalStorage)
│   │   │   ├── FormPage.css
│   │   │   ├── ApiPage.jsx      # External API discovery (useFetch + Redux)
│   │   │   ├── ApiPage.css
│   │   │   ├── FavoritesPage.jsx # User favorites (Redux)
│   │   │   ├── FavoritesPage.css
│   │   │   ├── LoginPage.jsx    # User login (AuthContext)
│   │   │   ├── RegisterPage.jsx # User registration (AuthContext)
│   │   │   ├── AuthPages.css
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── NotFoundPage.css
│   │   ├── context/             # ⭐ Context API
│   │   │   └── AuthContext.jsx  # Authentication state management
│   │   ├── hooks/               # ⭐ Custom Hooks
│   │   │   ├── useLocalStorage.js  # Persistent state hook
│   │   │   └── useFetch.js         # API data fetching hook
│   │   ├── store/               # ⭐ Redux State
│   │   │   ├── store.js         # Configure Redux store
│   │   │   └── favoritesSlice.js   # Favorites slice with per-user isolation
│   │   ├── services/            # API services
│   │   │   ├── api.js           # Backend API (auth, recipes, favorites)
│   │   │   └── recipeApi.js     # TheMealDB external API
│   │   ├── utils/               # Helper functions
│   │   │   └── validation.js    # Form validation logic
│   │   ├── App.jsx              # Main app with protected routes
│   │   ├── App.css
│   │   ├── index.js             # Entry point (Redux + Auth providers)
│   │   └── index.css
│   └── package.json
├── server/                  # Backend Node.js/Express application
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   ├── errorHandler.js  # Global error handler
│   │   └── asyncHandler.js  # Async error wrapper
│   ├── models/
│   │   ├── User.js          # User schema (with password hashing)
│   │   ├── Recipe.js        # Recipe schema
│   │   └── Favorite.js      # Favorite schema
│   ├── routes/
│   │   ├── auth.js          # Auth routes (register, login, getMe)
│   │   ├── recipes.js       # Recipe CRUD routes (protected)
│   │   └── favorites.js     # Favorites routes (protected)
│   ├── index.js             # Server entry point
│   ├── package.json
│   └── .env                 # Environment variables (gitignored)
├── docs/                    # 📊 Documentation
│   ├── PROJECT_EXPLANATION.md   # Comprehensive Mermaid diagrams
│   ├── PRESENTATION_SCRIPT.md   # Teacher presentation guide
│   └── CRUD_IMPLEMENTATION.md   # Backend implementation details
└── README.md                # This file
```

**Key Files for Homework #3:**
- 🎣 `client/src/hooks/useLocalStorage.js` - Custom hook for persistent state
- 🎣 `client/src/hooks/useFetch.js` - Custom hook for API calls
- 🏪 `client/src/store/store.js` - Redux store configuration
- 📦 `client/src/store/favoritesSlice.js` - Redux slice with actions & selectors
- 🔐 `client/src/context/AuthContext.jsx` - Authentication context
- 🌐 `client/src/services/api.js` - Backend API service with interceptors
- 🛡️ `server/middleware/auth.js` - JWT authentication middleware
- 📊 `docs/PROJECT_EXPLANATION.md` - Mermaid diagrams & architecture

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation & Setup

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd recipe-app
```

#### 2. Setup Backend Server

```bash
cd server
npm install
```

Create `.env` file in `server/` folder:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/recipedb
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000
```

**Start the backend:**
```bash
node index.js
```
Server will run on `http://localhost:5000`

#### 3. Setup Frontend Client

Open a **new terminal** and run:
```bash
cd client
npm install
```

**Start the frontend:**
```bash
npm start
```
Client will run on `http://localhost:3000`

### 🔑 MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user (username + password)
4. Get your connection string
5. Replace `<password>` in connection string with your password
6. Add `/recipedb` at the end: `mongodb+srv://user:pass@cluster.mongodb.net/recipedb`

### ✅ Verify Installation

- Backend: Visit `http://localhost:5000` - should see API message
- Frontend: Visit `http://localhost:3000` - should see the app
- Register a new user and create a recipe to test full functionality

## 📦 Dependencies

### Frontend (`client/package.json`)
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x"
}
```

**Core Dependencies:**
- **react** & **react-dom** - UI library
- **react-router-dom** - Client-side routing with protected routes
- **axios** - HTTP client for API calls
- **@reduxjs/toolkit** - Modern Redux with less boilerplate
- **react-redux** - React bindings for Redux

### Backend (`server/package.json`)
```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "dotenv": "^16.x",
  "cors": "^2.x"
}
```

**Core Dependencies:**
- **express** - Web framework for Node.js
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT token generation and verification
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## 🎨 Features & Technologies

### React Concepts Implemented

#### Homework #3 Focus:
✅ **Custom Hooks**
- `useLocalStorage` - Persistent state management (theme, form drafts)
- `useFetch` - Reusable API data fetching with loading/error states

✅ **Redux Toolkit**
- Global state with `configureStore`
- Slice pattern with `createSlice`
- `useSelector` for reading state (Header, RecipeCard, FavoritesPage)
- `useDispatch` for dispatching actions (RecipeCard, FavoritesPage)
- Per-user localStorage synchronization with user ID isolation
- Supports multiple recipe ID formats (id, idMeal, _id)

✅ **State Management Patterns**
- **Local State** (useState) - Form inputs, UI toggles, modals
- **Persistent State** (useLocalStorage) - Theme, form drafts
- **Global State** (Redux) - Favorites across components with per-user isolation
- **Context API** (AuthContext) - Authentication state shared globally

✅ **Full-Stack Integration**
- **Backend API** - Express.js REST API with MongoDB
- **Authentication** - JWT tokens with secure password hashing
- **Protected Routes** - ProtectedRoute component guards authenticated pages
- **API Interceptors** - Automatic token injection and 401 handling
- **CRUD Operations** - Create, Read, Update, Delete recipes via API

#### Previous Concepts:
✅ **Components & Props** - Modular, reusable components
✅ **useState Hook** - State management for interactive features
✅ **useEffect Hook** - Side effects, data fetching, lifecycle
✅ **Event Handling** - onClick, onChange, onSubmit with preventDefault
✅ **Controlled Components** - Form inputs controlled by state
✅ **List Rendering** - `.map()` for dynamic content with proper keys
✅ **Conditional Rendering** - Loading, error, empty, and authenticated states
✅ **API Integration** - axios with async/await and error handling
✅ **Form Validation** - Real-time validation with error messages
✅ **React Router** - Navigation with Routes, Route, NavLink, useNavigate, Navigate
✅ **Context API** - AuthContext for authentication
✅ **Custom Hooks** - useAuth for consuming AuthContext

### Design Features

🎨 Professional food-themed color palette
📱 Fully responsive design
✨ Smooth animations and transitions
🖼️ High-quality images
♿ Accessible form labels and structure
🎯 User-friendly interface

## 🌐 API Information

### Backend API (MongoDB)

**Base URL:** `http://localhost:5000/api`

**Authentication Endpoints:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user (returns JWT token)
- `GET /auth/me` - Get current user (protected)

**Recipe Endpoints (Protected):**
- `GET /recipes` - Get all user's recipes
- `GET /recipes/:id` - Get single recipe
- `POST /recipes` - Create new recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe

**Favorites Endpoints (Protected):**
- `GET /favorites` - Get all user's favorites
- `POST /favorites/toggle` - Toggle favorite status
- `GET /favorites/check/:recipeId` - Check if favorited
- `DELETE /favorites/:recipeId` - Remove favorite
- `DELETE /favorites` - Clear all favorites

**Authentication:**
- JWT token required in `Authorization` header: `Bearer <token>`
- Token automatically added by axios interceptor
- 401 responses trigger automatic logout and redirect

### External API (TheMealDB)

This project also uses **TheMealDB API** - a free public API for recipe discovery.

**Endpoints used:**
- Search: `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- Random: `https://www.themealdb.com/api/json/v1/1/random.php`

**No authentication required** for TheMealDB API.

## 👨‍💻 Development Notes

### Component Architecture
- Clean separation of concerns (components, pages, services, utils)
- Reusable components with clear props
- Logical file organization with client/server separation
- CSS modules per component
- Custom hooks for reusable logic
- Redux for cross-component state
- Context API for authentication
- Protected route pattern for security
- API service layer with interceptors
- Middleware pattern for authentication and error handling

### Best Practices Followed
- Proper key usage in lists
- Error boundaries and error handling
- Loading states for better UX
- Validation before form submission
- Clean, readable code with comments
- **No logic duplication** - fetch logic in hooks only
- **Security** - JWT tokens, password hashing, protected routes
- **Performance** - useCallback for expensive operations
- **Separation of Concerns** - Frontend/backend split
- **RESTful API** - Standard HTTP methods and status codes
- **Environment Variables** - Secure configuration with .env
- **User Isolation** - Per-user favorites and recipes

### State Management Strategy

| State Type | Tool | Use Case | Example |
|------------|------|----------|---------|
| **Local** | useState | Component-specific UI | Form inputs, modals, filters |
| **Persistent** | useLocalStorage | User preferences | Theme, form drafts |
| **Global** | Redux | Cross-component data | Favorites list, count (per-user) |
| **Global Auth** | Context API | Authentication state | User, token, login/logout |
| **Backend** | MongoDB | Persistent database | Users, recipes, favorites |

## 📝 Future Enhancements

Potential features to add:
- ✅ ~~Save recipes to database~~ (DONE with MongoDB)
- ✅ ~~Recipe favorites~~ (DONE with Redux + per-user isolation)
- ✅ ~~Dark mode theme~~ (DONE with useLocalStorage)
- ✅ ~~Edit and delete recipes~~ (DONE with RecipeModal)
- ✅ ~~User authentication~~ (DONE with JWT)
- ✅ ~~Protected routes~~ (DONE with ProtectedRoute)
- Recipe ratings and reviews
- Shopping list generator
- Print-friendly recipe view
- Recipe sharing via URL
- Image optimization and lazy loading
- Search within saved recipes
- Recipe categories with icons
- Cooking timer integration
- Social features (follow users, share recipes)
- Email verification for registration
- Password reset functionality
- Recipe import from URL
- Nutrition information calculator
- Meal planning calendar

## 🧪 Testing Checklist

### Authentication:
- [x] Register new user with validation
- [x] Login with correct credentials
- [x] Login fails with wrong credentials
- [x] Token persists in localStorage
- [x] Protected routes redirect to login when not authenticated
- [x] Logout clears token and redirects to login
- [x] 401 responses trigger automatic logout

### Custom Hooks:
- [x] useLocalStorage persists theme across refreshes
- [x] useLocalStorage auto-saves form drafts
- [x] useLocalStorage clears draft after successful submit
- [x] useLocalStorage doesn't save draft in edit mode
- [x] useFetch handles loading states correctly
- [x] useFetch displays error messages
- [x] useFetch refetches on URL change

### Redux:
- [x] Favorites count badge updates in Header
- [x] Heart icon reflects favorite status
- [x] FavoritesPage shows all favorites
- [x] Favorites persist after page refresh
- [x] Favorites isolated per user (different users see different favorites)
- [x] Clear all favorites works correctly
- [x] Toggle favorite works from multiple pages
- [x] MongoDB _id, API id, and idMeal all supported

### CRUD Operations:
- [x] Create new recipe saves to MongoDB
- [x] Read recipes fetches from MongoDB
- [x] Update recipe modifies existing recipe
- [x] Delete recipe removes from MongoDB and updates UI
- [x] Form validation prevents invalid submissions
- [x] Success/error messages display correctly
- [x] Image upload converts to base64

### Integration:
- [x] Theme persists across browser sessions
- [x] Form draft survives page refresh
- [x] API search returns results from TheMealDB
- [x] Random recipe button works
- [x] Favorited recipes appear in FavoritesPage
- [x] Recipe count badge is accurate
- [x] Edit button pre-populates form
- [x] Delete removes recipe and updates favorites
- [x] User recipes and API recipes both work with favorites
- [x] Backend validates JWT tokens
- [x] MongoDB stores user data correctly

## 🙏 Acknowledgments

- TheMealDB API for recipe discovery data
- MongoDB Atlas for database hosting
- React documentation and community
- Redux Toolkit documentation
- Express.js and Node.js communities
- Course materials and instructors

## 📋 Submission Checklist

- ✅ GitHub repository with all code
- ✅ Part 1: useLocalStorage hook (used in App.jsx for theme, FormPage.jsx for drafts)
- ✅ Part 2: useFetch hook (used in ApiPage.jsx, no duplicate logic)
- ✅ Part 3: Redux Toolkit installed and configured
- ✅ Redux slice with 2+ state fields (items, lastUpdated) and 4 actions
- ✅ Part 4: useSelector in 3 components (Header, RecipeCard, FavoritesPage)
- ✅ Part 4: useDispatch in 2 components (RecipeCard, FavoritesPage)
- ✅ Part 5: Context API replaced with Redux for favorites
- ✅ Mermaid diagrams in docs/PROJECT_EXPLANATION.md
- ✅ Updated README with all requirements
- ✅ No node_modules in submission
- ✅ .env.example provided for backend configuration
- ✅ Full-stack MERN application with authentication
- ✅ Protected routes implementation
- ✅ Complete CRUD operations for recipes
- ✅ Per-user data isolation

---

**Built with ❤️ for ReactJS Course - Homework #3**


