
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Flame, Clock, Award } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Temporary data for the homepage
const featuredRecipes = [
  {
    id: "1",
    title: "Garlic Butter Shrimp Pasta",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    prepTime: "25 mins",
    servings: 4,
    calories: 450,
    difficulty: "medium" as const,
    tags: ["Pasta", "Seafood", "Quick"]
  },
  {
    id: "2",
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80",
    prepTime: "40 mins",
    servings: 2,
    calories: 380,
    difficulty: "easy" as const,
    tags: ["Italian", "Vegetarian", "Pizza"]
  },
  {
    id: "3",
    title: "Thai Green Curry with Vegetables",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    prepTime: "35 mins",
    servings: 3,
    calories: 320,
    difficulty: "medium" as const,
    tags: ["Thai", "Curry", "Spicy", "Vegan"]
  }
];

const popularCategories = [
  {
    id: "breakfast",
    title: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: "desserts",
    title: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: "quick",
    title: "Quick & Easy",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80"
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-recipe-text">
              Discover & Share <span className="text-recipe-primary">Delicious</span> Recipes
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Explore thousands of recipes from home chefs around the world. Find your next culinary masterpiece.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for recipes, ingredients, or cuisines..." 
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-recipe-primary/30 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-recipe-primary hover:bg-recipe-primary/90"
                size="icon"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-recipe-text flex items-center">
              <Flame className="h-6 w-6 text-recipe-primary mr-2" />
              Featured Recipes
            </h2>
            <Link to="/recipes" className="text-recipe-primary hover:text-recipe-secondary flex items-center font-medium">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id}
                {...recipe}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-recipe-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-recipe-text flex items-center">
              <Award className="h-6 w-6 text-recipe-primary mr-2" />
              Popular Categories
            </h2>
            <Link to="/categories" className="text-recipe-primary hover:text-recipe-secondary flex items-center font-medium">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {popularCategories.map((category) => (
              <Link to={`/category/${category.id}`} key={category.id} className="group">
                <div className="relative overflow-hidden rounded-lg h-36 md:h-48">
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all z-10 flex items-center justify-center">
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                      {category.title}
                    </h3>
                  </div>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quick Meals Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-recipe-text flex items-center">
              <Clock className="h-6 w-6 text-recipe-primary mr-2" />
              Quick & Easy Meals
            </h2>
            <Link to="/quick-meals" className="text-recipe-primary hover:text-recipe-secondary flex items-center font-medium">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="bg-recipe-accent/10 rounded-xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Ready in 30 Minutes or Less</h3>
                <p className="text-gray-600 mb-6">
                  Short on time but still want to prepare something delicious? 
                  Explore our collection of quick and easy recipes that take 30 minutes or less to prepare.
                </p>
                <Link to="/quick-meals">
                  <Button className="bg-recipe-primary hover:bg-recipe-primary/90">
                    Explore Quick Meals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80" 
                    alt="Quick Pasta"
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-medium mb-1">15-Min Tomato Pasta</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>15 mins</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1556&q=80" 
                    alt="Quick Salad"
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-medium mb-1">Avocado Quinoa Salad</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>20 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Community CTA */}
      {/* <section className="py-16 bg-recipe-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Cooking Community</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Share your recipes, get inspiration, and connect with food lovers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-recipe-primary hover:bg-gray-100 font-medium">
              Sign Up Now
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10 font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default HomePage;
