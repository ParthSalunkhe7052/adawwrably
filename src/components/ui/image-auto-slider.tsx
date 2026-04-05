'use client';
import { collections } from '@/data/products';
import { motion } from 'motion/react';

export const ImageAutoSlider = () => {
  // Duplicate images for seamless loop
  const duplicatedCollections = [...collections, ...collections, ...collections];

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center py-20 bg-transparent">
      {/* Scroll container */}
      <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div 
            animate={{
                translateX: "-33.33%",
            }}
            transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
            }}
            className="flex gap-8 w-max px-4"
        >
          {duplicatedCollections.map((col, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 w-64 h-[400px] md:w-80 md:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-card shadow-2xl cursor-pointer"
            >
              {/* Background Image - Filling the entire box */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Text - Floating in the middle-bottom area */}
              <div className="absolute inset-x-0 bottom-12 flex flex-col items-center justify-center p-6 transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="text-3xl md:text-4xl font-display uppercase tracking-[0.1em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)] text-center">
                  {col.name}
                </h3>
                <div className="h-[3px] w-0 bg-primary mt-3 transition-all duration-500 group-hover:w-24 rounded-full" />
                <p className="text-white/60 text-xs font-mono mt-4 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore Now
                </p>
              </div>

              {/* Subtle 3D Reflection Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
