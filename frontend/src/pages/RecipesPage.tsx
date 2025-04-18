
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

// Temporary recipes data
const allRecipes = [
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
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
    prepTime: "30 mins",
    servings: 2,
    calories: 410,
    difficulty: "medium" as const,
    tags: ["Dessert", "Chocolate", "Sweet"]
  },
  {
    id: "5",
    title: "Avocado Toast with Poached Egg",
    image: "https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww",
    prepTime: "15 mins",
    servings: 1,
    calories: 280,
    difficulty: "easy" as const,
    tags: ["Breakfast", "Healthy", "Quick"]
  },
  {
    id: "6",
    title: "Beef Stroganoff",
    image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    prepTime: "45 mins",
    servings: 4,
    calories: 520,
    difficulty: "hard" as const,
    tags: ["Beef", "Comfort Food", "Dinner"]
  }
];

// Categories for filter
const categories = [
  "All", "Breakfast", "Lunch", "Dinner", "Dessert", "Vegetarian", "Vegan", "Gluten-Free", "Quick"
];

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [calorieRange, setCalorieRange] = useState([0, 1000]);
  const [timeRange, setTimeRange] = useState([0, 120]);
  const [showFilters, setShowFilters] = useState(false);

  // For a real app, we would filter recipes based on search, category, calories, and time
  // For this demo, we'll just show all recipes
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Page Header */}
        <div className="bg-recipe-primary/10 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Recipes</h1>
            <p className="text-gray-600">Discover and explore delicious recipes for any occasion</p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-recipe-primary/30" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedCategory === category 
                            ? 'bg-recipe-primary text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Calorie Range</h3>
                  <Slider
                    defaultValue={calorieRange}
                    min={0}
                    max={1000}
                    step={50}
                    onValueChange={setCalorieRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{calorieRange[0]} cal</span>
                    <span>{calorieRange[1]} cal</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Time Range (mins)</h3>
                  <Slider
                    defaultValue={timeRange}
                    min={0}
                    max={120}
                    step={5}
                    onValueChange={setTimeRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{timeRange[0]} mins</span>
                    <span>{timeRange[1]} mins</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Any", "Easy", "Medium", "Hard"].map((difficulty) => (
                      <button
                        key={difficulty}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 border-t pt-4">
                <div className="flex gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button className="bg-recipe-primary hover:bg-recipe-primary/90">Apply Filters</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-transparent border-b w-full justify-start">
              <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary">All</TabsTrigger>
              <TabsTrigger value="popular" className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary">Popular</TabsTrigger>
              <TabsTrigger value="newest" className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary">Newest</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary">Trending</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id}
                    {...recipe}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRecipes.slice(0, 3).map((recipe) => (
                  <RecipeCard 
                    key={recipe.id}
                    {...recipe}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="newest" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRecipes.slice(3, 6).map((recipe) => (
                  <RecipeCard 
                    key={recipe.id}
                    {...recipe}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[allRecipes[1], allRecipes[4], allRecipes[2]].map((recipe) => (
                  <RecipeCard 
                    key={recipe.id}
                    {...recipe}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Show more button */}
          <div className="flex justify-center mt-10 mb-6">
            <Button variant="outline" className="flex items-center gap-2">
              Load More Recipes
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipesPage;
