'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { jetbrainsMono } from '@/app/font';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Socials from '../Socials';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';

// Lazy load heavy libraries — these aren't needed for the initial paint
const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function Home() {
    const [isHovered, setIsHovered] = useState(false);
    const [lottieData, setLottieData] = useState<object | null>(null);

    // Load Lottie data lazily
    React.useEffect(() => {
        import('@/public/scroll-down.json').then(m => setLottieData(m.default));
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Pratya_Amrit_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    return (
        <div id='home' className="w-full max-w-4xl flex flex-col items-center justify-center px-6 pt-20 pb-65 sm:min-h-screen relative">
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 w-full max-w-5xl">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl sm:text-6xl font-bold ">
                            Hey, I&apos;m <span className='text-[#e8390d]'>Pratya</span>
                        </h1>
                        <span
                            className="text-4xl sm:text-5xl"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                transformOrigin: '70% 70%',
                                animation: isHovered ? 'wave 1.2s ease-in-out infinite' : 'none',
                                display: 'inline-block',
                            }}
                        >
                            👋
                        </span>
                    </div>
                    <p className={` ${jetbrainsMono.className} flex items-center mt-4 text-[#dd431d] gap-2 text-sm sm:text-lg text-right`}> <MapPin /> Gurugram, Haryana, India</p>

                    <span className="tailwind-wrapper mt-4 text-lg sm:text-3xl font-medium block text-left text-zinc-800 dark:text-zinc-200">
                        <Typewriter
                            options={{
                                strings: ['FULL STACK DEVELOPER', 'CSE STUDENT','PROBLEM SOLVER','Data Structures & Algorithms Enthusiast'],
                                autoStart: true,
                                loop: true,
                                delay: 20,
                                deleteSpeed: 5,
                            }}
                        />
                    </span>

                    <div className="flex flex-wrap gap-4 items-center">
                        <Socials />
                        <InteractiveHoverButton onClick={handleDownload} />
                    </div>


                    <p
                        className={`mt-4 text-sm sm:text-lg dark:text-zinc-500 text-justify leading-relaxed ${jetbrainsMono.className}`}
                    >
                        B.E CSE student at Chandigarh University MERN stack developer building practical projects and improving problem-solving with DSA in Java.
                    </p>
                </div>

                {/* Image Section */}
                <div
                    className="w-48 h-48 sm:w-70 sm:h-70 relative shrink-0 rounded-full overflow-hidden transition-all duration-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Base image — priority for LCP */}
                    <Image
                        src="/Pratya.webp"
                        alt="Pratya"
                        fill
                        priority
                        sizes="(max-width: 640px) 192px, 280px"
                        className={`object-cover rounded-full transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"
                            }`}
                    />

                    {/* Hover image */}
                    <Image
                        src="/Pratya2.webp"
                        alt="Pratya Hover"
                        fill
                        sizes="(max-width: 640px) 192px, 280px"
                        className={`object-cover rounded-full absolute top-0 left-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>

            </div>

            {/* Scroll Down Animation — lazy loaded */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 z-10 hidden md:block">
                {lottieData && <Lottie animationData={lottieData} loop />}
            </div>
        </div>
    );
}
