import { Freckle_Face } from "next/font/google";

const freckleFace = Freckle_Face({
    variable: "--font-freckle-face",
    subsets: ["latin"],
    weight: "400", // Freckle Face possui apenas o peso 400
});

export function Logo() {
    return <h1 className="text-3xl font-semibold">
        <span>
            SOS
        </span>

        <span className={`${freckleFace.className} text-indigo-600 dark:text-indigo-400`}>
            Bixos
        </span>
    </h1>;
}