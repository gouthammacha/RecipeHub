
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-recipe-primary" />
          <span className="font-display text-xl font-bold text-recipe-text">RecipeHub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-recipe-text hover:text-recipe-primary transition-colors">Home</Link>
          <Link to="/recipes" className="text-recipe-text hover:text-recipe-primary transition-colors">Browse Recipes</Link>
          <Link to="/create" className="text-recipe-text hover:text-recipe-primary transition-colors">Create Recipe</Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search recipes..." 
              className="pl-9 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-recipe-primary/30 w-[200px]" 
            />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="bg-recipe-primary hover:bg-recipe-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-recipe-text"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 p-4 flex flex-col transition-transform duration-300 ease-in-out transform",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-8 pt-2">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-recipe-primary" />
            <span className="font-display text-xl font-bold">RecipeHub</span>
          </Link>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search recipes..." 
            className="w-full pl-9 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none" 
          />
        </div>
        <nav className="flex flex-col space-y-6 text-lg">
          <Link to="/" className="text-recipe-text hover:text-recipe-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/recipes" className="text-recipe-text hover:text-recipe-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Browse Recipes</Link>
          <Link to="/create" className="text-recipe-text hover:text-recipe-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Create Recipe</Link>
          <Link to="/signin" className="text-recipe-text hover:text-recipe-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
            <Button variant="default" className="bg-recipe-primary hover:bg-recipe-primary/90 mt-4 w-full">
              Sign Up
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
