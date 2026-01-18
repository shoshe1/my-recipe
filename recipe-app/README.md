# 🍳 Recipe Manager Application

A full-featured React application for managing and discovering recipes, built as part of the ReactJS course Homework #3 assignment.

## 📖 About This Project

This Recipe Manager allows users to:
- **Browse** their personal recipe collection with filtering
- **Add** new recipes with image upload and validation
- **Discover** recipes from around the world using TheMealDB API
- **Favorite** recipes with persistent storage
- **Search** for specific dishes
- **View** detailed recipe information including ingredients and instructions
- **Switch themes** between light and dark mode

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
- Uses `useState` to manage recipes array and category filter
- Renders recipe list using `.map()`
- Passes data to `RecipeCard` child component via props
- Fully styled with responsive design
- **Extra Features:** Category filtering, recipe stats, difficulty badges

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
- **Comprehensive validation:**
  - Name must be 3+ characters
  - All required fields validated
  - Numbers must be positive
  - Clear error messages
- Console logs complete form data on submit
- Success message after submission

### 3️⃣ API Page (`ApiPage.jsx`)
**Location:** `src/pages/ApiPage.jsx`

✅ **Requirements Met:**
- Uses **axios** to call TheMealDB API
- Shows **loading state** with animated icon
- Shows **error state** with clear messages
- Displays data using `.map()`
- Each list item has proper `key={recipe.idMeal}`
- Displays meaningful data (title, image, category, etc.)
- **Extra Features:** Search functionality, random recipe generator, detailed modal view

## 🏗️ Project Structure

```
recipe-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Navigation (uses Redux)
│   │   ├── Header.css
│   │   ├── RecipeCard.jsx   # Recipe display (uses Redux)
│   │   ├── RecipeCard.css
│   │   ├── RecipeModal.jsx  # Recipe details modal
│   │   └── RecipeModal.css
│   ├── pages/               # Main page components
│   │   ├── HomePage.jsx     # Recipe collection
│   │   ├── HomePage.css
│   │   ├── FormPage.jsx     # Add recipe (uses useLocalStorage)
│   │   ├── FormPage.css
│   │   ├── ApiPage.jsx      # API discovery (uses useFetch)
│   │   ├── ApiPage.css
│   │   ├── FavoritesPage.jsx # Favorites list (uses Redux)
│   │   ├── FavoritesPage.css
│   │   └── NotFoundPage.jsx
│   ├── hooks/               # ⭐ Custom Hooks
│   │   ├── useLocalStorage.js  # Persistent state hook
│   │   └── useFetch.js         # API data fetching hook
│   ├── store/               # ⭐ Redux State
│   │   ├── store.js         # Configure Redux store
│   │   └── favoritesSlice.js   # Favorites slice + actions
│   ├── utils/               # Helper functions
│   │   └── validation.js    # Form validation logic
│   ├── services/            # API services
│   │   └── recipeApi.js     # TheMealDB API calls
│   ├── App.jsx              # Main app (uses useLocalStorage)
│   ├── App.css
│   ├── index.js             # Entry point + Redux Provider
│   └── index.css
├── docs/                    # 📊 Documentation
│   └── architecture.md      # Mermaid diagrams & architecture
├── package.json
└── README.md                # This file
```

**Key Files for Homework #3:**
- 🎣 `src/hooks/useLocalStorage.js` - Custom hook for persistent state
- 🎣 `src/hooks/useFetch.js` - Custom hook for API calls
- 🏪 `src/store/store.js` - Redux store configuration
- 📦 `src/store/favoritesSlice.js` - Redux slice with actions & selectors
- 📊 `docs/architecture.md` - Mermaid diagrams & architecture docs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## 📦 Dependencies

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
- **react-router-dom** - Client-side routing
- **axios** - HTTP client for API calls
- **@reduxjs/toolkit** - Modern Redux with less boilerplate
- **react-redux** - React bindings for Redux

## 🎨 Features & Technologies

### React Concepts Implemented

#### Homework #3 Focus:
✅ **Custom Hooks**
- `useLocalStorage` - Persistent state management
- `useFetch` - Reusable API data fetching

✅ **Redux Toolkit**
- Global state with `configureStore`
- Slice pattern with `createSlice`
- `useSelector` for reading state
- `useDispatch` for dispatching actions
- localStorage synchronization

✅ **State Management Patterns**
- **Local State** (useState) - Form inputs, UI toggles
- **Persistent State** (localStorage) - Theme, drafts, recipes
- **Global State** (Redux) - Favorites across components

#### Previous Concepts:
✅ **Components & Props** - Modular, reusable components
✅ **useState Hook** - State management for interactive features
✅ **useEffect Hook** - Side effects and lifecycle
✅ **Event Handling** - onClick, onChange, onSubmit
✅ **Controlled Components** - Form inputs controlled by state
✅ **List Rendering** - `.map()` for dynamic content
✅ **Conditional Rendering** - Loading, error, and empty states
✅ **API Integration** - axios with async/await
✅ **Form Validation** - Real-time validation with error messages
✅ **React Router** - Navigation with Routes, Route, NavLink

### Design Features

🎨 Professional food-themed color palette
📱 Fully responsive design
✨ Smooth animations and transitions
🖼️ High-quality images
♿ Accessible form labels and structure
🎯 User-friendly interface

## 🌐 API Information

This project uses **TheMealDB API** - a free public API for recipe data.

**Endpoints used:**
- Search: `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- Random: `https://www.themealdb.com/api/json/v1/1/random.php`

## 👨‍💻 Development Notes

### Component Architecture
- Clean separation of concerns
- Reusable components with clear props
- Logical file organization
- CSS modules per component
- Custom hooks for reusable logic
- Redux for cross-component state

### Best Practices Followed
- Proper key usage in lists
- Error boundaries and error handling
- Loading states for better UX
- Validation before form submission
- Clean, readable code with comments
- **No logic duplication** - fetch logic in hooks only
- **Type safety** with proper prop validation
- **Performance** - useCallback for expensive operations

### State Management Strategy

| State Type | Tool | Use Case | Example |
|------------|------|----------|---------|
| **Local** | useState | Component-specific UI | Form input values, modals |
| **Persistent** | useLocalStorage | User preferences | Theme, form drafts |
| **Global** | Redux | Cross-component data | Favorites list, count |

## 📝 Future Enhancements

Potential features to add:
- ✅ ~~Save recipes to localStorage~~ (DONE)
- ✅ ~~Recipe favorites~~ (DONE with Redux)
- ✅ ~~Dark mode theme~~ (DONE with useLocalStorage)
- Edit and delete recipes
- Recipe ratings and reviews
- Shopping list generator
- Print-friendly recipe view
- Recipe sharing via URL
- Image optimization and lazy loading
- Search within saved recipes
- Recipe categories with icons
- Cooking timer integration

## 🧪 Testing Checklist

### Custom Hooks:
- [x] useLocalStorage persists theme across refreshes
- [x] useLocalStorage auto-saves form drafts
- [x] useFetch handles loading states correctly
- [x] useFetch displays error messages
- [x] useFetch refetches on URL change

### Redux:
- [x] Favorites count badge updates in Header
- [x] Heart icon reflects favorite status
- [x] FavoritesPage shows all favorites
- [x] Favorites persist after page refresh
- [x] Clear all favorites works correctly
- [x] Toggle favorite works from multiple pages

### Integration:
- [x] Theme persists across browser sessions
- [x] Form draft survives page refresh
- [x] API search returns results
- [x] Random recipe button works
- [x] Favorited recipes appear in FavoritesPage
- [x] Recipe count badge is accurate

## 🙏 Acknowledgments

- TheMealDB API for recipe data
- React documentation
- Redux Toolkit documentation
- Course materials and instructors

## 📋 Submission Checklist

- ✅ GitHub repository with all code
- ✅ Part 1: useLocalStorage hook (used in 2+ components)
- ✅ Part 2: useFetch hook (used in ApiPage, no duplicate logic)
- ✅ Part 3: Redux Toolkit installed and configured
- ✅ Redux slice with 2+ state fields and 3+ actions
- ✅ Part 4: useSelector in 3 components
- ✅ Part 4: useDispatch in 2 components
- ✅ Part 5: Context API replaced with Redux
- ✅ Mermaid diagrams in docs/architecture.md
- ✅ Updated README with all requirements
- ✅ No node_modules in submission

---


