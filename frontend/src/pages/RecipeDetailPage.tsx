
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Users, Heart, Bookmark, Share2, ThumbsUp, MessageSquare, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Fake recipe data for demo
const recipeData = {
  id: "1",
  title: "Garlic Butter Shrimp Pasta",
  image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  prepTime: "25 mins",
  cookTime: "15 mins", 
  servings: 4,
  calories: 450,
  protein: "22g",
  carbs: "48g",
  fat: "18g",
  difficulty: "medium" as const,
  tags: ["Pasta", "Seafood", "Quick"],
  description: "A delicious pasta dish featuring succulent shrimp tossed with linguine in a rich garlic butter sauce. Ready in just 25 minutes, it's perfect for a quick weeknight dinner that feels luxurious.",
  ingredients: [
    "8 oz linguine pasta",
    "1 lb large shrimp, peeled and deveined",
    "4 tbsp butter",
    "4 cloves garlic, minced",
    "1/4 tsp red pepper flakes (optional)",
    "1/4 cup white wine (or chicken broth)",
    "2 tbsp fresh lemon juice",
    "1/4 cup chopped fresh parsley",
    "Salt and freshly ground black pepper to taste",
    "Grated Parmesan cheese for serving"
  ],
  instructions: [
    "Bring a large pot of salted water to a boil. Add linguine and cook according to package instructions until al dente. Drain and set aside, reserving 1/2 cup of pasta water.",
    "While pasta is cooking, prepare the shrimp. Pat shrimp dry with paper towels and season with salt and pepper.",
    "In a large skillet, melt 2 tablespoons of butter over medium-high heat. Add the shrimp and cook for 1-2 minutes per side until pink and opaque. Remove shrimp from the pan and set aside.",
    "In the same skillet, add remaining butter. Once melted, add minced garlic and red pepper flakes. Cook until fragrant, about 1 minute.",
    "Add white wine (or broth) and lemon juice to the skillet, scraping up any browned bits from the bottom. Let the sauce simmer for 2-3 minutes until slightly reduced.",
    "Return the cooked shrimp to the skillet along with the drained pasta. Toss everything together to coat with the sauce. If needed, add a splash of reserved pasta water to loosen the sauce.",
    "Remove from heat and stir in fresh parsley. Season with additional salt and pepper if needed.",
    "Serve immediately with grated Parmesan cheese sprinkled on top."
  ],
  author: {
    name: "Maria G.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80",
    date: "March 15, 2025"
  },
  comments: [
    {
      id: "c1",
      text: "Made this last night and it was delicious! I added some cherry tomatoes as well.",
      date: "April 2, 2025",
      author: "Anonymous",
    },
    {
      id: "c2",
      text: "The garlic butter sauce is perfect. My family loved it!",
      date: "April 5, 2025",
      author: "Anonymous",
    }
  ],
  rating: 4.8,
  ratingCount: 156
};

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const handleComment = () => {
    if (comment.trim() === "") {
      toast({
        title: "Comment cannot be empty",
        description: "Please enter your comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would save the comment to the database
    toast({
      title: "Comment submitted!",
      description: "Your anonymous feedback has been added to the recipe.",
    });
    setComment("");
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? "Recipe removed from your favorites list" : "Recipe added to your favorites list",
    });
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Unsaved recipe" : "Saved recipe",
      description: saved ? "Recipe removed from your saved items" : "Recipe saved to your collection",
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Recipe link copied to clipboard",
    });
  };

  const adjustServing = (multiplier: number) => {
    setServingMultiplier(multiplier);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-recipe-background">
        {/* Hero Image */}
        <div className="w-full h-72 md:h-96 relative">
          <img 
            src={recipeData.image} 
            alt={recipeData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex gap-2 mb-2">
              {recipeData.tags.map(tag => (
                <span key={tag} className="recipe-tag bg-white/20 text-white">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{recipeData.title}</h1>
          </div>
        </div>
        
        {/* Recipe Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Recipe Meta Info */}
            <div className="p-6 border-b">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={recipeData.author.avatar} />
                    <AvatarFallback>{recipeData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{recipeData.author.name}</p>
                    <p className="text-xs text-gray-500">{recipeData.author.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <div className="text-amber-400 text-lg font-semibold">{recipeData.rating}</div>
                    <div className="flex ml-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${star <= Math.round(recipeData.rating) ? "text-amber-400" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">({recipeData.ratingCount})</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
                      onClick={handleLike}
                    >
                      <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
                      <span>Like</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`flex items-center gap-1 ${saved ? "text-recipe-primary" : ""}`}
                      onClick={handleSave}
                    >
                      <Bookmark className={`h-4 w-4 ${saved ? "fill-recipe-primary" : ""}`} />
                      <span>Save</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recipe Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 border-b">
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-semibold">{recipeData.prepTime}</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-semibold">{recipeData.cookTime}</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">Servings</p>
                <div className="flex items-center justify-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6 rounded-full"
                    onClick={() => adjustServing(Math.max(0.5, servingMultiplier - 0.5))}
                  >
                    <span className="font-bold">-</span>
                  </Button>
                  <span className="font-semibold">{(recipeData.servings * servingMultiplier)}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6 rounded-full"
                    onClick={() => adjustServing(servingMultiplier + 0.5)}
                  >
                    <span className="font-bold">+</span>
                  </Button>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-semibold capitalize">{recipeData.difficulty}</p>
              </div>
            </div>
            
            {/* Tabs for Recipe Content */}
            <div className="p-6">
              <Tabs defaultValue="overview">
                <TabsList className="w-full justify-start border-b mb-6 bg-transparent">
                  <TabsTrigger 
                    value="overview" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ingredients" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary"
                  >
                    Ingredients
                  </TabsTrigger>
                  <TabsTrigger 
                    value="directions" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary"
                  >
                    Directions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="nutrition" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary"
                  >
                    Nutrition
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-recipe-primary"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="space-y-8">
                    <div className="recipe-section">
                      <h2 className="text-xl font-semibold mb-4">About This Recipe</h2>
                      <p className="text-gray-700">{recipeData.description}</p>
                    </div>
                    
                    <div className="recipe-section">
                      <h2 className="text-xl font-semibold mb-4">Nutrition Facts</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Calories</p>
                          <p className="font-semibold">{recipeData.calories * servingMultiplier}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Protein</p>
                          <p className="font-semibold">{recipeData.protein}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Carbs</p>
                          <p className="font-semibold">{recipeData.carbs}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Fat</p>
                          <p className="font-semibold">{recipeData.fat}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="recipe-section">
                      <h2 className="text-xl font-semibold mb-4">At a Glance</h2>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-recipe-primary mr-2" />
                          <span>Total Time: {recipeData.prepTime} prep + {recipeData.cookTime} cooking</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-recipe-primary mr-2" />
                          <span>Serves {recipeData.servings * servingMultiplier} people</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Ingredients Tab */}
                <TabsContent value="ingredients">
                  <div className="recipe-section">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Ingredients</h2>
                      <p className="text-sm text-gray-500">
                        {servingMultiplier !== 1 ? `Adjusted for ${recipeData.servings * servingMultiplier} servings` : ''}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {recipeData.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-5 w-5 rounded-full border border-recipe-primary mr-3 flex-shrink-0"></div>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full md:w-auto bg-recipe-primary hover:bg-recipe-primary/90">
                      Add All Ingredients to Shopping List
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Directions Tab */}
                <TabsContent value="directions">
                  <div className="recipe-section">
                    <h2 className="text-xl font-semibold mb-6">Instructions</h2>
                    <ol className="space-y-8">
                      {recipeData.instructions.map((step, index) => (
                        <li key={index} className="flex">
                          <div className="h-8 w-8 rounded-full bg-recipe-primary text-white font-semibold flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                            {index + 1}
                          </div>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
                
                {/* Nutrition Tab */}
                <TabsContent value="nutrition">
                  <div className="recipe-section">
                    <h2 className="text-xl font-semibold mb-6">Nutrition Information</h2>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h3 className="font-semibold mb-2">Per Serving</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <p className="text-lg font-semibold">{recipeData.calories}</p>
                          <p className="text-sm text-gray-500">Calories</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{recipeData.protein}</p>
                          <p className="text-sm text-gray-500">Protein</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{recipeData.carbs}</p>
                          <p className="text-sm text-gray-500">Carbohydrates</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{recipeData.fat}</p>
                          <p className="text-sm text-gray-500">Fat</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <p className="text-sm">
                        Nutrition information is estimated and may vary depending on ingredients and portion sizes.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <div className="recipe-section">
                    <h2 className="text-xl font-semibold mb-6">Reviews & Comments</h2>
                    
                    {/* Leave a comment */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-8">
                      <h3 className="font-medium mb-2">Leave Feedback</h3>
                      <Textarea 
                        placeholder="Share your experience with this recipe... (anonymous)"
                        className="mb-4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button 
                        onClick={handleComment}
                        className="bg-recipe-primary hover:bg-recipe-primary/90"
                      >
                        Post Comment
                      </Button>
                    </div>
                    
                    {/* Comments list */}
                    <div className="space-y-6">
                      {recipeData.comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">{comment.author}</p>
                            <p className="text-sm text-gray-500">{comment.date}</p>
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                          <div className="flex gap-4 mt-3">
                            <button className="text-gray-500 text-sm flex items-center hover:text-gray-700">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </button>
                            <button className="text-gray-500 text-sm flex items-center hover:text-gray-700">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
