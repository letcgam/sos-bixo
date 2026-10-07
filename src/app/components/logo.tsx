import { Freckle_Face, Oswald } from "next/font/google";
import { AnimatedLogoIcon } from './animated-logo-icon';

const freckleFace = Freckle_Face({
    variable: "--font-freckle-face",
    subsets: ["latin"],
    weight: "400", // Freckle Face possui apenas o peso 400
});

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"],
});

interface LogoProps {
    readonly isSquare?: boolean;
    readonly turnOIntoIcon?: boolean;
}

export function Logo({ isSquare = false, turnOIntoIcon = false }: LogoProps) {
    return <h1 className={`text-3xl font-semibold flex items-baseline ${isSquare ? "flex-col items-center leading-6" : "gap-1"}`}>
        <span className={`${oswald.className} text-slate-900 dark:text-slate-300`}>
            SOS
        </span>

        <span className={`${freckleFace.className} ${isSquare ? "text-5xl" : "text-4xl"} text-indigo-600 dark:text-indigo-400 flex items-baseline`}>
            Bix{turnOIntoIcon ? <AnimatedLogoIcon /> : "o"}s
        </span>
    </h1>;
}