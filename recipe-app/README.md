# 🍳 Recipe Manager Application

## 📖 About This Project
This Recipe Manager is a full-featured React application that allows users to:

- 📚 Browse their personal recipe collection
- ➕ Add new recipes with detailed information
- 🔍 Discover recipes from around the world using TheMealDB API
- 🔎 Search for specific dishes
- ❤️ Save favorite recipes for quick access
- 📖 View detailed recipe information including ingredients and instructions

## 🏗️ Application Structure

### The 3 Required Pages

#### 1️⃣ Home / Content Page
**File:** `src/pages/HomePage.jsx`
- Displays your personal recipe collection
- Shows recipe statistics (total recipes, average cook time, categories)
- Filter recipes by category
- View recipe cards in a responsive grid layout

#### 2️⃣ Form Page
**File:** `src/pages/FormPage.jsx`
- Add new recipes to your collection
- Input fields: name, category, difficulty, cook time, servings, ingredients, instructions
- Form validation with error messages

#### 3️⃣ API Page
**File:** `src/pages/ApiPage.jsx`
- Discover recipes from TheMealDB API
- Search functionality for finding specific recipes
- Random recipe generator
- View external recipes with full details

### Additional Pages

#### 4️⃣ Favorites Page
**File:** `src/pages/FavoritesPage.jsx`
- View all your saved favorite recipes
- Quick access to recipes you love
- Clear all favorites functionality

#### 5️⃣ Not Found Page
**File:** `src/pages/NotFoundPage.jsx`
- 404 error page for invalid routes
- Navigate back to home page

## 🔄 React Context - Favorites Management

**File:** `src/context/favoritesContext.jsx`

### What It Stores
The `FavoritesContext` stores and manages the user's favorite recipes globally across the application.

**State:**
- `favoritess` - Array of favorite recipe objects
- `favoritesCount` - Number of favorited recipes (for badge display)

### How We Use It
The context provides these functions throughout the app:

- **`addFavorite(recipe)`** - Adds a recipe to favorites (prevents duplicates)
- **`removeFavorite(recipeId)`** - Removes a recipe from favorites by ID
- **`isFavorite(recipeId)`** - Checks if a recipe is already favorited (for heart icon state)
- **`toggleFavorite(recipe)`** - Adds or removes a recipe (used in RecipeCard buttons)
- **`clearFavorites()`** - Removes all favorites at once

**Usage Example:**
```jsx
import { useFavorites } from '../context/favoritesContext';

function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite, favoritesCount } = useFavorites();
  
  const handleFavoriteClick = () => {
    toggleFavorite(recipe);
  };
  
  return (
    <button onClick={handleFavoriteClick}>
      {isFavorite(recipe.id) ? '❤️' : '🤍'}
    </button>
  );
}
```

**Why Context?**
- Favorites need to be accessible from multiple pages (HomePage, ApiPage, FavoritesPage)
- Avoids prop drilling through multiple component layers
- Provides a single source of truth for favorite recipes
- Works with both local recipes (id) and API recipes (idMeal)

## 🛣️ React Router - Application Routes

**Configuration:** `src/App.jsx` and `src/index.js`

### Route Structure

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Main page - displays personal recipe collection |
| `/form` | `FormPage` | Add new recipe form with validation |
| `/api` | `ApiPage` | Search and discover recipes from TheMealDB API |
| `/favorites` | `FavoritesPage` | View all saved favorite recipes |
| `*` | `NotFoundPage` | 404 error page for invalid URLs |

### Navigation Flow

```
Header (Navigation Bar)
├── 🏠 My Recipes → /
├── ➕ Add Recipe → /form
├── 🔍 Discover → /api
└── ❤️ Favorites → /favorites (with count badge)
```

### How Routes Work

**1. Setup in `index.js`:**
```jsx
import { BrowserRouter } from 'react-router-dom';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**2. Route Configuration in `App.jsx`:**
```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <FavoritesProvider>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form' element={<FormPage />} />
        <Route path='/api' element={<ApiPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </FavoritesProvider>
  );
}
```

**3. Navigation in `Header.jsx`:**
```jsx
import { NavLink } from 'react-router-dom';

<NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
  🏠 My Recipes
</NavLink>
```

**Benefits of React Router:**
- Client-side navigation (no page refresh)
- Browser back/forward button support
- Shareable URLs for each page
- Active link styling with `NavLink`
- 404 handling with wildcard route

## 🔧 Technologies Used

- **React** - UI library
- **React Router** - Client-side routing and navigation
- **Context API** - Global state management for favorites
- **Axios** - HTTP requests to TheMealDB API
- **CSS3** - Styling with CSS variables and animations

## 🌐 API Integration

This app uses [TheMealDB API](https://www.themealdb.com/api.php):
- Search recipes by name
- Get random recipes
- Retrieve recipe details by ID

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd recipe-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ Key Features

- 🏠 Personal recipe collection with statistics
- 🔍 Search thousands of recipes from external API
- ❤️ Favorites system with Context API
- 🎨 Responsive design for all devices
- 🎯 Form validation and error handling
- 🔄 Smooth page transitions with React Router

---