import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
}

export const Timer = ({ seconds, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          onTimeUp();
        }
        return newTime;
      });
      
      setProgress((timeLeft / seconds) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, seconds, onTimeUp]);

  // Определяем цвет прогресс-бара в зависимости от оставшегося времени
  const getProgressColor = () => {
    if (progress > 66) return "bg-green-500";
    if (progress > 33) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Оставшееся время:</span>
        <span className="text-sm font-medium">{timeLeft} сек</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 w-full"
        // Используем style вместо indicatorClassName
        style={{
          "--progress-indicator-color": getProgressColor().replace("bg-", "")
        } as React.CSSProperties}
      />
    </div>
  );
};
