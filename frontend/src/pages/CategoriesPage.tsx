
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  {
    id: "breakfast",
    title: "Breakfast",
    description: "Start your day right with delicious breakfast recipes",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3"
  },
  {
    id: "lunch",
    title: "Lunch",
    description: "Quick and satisfying lunch recipes for busy days",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3"
  },
  {
    id: "dinner",
    title: "Dinner",
    description: "Delicious dinner recipes for the whole family",
    image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-4.0.3"
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    description: "Healthy and tasty vegetarian recipes",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3"
  },
  {
    id: "desserts",
    title: "Desserts",
    description: "Sweet treats and dessert recipes",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3"
  },
  {
    id: "quick",
    title: "Quick & Easy",
    description: "Quick recipes ready in 30 minutes or less",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3"
  }
];

const CategoriesPage = () => {
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
          <h1 className="text-3xl font-bold mb-2">Recipe Categories</h1>
          <p className="text-gray-600">Explore recipes by category</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
