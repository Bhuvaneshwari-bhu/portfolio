import { useState, useEffect } from 'react';

const WORDS = ['MERN Stack Developer', 'Frontend Developer', 'AI Enthusiast', 'Problem Solver'];

export default function TypeWriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      setText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 75);
    } else if (deleting && charIndex >= 0) {
      setText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 38);
    }

    if (!deleting && charIndex === current.length + 1) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    }

    if (deleting && charIndex === -1) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-pulse text-brand-400">|</span>
    </span>
  );
}
