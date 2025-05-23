"use client";
import React, { useEffect, useState, useCallback } from "react";

const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz!@#$%&~-_+=;:<>";

export function RandomizedText({ texts, loopDelay = 2000 }) {
  const [animatedText, setAnimatedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const getRandomChar = useCallback(
    () =>
      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    []
  );

  const animateText = useCallback(
    async (text) => {
      const duration = 50;
      const revealDuration = 80;
      const initialRandomDuration = 300;

      const generateRandomText = () =>
        text
          .split("")
          .map(() => getRandomChar())
          .join("");

      setAnimatedText(generateRandomText());

      const endTime = Date.now() + initialRandomDuration;
      while (Date.now() < endTime) {
        await new Promise((resolve) => setTimeout(resolve, duration));
        setAnimatedText(generateRandomText());
      }

      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, revealDuration));
        setAnimatedText(
          (prevText) =>
            text.slice(0, i + 1) +
            prevText
              .slice(i + 1)
              .split("")
              .map(() => getRandomChar())
              .join("")
        );
      }
    },
    [getRandomChar]
  );

  useEffect(() => {
    animateText(texts[currentIndex]);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, loopDelay);

    return () => clearInterval(interval);
  }, [currentIndex, texts, loopDelay, animateText]);

  return <div className="relative inline-block">{animatedText}</div>;
}
