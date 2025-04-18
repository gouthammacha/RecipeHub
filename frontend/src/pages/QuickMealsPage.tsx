
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const quickRecipes = [
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
  {
    id: "quick-2",
    title: "5-Minute Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3",
    prepTime: "5 mins",
    servings: 1,
    calories: 250,
    difficulty: "easy" as const,
    tags: ["Quick", "Breakfast", "Healthy"]
  }
];

const QuickMealsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Clock className="mr-2 h-6 w-6 text-recipe-primary" />
            Quick & Easy Meals
          </h1>
          <p className="text-gray-600">Delicious recipes ready in 30 minutes or less</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuickMealsPage;
