import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/Timer";
import { PuzzleGame } from "@/components/PuzzleGame";
import { ArrowLeft } from "lucide-react";

const PuzzlePage = () => {
  const { difficulty = "1" } = useParams();
  const difficultyLevel = parseInt(difficulty, 10);
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  // Рассчитываем время в зависимости от сложности
  const timeLimit = 60 - (difficultyLevel - 1) * 10;
  
  // Обработчик окончания времени
  const handleTimeUp = () => {
    if (!gameWon) {
      setGameOver(true);
    }
  };

  // Обработчик выигрыша
  const handleGameWin = () => {
    setGameWon(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="flex">
            {Array.from({ length: difficultyLevel }).map((_, i) => (
              <span key={i} className="text-xl text-amber-400">★</span>
            ))}
            {Array.from({ length: 5 - difficultyLevel }).map((_, i) => (
              <span key={i} className="text-xl text-gray-300">☆</span>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4 flex flex-col items-center justify-center">
        {!gameOver && !gameWon && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-indigo-900 mb-2">
                Уровень сложности: {difficultyLevel}
              </h1>
              <p className="text-gray-600">
                Найдите все соответствующие пары!
              </p>
              <Timer 
                seconds={timeLimit} 
                onTimeUp={handleTimeUp}
                isPaused={gameWon}
              />
            </div>
            
            <PuzzleGame 
              difficulty={difficultyLevel} 
              onGameWin={handleGameWin}
            />
          </>
        )}

        {gameOver && (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md animate-fade-in">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Время вышло!</h2>
            <p className="text-gray-600 mb-6">
              К сожалению, вы не успели решить головоломку вовремя.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Попробовать снова
            </Button>
          </div>
        )}

        {gameWon && (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md animate-fade-in">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Поздравляем!</h2>
            <p className="text-gray-600 mb-6">
              Вы успешно решили головоломку уровня {difficultyLevel}!
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Играть снова
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PuzzlePage;
