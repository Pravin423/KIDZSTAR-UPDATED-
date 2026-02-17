
import { motion, useScroll, useTransform } from "framer-motion";

export default function ZoomScroll({
    children,
    className,
    scrollPoints = [0, 1],
    scaleValues = [1, 50],
    xValues,
    opacityValues
}) {
    const { scrollYProgress } = useScroll();

    const scale = useTransform(scrollYProgress, scrollPoints, scaleValues);

    const x = useTransform(
        scrollYProgress,
        scrollPoints,
        xValues || Array(scrollPoints.length).fill("0%")
    );

    // Default opacity: Fade out at the last point if not specified
    const defaultOpacity = Array(scrollPoints.length).fill(1);
    defaultOpacity[defaultOpacity.length - 1] = 0;

    const opacity = useTransform(
        scrollYProgress,
        scrollPoints,
        opacityValues || defaultOpacity
    );

    return (
        <motion.div
            style={{ scale, x, opacity }}
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none ${className}`}
        >
            {children}
        </motion.div>
    );
}
