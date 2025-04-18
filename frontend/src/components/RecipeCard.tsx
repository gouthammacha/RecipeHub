
import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  servings: number;
  calories?: number;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

const RecipeCard = ({
  id,
  title,
  image,
  prepTime,
  servings,
  calories,
  difficulty,
  tags,
}: RecipeCardProps) => {
  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <Card className="recipe-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
      </div>
      <CardContent className="flex-grow pt-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-3 gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings} serv.</span>
          </div>
          {calories && (
            <div className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
              {calories} cal
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-wrap">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="recipe-tag">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="recipe-tag">+{tags.length - 3}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Link to={`/recipe/${id}`} className="w-full">
          <Button variant="default" className="w-full bg-recipe-primary hover:bg-recipe-primary/90">
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
