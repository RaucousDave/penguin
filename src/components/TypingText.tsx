import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
}

const TypingText = ({ text, speed = 60 }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = -1;
    setDisplayed('');
    const interval = setInterval(() => {
      index++;
      setDisplayed((prev) => prev + text.charAt(index));
      if (index >= text.length - 1) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className='font-body text-lg max-w-[90%] text-center text-purple-700'>
      {displayed}
    </p>
  );
};

export default TypingText;
