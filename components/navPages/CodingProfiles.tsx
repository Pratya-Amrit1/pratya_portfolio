'use client';

import React, { useEffect, useState } from 'react';
import { jetbrainsMono } from '@/app/font';
import { SiLeetcode, SiCodeforces, SiCodingninjas, SiGeeksforgeeks, SiHackerrank } from 'react-icons/si';
import { Code2, Trophy, Target, TrendingUp, ExternalLink } from 'lucide-react';

interface PlatformStat {
    label: string;
    value: string;
}

interface CodingPlatform {
    name: string;
    icon: React.ReactNode;
    iconColor: string;
    gradient: string;
    glowColor: string;
    profileUrl: string;
    rating?: string;
    maxRating?: string;
    stats: PlatformStat[];
    badge?: string;
}

const codingPlatforms: CodingPlatform[] = [
    {
        name: 'LeetCode',
        icon: <SiLeetcode />,
        iconColor: '#FFA116',
        gradient: 'from-[#FFA116]/20 via-transparent to-transparent',
        glowColor: 'rgba(255, 161, 22, 0.3)',
        profileUrl: 'https://leetcode.com/u/pratya_amrit/',
        rating: '1650+',
        stats: [
            { label: 'Problems Solved', value: '400+' },
            { label: 'Contest Rating', value: '1650+' },
            { label: 'Top %', value: 'Top 15%' },
        ],

    },
    {
        name: 'Codeforces',
        icon: <SiCodeforces />,
        iconColor: '#1F8ACB',
        gradient: 'from-[#1F8ACB]/20 via-transparent to-transparent',
        glowColor: 'rgba(31, 138, 203, 0.3)',
        profileUrl: 'https://codeforces.com/profile/karma_guy',
        rating: '1200+',
        stats: [
            { label: 'Max Rating', value: '1200+' },
            { label: 'Rank', value: 'Specialist' },
        ],
        badge: 'Specialist',
    },
    // {
    //     name: 'Codestudio',
    //     icon: <SiCodingninjas />,
    //     iconColor: '#F6820D',
    //     gradient: 'from-[#F6820D]/20 via-transparent to-transparent',
    //     glowColor: 'rgba(246, 130, 13, 0.3)',
    //     profileUrl: 'https://www.naukri.com/code360/profile/pratyaamrit',
    //     stats: [
    //         { label: 'Problems Solved', value: '100+' },
    //         { label: 'Level', value: 'Ninja' },
    //     ],
    // },
    // {
    //     name: 'GeeksforGeeks',
    //     icon: <SiGeeksforgeeks />,
    //     iconColor: '#2F8D46',
    //     gradient: 'from-[#2F8D46]/20 via-transparent to-transparent',
    //     glowColor: 'rgba(47, 141, 70, 0.3)',
    //     profileUrl: 'https://www.geeksforgeeks.org/user/pratyaamrit/',
    //     stats: [
    //         { label: 'Problems Solved', value: '100+' },
    //         { label: 'Coding Score', value: '500+' },
    //         { label: 'Institute Rank', value: 'Top 10' },
    //     ],
    // },
    {
        name: 'HackerRank',
        icon: <SiHackerrank />,
        iconColor: '#00EA64',
        gradient: 'from-[#00EA64]/20 via-transparent to-transparent',
        glowColor: 'rgba(0, 234, 100, 0.3)',
        profileUrl: 'https://www.hackerrank.com/profile/23BCS12148',
        stats: [
            { label: 'Badges', value: '5+ Gold' },
            { label: 'Stars', value: '5★' },
        ],
        badge: '5★',
    },
];

function PlatformCard({ platform }: { platform: CodingPlatform }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/5 
                    bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl
                    transition-all duration-500 ease-out
                    hover:border-white/20 dark:hover:border-white/10
                    hover:-translate-y-2 hover:scale-[1.02]`}
                style={{
                    boxShadow: isHovered
                        ? `0 20px 60px -15px ${platform.glowColor}, 0 0 30px -10px ${platform.glowColor}`
                        : '0 4px 20px rgba(0,0,0,0.1)',
                }}
            >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Animated border glow */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(135deg, ${platform.iconColor}20, transparent 50%, ${platform.iconColor}10)`,
                    }}
                />

                <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div
                                className="text-3xl sm:text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                style={{ color: platform.iconColor }}
                            >
                                {platform.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-800 dark:text-white">
                                    {platform.name}
                                </h3>
                                {platform.badge && (
                                    <span
                                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                        style={{
                                            backgroundColor: `${platform.iconColor}20`,
                                            color: platform.iconColor,
                                        }}
                                    >
                                        {platform.badge}
                                    </span>
                                )}
                            </div>
                        </div>
                        <ExternalLink
                            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </div>

                    {/* Stats */}
                    <div className="space-y-3">
                        {platform.stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between py-2 border-b border-zinc-200/50 dark:border-white/5 last:border-0"
                            >
                                <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                                    {stat.label}
                                </span>
                                <span
                                    className="text-sm sm:text-base font-bold transition-colors duration-300"
                                    style={{
                                        color: isHovered ? platform.iconColor : undefined,
                                    }}
                                >
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
}

export default function CodingProfiles() {
    const [totalSolved, setTotalSolved] = useState(0);
    const [peakRating, setPeakRating] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = React.useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    const animateValue = (
                        target: number,
                        setter: React.Dispatch<React.SetStateAction<number>>,
                        duration: number
                    ) => {
                        const increment = target / (duration / 16);
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                setter(target);
                                clearInterval(timer);
                            } else {
                                setter(Math.floor(current));
                            }
                        }, 16);

                        return () => clearInterval(timer);
                    };

                    animateValue(500, setTotalSolved, 2000);
                    animateValue(1650, setPeakRating, 2000);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section
            ref={sectionRef}
            id="coding"
            className={`${jetbrainsMono.className} flex flex-col gap-12 items-center justify-center px-4 py-20 w-full max-w-4xl`}
        >
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2 text-[#e8390d]">
                    <Code2 className="w-5 h-5" />
                    <span className="text-sm font-medium tracking-wider uppercase">
                        Competitive Programming
                    </span>
                    <Code2 className="w-5 h-5" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold">
                    Coding Profiles
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg">
                    Grinding algorithms and data structures across multiple platforms
                </p>
            </div>

            {/* Summary Stats Bar */}
            <div className="w-full grid grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-xl border border-white/10 dark:border-white/5 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6 text-center group hover:border-[#e8390d]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e8390d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Target className="w-4 h-4 text-[#e8390d]" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-[#e8390d]">
                            {totalSolved}+
                        </p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Total Problems
                        </p>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-white/10 dark:border-white/5 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6 text-center group hover:border-[#FFA116]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFA116]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Trophy className="w-4 h-4 text-[#FFA116]" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-[#FFA116]">
                            {peakRating}+
                        </p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Peak Rating
                        </p>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-white/10 dark:border-white/5 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6 text-center group hover:border-[#00EA64]/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00EA64]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-[#00EA64]" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-[#00EA64]">
                            5+
                        </p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Platforms Active
                        </p>
                    </div>
                </div>
            </div>

            {/* Platform Cards Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {codingPlatforms.map((platform, index) => (
                    <PlatformCard key={index} platform={platform} />
                ))}
            </div>
        </section>
    );
}
