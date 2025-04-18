
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, MinusCircle, Upload, AlertCircle } from "lucide-react";

const CreateRecipePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: 4,
    difficulty: "",
    category: "",
    ingredients: [""],
    steps: [""],
    tags: "",
    image: null,
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    isPublic: true
  });
  
  // Image preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setRecipeData(prev => ({ ...prev, isPublic: checked }));
  };
  
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index] = value;
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };
  
  const addIngredient = () => {
    setRecipeData(prev => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
  };
  
  const removeIngredient = (index: number) => {
    if (recipeData.ingredients.length === 1) return;
    const newIngredients = [...recipeData.ingredients];
    newIngredients.splice(index, 1);
    setRecipeData(prev => ({ ...prev, ingredients: newIngredients }));
  };
  
  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...recipeData.steps];
    newSteps[index] = value;
    setRecipeData(prev => ({ ...prev, steps: newSteps }));
  };
  
  const addStep = () => {
    setRecipeData(prev => ({ ...prev, steps: [...prev.steps, ""] }));
  };
  
  const removeStep = (index: number) => {
    if (recipeData.steps.length === 1) return;
    const newSteps = [...recipeData.steps];
    newSteps.splice(index, 1);
    setRecipeData(prev => ({ ...prev, steps: newSteps }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecipeData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!recipeData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for your recipe.",
        variant: "destructive"
      });
      return;
    }
    
    if (!recipeData.ingredients[0].trim()) {
      toast({
        title: "Missing ingredients",
        description: "Please add at least one ingredient.",
        variant: "destructive"
      });
      return;
    }
    
    if (!recipeData.steps[0].trim()) {
      toast({
        title: "Missing instructions",
        description: "Please add at least one step in the cooking instructions.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the data to the server
    // For this demo, we'll just show a success message
    toast({
      title: "Recipe submitted!",
      description: "Your recipe has been created successfully.",
    });
    
    // Navigate to recipes page
    setTimeout(() => {
      navigate("/recipes");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-recipe-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Create a New Recipe</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Recipe Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title">Recipe Title*</Label>
                    <Input 
                      id="title"
                      name="title"
                      placeholder="e.g., Homemade Chocolate Chip Cookies"
                      value={recipeData.title}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      placeholder="Briefly describe your recipe..."
                      value={recipeData.description}
                      onChange={handleInputChange}
                      className="mt-1 h-24"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                        <SelectItem value="soup">Soup</SelectItem>
                        <SelectItem value="salad">Salad</SelectItem>
                        <SelectItem value="appetizer">Appetizer</SelectItem>
                        <SelectItem value="drink">Drink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("difficulty", value)}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="prepTime">Preparation Time</Label>
                    <Input 
                      id="prepTime"
                      name="prepTime"
                      placeholder="e.g., 20 minutes"
                      value={recipeData.prepTime}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cookTime">Cooking Time</Label>
                    <Input 
                      id="cookTime"
                      name="cookTime"
                      placeholder="e.g., 30 minutes"
                      value={recipeData.cookTime}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="servings">Servings</Label>
                    <Input 
                      id="servings"
                      name="servings"
                      type="number"
                      placeholder="e.g., 4"
                      value={recipeData.servings.toString()}
                      onChange={handleInputChange}
                      min="1"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (separate with commas)</Label>
                  <Input 
                    id="tags"
                    name="tags"
                    placeholder="e.g., vegetarian, italian, pasta"
                    value={recipeData.tags}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={recipeData.isPublic} 
                    onCheckedChange={handleSwitchChange}
                    id="public"
                  />
                  <Label htmlFor="public">Make recipe public</Label>
                </div>
              </div>
              
              {/* Recipe Image */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recipe Image</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {previewUrl ? (
                    <div className="mb-4">
                      <img 
                        src={previewUrl} 
                        alt="Recipe preview" 
                        className="max-h-64 mx-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop image here or click to upload</p>
                      <p className="text-xs text-gray-400">Recommended: high quality JPG or PNG, at least 1000px wide</p>
                    </div>
                  )}
                  
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="mt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      {previewUrl ? "Change Image" : "Select Image"}
                    </Button>
                    {previewUrl && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="ml-2"
                        onClick={() => {
                          setPreviewUrl(null);
                          setRecipeData(prev => ({ ...prev, image: null }));
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Ingredients */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Ingredients</h2>
                
                {recipeData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeIngredient(index)}
                      disabled={recipeData.ingredients.length === 1}
                      className="flex-shrink-0"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addIngredient}
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
              
              {/* Instructions */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Cooking Instructions</h2>
                
                {recipeData.steps.map((step, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="h-8 w-8 rounded-full bg-recipe-primary text-white font-semibold flex items-center justify-center flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <Textarea 
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeStep(index)}
                      disabled={recipeData.steps.length === 1}
                      className="flex-shrink-0"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addStep}
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
              
              {/* Nutritional Information (Optional) */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Nutritional Information (Optional)</h2>
                <p className="text-sm text-gray-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  This information will help users with dietary requirements
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="calories">Calories</Label>
                    <Input 
                      id="calories"
                      name="calories"
                      placeholder="e.g., 250"
                      value={recipeData.calories}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input 
                      id="protein"
                      name="protein"
                      placeholder="e.g., 15g"
                      value={recipeData.protein}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input 
                      id="carbs"
                      name="carbs"
                      placeholder="e.g., 30g"
                      value={recipeData.carbs}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input 
                      id="fat"
                      name="fat"
                      placeholder="e.g., 10g"
                      value={recipeData.fat}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit */}
              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <Button type="button" variant="outline">Save as Draft</Button>
                  <Button type="submit" className="bg-recipe-primary hover:bg-recipe-primary/90">
                    Publish Recipe
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateRecipePage;
