
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Temporary data - replace with API call when backend is set up
const categoryRecipes = {
  breakfast: [
    {
      id: "breakfast-1",
      title: "Classic Pancakes",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3",
      prepTime: "20 mins",
      servings: 4,
      calories: 320,
      difficulty: "easy" as const,
      tags: ["Breakfast", "Sweet", "Classic"]
    },
    // Add more breakfast recipes...
  ],
  vegetarian: [
    {
      id: "veg-1",
      title: "Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3",
      prepTime: "25 mins",
      servings: 2,
      calories: 420,
      difficulty: "easy" as const,
      tags: ["Vegetarian", "Healthy", "Bowl"]
    },
    // Add more vegetarian recipes...
  ],
  quick: [
    {
      id: "quick-1",
      title: "15-Minute Pasta",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3",
      prepTime: "15 mins",
      servings: 2,
      calories: 380,
      difficulty: "easy" as const,
      tags: ["Quick", "Pasta", "Easy"]
    },
    // Add more quick recipes...
  ],
};

const CategoryPage = () => {
  const { id } = useParams();
  const recipes = categoryRecipes[id as keyof typeof categoryRecipes] || [];
  const categoryTitle = id?.charAt(0).toUpperCase() + id?.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/categories">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">{categoryTitle} Recipes</h1>
          <p className="text-gray-600">Discover our collection of {categoryTitle.toLowerCase()} recipes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
          {recipes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No recipes found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
