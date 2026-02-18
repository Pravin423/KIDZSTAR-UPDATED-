import { motion, useTransform } from 'framer-motion';

const ScrollRevealText = ({ content, progress, range }) => {
    const words = content.split(" ");
    const rangeStart = range[0];
    const rangeEnd = range[1];
    const rangeSpan = rangeEnd - rangeStart;

    return (
        <p className="flex flex-wrap max-w-7xl mx-auto justify-center text-center font-bold px-4">
            {words.map((word, i) => {
                const step = 1 / words.length;
                const start = i * step;
                const end = start + step;

                // Calculate the specific scroll trigger points for this word
                const wordStart = rangeStart + (start * rangeSpan);
                const wordEnd = rangeStart + (end * rangeSpan);

                return (
                    <Word
                        key={i}
                        word={word}
                        progress={progress}
                        range={[wordStart, wordEnd]}
                    />
                )
            })}
        </p>
    )
}

const Word = ({ word, progress, range }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="mr-[1.5vw] md:mr-[0.8vw] text-3xl md:text-5xl lg:text-[60px] leading-tight text-black"
        >
            {word}
        </motion.span>
    )
}

export default ScrollRevealText;
