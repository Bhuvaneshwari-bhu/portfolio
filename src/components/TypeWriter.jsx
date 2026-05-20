import { useState, useEffect } from 'react';

const WORDS = ['React Developer', 'Full Stack Engineer', 'AI Enthusiast', 'Open Source Contributor'];

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
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (deleting && charIndex >= 0) {
      setText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    }

    if (!deleting && charIndex === current.length + 1) {
      timeout = setTimeout(() => setDeleting(true), 1800);
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
