import {useState, useEffect} from "react";
import Chapter from './components/Chapter.tsx';
import yourMan from './components/music/Your Man.mp3'
import {AnimatePresence, motion} from 'framer-motion';


  const chapters = [
    {
      number: 1,
    title: "Where it all began",
    content: "This is where our journey begins... A story that will unfold, chapter by chapter. Let's take this step by step."
  },
  {
    number: 2,
    title: "Awkward but Curious",
    content: "Don't know if you know this, but I was so nervous and cautious of what I should say and I felt like you could tell as well, I didn't exactly know the age gap, so I assumed that you were around Ese's age, so because of that I didn't exactly know how to relate to you"
  }, 
  {
    number: 3,
    title: "A Wednesday to Remember",
    content: "I have no idea how it happened up till now, it just seems like a mystery to me, I sha remember it being on a Wednesday, that day we were supposed to fast and you were supposed to go out, but you ended up not going at all because Daddy said there was something to handle. You saw me with my laptop and decided to tag along with yours. I don't even know how you managed to do it, but you made me feel more comfortable than my own cousins that I've been with since. From that day, I knew there was something good coming out of this"
  },
  {
    number: 4,
    title: "The Realization",
    content: "I had been watching you, but I tried to kill those feelings — after all, I had once said I had something for your sister. But on one faithful Saturday, everything shifted. Me and Stephanie were headed to rehearsals, and I was just listening to music. Then you sang 'Pretty Little Fears'. That moment? That moment hit me different. I realized maybe… I had been looking at the wrong sister all along."
  },
  {
    number: 5,
    title: "Closer than ever",
    content: "You showed me those texts with your friends… That’s when I knew — you liked me. But I didn’t want to assume until I heard it from you directly. Around that time, we became very close — staying up past 1 a.m., supposedly working. Even Stephanie and Pearl were suspecting I liked you. Spoiler alert: they weren’t wrong."
  },
  {
    number: 6,
    title: "The Hardest Part",
    content: "This was the hardest part of our story. That whole confrontation with Stephanie? Yeah, it shook things up. You, being the mature one, said we couldn’t work out. I was almost convinced… ready to give up. But then I texted Mr. 'Rome wasn’t built in a city', and he told me that if I really like you, I should fight for you. And I wasn’t ready to let you go."
  },
  {
    number: 7,
    title: "Waiting and Wondering",
    content: "Basically, after all the convincing we finally did work out, but some people didn't want to date until they moved out. So I waited, I was happy enough knowing that you liked me and the possibility of us dating after you move out, but boy oh boy, did this period also come with drama as well, I legit thought that we wouldn't work from here on, because it was as if I always found one new way to make you angry and I felt really bad and I actually thought that it was unfair to force my thoughts on you even when you were skeptical about this relationship in the first place. But with the power of saying sorry repeatedly and your forgiving spirit we made it out of this phase"
  },
  {
    number: 8,
    title: "The Beginning of Us",
    content: "I couldn't believe we started dating and up till now it all seems so unreal to me that you're my girlfriend, I just want to show you off to my family and friends because I know that I've found a gem, my little diamond in the rough"
  },
  {
    number: 9,
    title: "Forever, Even From Afar",
    content: "I love you so much Penguin, even when you move out, just know that I'd always make time for you, so never hesitate to call me, text me or tell me anything at all."
  }
];

const App = () => {
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("currentChapter")
    return saved  ? parseInt(saved):0
  });


  useEffect(() => {
    localStorage.setItem("currentChapter", current.toString())
  }, [current])
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = () => {
    if (current < chapters.length - 1) {
      setDirection("right");
      setCurrent(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setDirection("left");
      setCurrent(prev => prev - 1);
    }
  };

  const variants = {
    initial: (dir: string) => ({
      x: dir === "right" ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: string) => ({
      x: dir === "right" ? -100 : 100,
      opacity: 0,
    }),
  };
const [isPlaying, setIsPlaying] = useState(true);
const audio = new Audio(yourMan);

useEffect(() => {
  audio.loop = true;
  isPlaying ? audio.play() : audio.pause();

  // Clean up audio when component unmounts
  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, [isPlaying]);

  return (
    <div className='bg-purple-200 p-4 md:p-0'>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className='flex flex-col h-screen justify-center items-center max-w-full px-4'>
            {/* Optional: Chapter Heading */}
            <motion.h2
              key={`heading-${current}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl text-purple-800 font-bold mb-6 font-body text-center"
            >
              📖 Chapter {chapters[current].number} of {chapters.length} – {chapters[current].title}
            </motion.h2>

            <Chapter
              title={chapters[current].title}
              content={chapters[current].content}
            />

            <div className='flex flex-col md:flex-row gap-4 mt-6'>
              {current > 0 && (
                <NavButton text="Previous Chapter" onClick={handlePrev} />
              )}
              {current < chapters.length - 1 && (
                <NavButton text="Next Chapter" onClick={handleNext} />
              )}
            </div>

  <button
  onClick={() => setIsPlaying(!isPlaying)}
  className="mt-[5rem] text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-lg font-body transition-all duration-300 "
>
  {isPlaying ? "Pause Music 🔇" : "Play Music 🎶"}
</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const NavButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className='text-xl font-body text-white px-6 py-1.5 bg-pink-400 hover:bg-pink-500 transition-all duration-300 ease-in rounded-xl'
  >
    {text}
  </button>


);

export default App;