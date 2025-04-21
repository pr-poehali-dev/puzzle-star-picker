import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { StarRating } from "../components/StarRating";
import { Brain, Clock } from "lucide-react";

const Index = () => {
  const [difficulty, setDifficulty] = useState<number>(1);
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/puzzle/${difficulty}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-indigo-900">Головоломка IQ</h1>
          <p className="text-lg text-gray-600">Проверь свой интеллект!</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-600 font-medium">Для IQ больше 100</span>
            <Brain className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Выберите уровень сложности:</label>
            <div className="flex justify-center">
              <StarRating 
                maxStars={5} 
                selectedStars={difficulty} 
                onSelectStar={setDifficulty} 
              />
            </div>
            <p className="text-sm text-center text-gray-500 italic mt-2">
              {difficulty === 1 && "Легкий уровень - для начинающих"}
              {difficulty === 2 && "Средний уровень - требует внимания"}
              {difficulty === 3 && "Сложный уровень - вызов для большинства"}
              {difficulty === 4 && "Очень сложный - для опытных игроков"}
              {difficulty === 5 && "Экспертный уровень - настоящее испытание!"}
            </p>
          </div>

          <div className="flex items-center justify-center text-amber-600 space-x-2 p-2 bg-amber-50 rounded-md">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Игра ограничена по времени!</span>
          </div>

          <Button 
            onClick={handleStartGame}
            className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105"
          >
            Начать игру
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Выбирайте сложность осторожно. Чем выше звезда, тем сложнее головоломка и меньше времени на решение!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
