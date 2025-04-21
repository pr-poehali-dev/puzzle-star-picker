import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const Timer = ({ seconds, onTimeUp, isPaused = false }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const progress = (timeLeft / seconds) * 100;
  
  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp, isPaused, seconds]);
  
  // Форматирование времени в минуты:секунды
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Определение цвета прогресс-бара в зависимости от оставшегося времени
  const getProgressColor = () => {
    if (progress > 66) return "bg-green-500";
    if (progress > 33) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <div className="w-full max-w-xs mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-600">Оставшееся время:</span>
        </div>
        <span className={`font-bold ${progress <= 33 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 w-full" 
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
};
