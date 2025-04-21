import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

interface PuzzleGameProps {
  difficulty: number;
  onGameWin: () => void;
}

// Символы для карточек
const symbols = [
  '🚀', '🌟', '🌈', '🌙', '🔥', '🌊', '🌍', '🦄',
  '🐘', '🦁', '🦋', '🐬', '🌺', '🍄', '🍎', '🎯',
  '🎨', '🎭', '🎮', '⚽', '🏆', '💎', '⏰', '📚',
  '🔍', '🧩', '🎵', '🎪', '🧠', '❤️', '🔑', '🌞',
];

export const PuzzleGame = ({ difficulty, onGameWin }: PuzzleGameProps) => {
  // Количество пар в зависимости от сложности (от 4 до 12)
  const pairsCount = 4 + (difficulty - 1) * 2;
  
  const [cards, setCards] = useState<Array<{
    id: number;
    symbol: string;
    isFlipped: boolean;
    isMatched: boolean;
  }>>([]);
  
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  
  // Инициализация игры
  useEffect(() => {
    initializeGame();
  }, [difficulty]);
  
  // Проверка на победу
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      onGameWin();
    }
  }, [cards, onGameWin]);
  
  const initializeGame = () => {
    // Выбираем пары символов в зависимости от уровня сложности
    const selectedSymbols = symbols.slice(0, pairsCount);
    
    // Создаем пары карточек
    let cardPairs: Array<{
      id: number;
      symbol: string;
      isFlipped: boolean;
      isMatched: boolean;
    }> = [];
    
    selectedSymbols.forEach((symbol, index) => {
      cardPairs.push(
        { id: index * 2, symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
      );
    });
    
    // Перемешиваем карточки
    cardPairs = shuffleCards(cardPairs);
    
    setCards(cardPairs);
    setFlippedCards([]);
    setMoveCount(0);
  };
  
  const shuffleCards = (cardsArray: any[]) => {
    const shuffled = [...cardsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const handleCardClick = (id: number) => {
    // Проверяем, что сейчас не происходит проверка и карточка еще не открыта и не совпала
    const card = cards.find(c => c.id === id);
    if (isChecking || !card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }
    
    // Переворачиваем карточку
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    
    setCards(updatedCards);
    
    // Добавляем карточку к перевернутым
    const updatedFlippedCards = [...flippedCards, id];
    setFlippedCards(updatedFlippedCards);
    
    // Если перевернуто 2 карточки, проверяем на совпадение
    if (updatedFlippedCards.length === 2) {
      setIsChecking(true);
      setMoveCount(prev => prev + 1);
      
      setTimeout(() => {
        checkForMatch(updatedFlippedCards);
        setIsChecking(false);
      }, 800);
    }
  };
  
  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);
    
    if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
      // Совпадение - помечаем карточки как совпавшие
      setCards(cards.map(card => 
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card
      ));
    } else {
      // Не совпали - переворачиваем обратно
      setCards(cards.map(card => 
        card.id === firstId || card.id === secondId
          ? { ...card, isFlipped: false }
          : card
      ));
    }
    
    // Сбрасываем перевернутые карточки
    setFlippedCards([]);
  };
  
  // Определяем размер и расположение карточек в зависимости от сложности
  const getGridClass = () => {
    switch (pairsCount) {
      case 4: return "grid-cols-4";
      case 6: return "grid-cols-4";
      case 8: return "grid-cols-4";
      case 10: return "grid-cols-5";
      case 12: return "grid-cols-6";
      default: return "grid-cols-4";
    }
  };
  
  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-700 font-medium">
          Ходов: <span className="font-bold">{moveCount}</span>
        </div>
        <Button 
          variant="outline"
          size="sm"
          onClick={initializeGame}
          className="flex items-center space-x-1"
        >
          <Shuffle className="w-4 h-4" />
          <span>Перемешать</span>
        </Button>
      </div>
      
      <div className={`grid ${getGridClass()} gap-2 sm:gap-4`}>
        {cards.map(card => (
          <Card 
            key={card.id}
            className={`aspect-square flex items-center justify-center cursor-pointer text-3xl sm:text-4xl transition-all duration-300 ${
              card.isFlipped || card.isMatched 
                ? "bg-white" 
                : "bg-indigo-600 text-transparent hover:bg-indigo-700"
            } ${
              card.isMatched ? "opacity-70" : "opacity-100"
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "?"}
          </Card>
        ))}
      </div>
    </div>
  );
};
