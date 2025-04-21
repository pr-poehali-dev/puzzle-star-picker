import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  maxStars: number;
  selectedStars: number;
  onSelectStar: (rating: number) => void;
}

export const StarRating = ({
  maxStars,
  selectedStars,
  onSelectStar,
}: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = 
          (hoveredStar !== null && starValue <= hoveredStar) || 
          (hoveredStar === null && starValue <= selectedStars);

        return (
          <button
            key={index}
            type="button"
            className={`transition-all duration-200 transform ${
              isFilled ? "scale-110" : "scale-100"
            }`}
            onMouseEnter={() => setHoveredStar(starValue)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => onSelectStar(starValue)}
          >
            <Star
              className={`w-8 h-8 ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
