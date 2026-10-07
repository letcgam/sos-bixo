'use client';

import { useEffect, useState } from 'react';
import {
    MessageCircleQuestionMark,
    Backpack,
    Presentation,
    NotebookPen,
    Smartphone,
} from 'lucide-react';

const logoIcons = [
    MessageCircleQuestionMark,
    Backpack,
    Presentation,
    NotebookPen,
    Smartphone,
];

export function AnimatedLogoIcon() {
    const [iconIndex, setIconIndex] = useState(0);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setIconIndex((currentIndex) => (currentIndex + 1) % logoIcons.length);
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    const Icon = logoIcons[iconIndex];

    return <Icon aria-hidden="true" strokeWidth={3} className="size-[0.56em] shrink-0" />;
}