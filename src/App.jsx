
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const categories = {
  animals: [{ en: "Monkey", ru: "Обезьяна" }, { en: "Mouse", ru: "Мышь" }],
  colors: [{ en: "Red", ru: "Красный" }, { en: "Blue", ru: "Синий" }],
  misc: [{ en: "Sun", ru: "Солнце" }, { en: "Water", ru: "Вода" }]
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  const voices = speechSynthesis.getVoices();
  const usVoice = voices.find(v => v.lang === "en-US");
  if (usVoice) utterance.voice = usVoice;
  speechSynthesis.speak(utterance);
};

export default function AnimalGame() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setWords(categories[selectedCategory]);
      setCurrentIndex(0);
    }
  }, [selectedCategory]);

  const currentWord = words[currentIndex];

  if (!selectedCategory) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 text-center px-6">
        <h1 className="text-3xl font-bold mb-6">🎯 Choose a category</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className="text-lg font-semibold bg-white shadow-lg hover:bg-blue-100 px-6 py-4 rounded-2xl border border-blue-400"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <motion.h1 className="text-2xl font-bold mb-4">🐾 Word Game</motion.h1>
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl space-y-4">
        <div>
          <p className="text-4xl font-bold min-h-[40vh] flex items-center justify-center">
            {currentWord.en}
          </p>
          {showTranslation && (
            <p className="text-4xl font-bold text-blue-600">{currentWord.ru}</p>
          )}
        </div>

        <button
          onClick={() => {
            speak(currentWord.en);
            setShowTranslation(true);
          }}
          className="bg-blue-500 text-white text-lg font-semibold px-4 py-3 rounded-full"
        >
          🔊 Show
        </button>
      </div>
    </div>
  );
}
