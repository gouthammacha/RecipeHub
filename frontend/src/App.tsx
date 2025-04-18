
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import QuickMealsPage from "./pages/QuickMealsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/create" element={<CreateRecipePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/quick-meals" element={<QuickMealsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
