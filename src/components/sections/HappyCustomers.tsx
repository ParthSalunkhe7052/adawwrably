import { motion } from 'motion/react';
import { SectionHeading } from '@/components/shared/SectionHeading';

const customerImages = [
  "/customers/image.png",
  "/customers/image_copy.png",
  "/customers/image_copy_2.png",
  "/customers/image_copy_3.png",
  "/customers/image_copy_4.png",
  "/customers/image_copy_5.png",
];

export function HappyCustomers() {
  // Duplicate for seamless loop
  const duplicatedImages = [...customerImages, ...customerImages, ...customerImages];

  return (
    <section id="happy-customers" className="relative py-14 md:py-24 px-0 overflow-hidden bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 mb-12">
        <SectionHeading
          title="Happy Customers"
          subtitle="Join thousands of fans rocking our anime merch"
        />
      </div>

      <div className="relative w-full overflow-hidden flex items-center justify-center py-10 z-10">
        <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
              animate={{
                  translateX: "-33.33%",
              }}
              transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
              }}
              className="flex gap-6 w-max px-4"
          >
            {duplicatedImages.map((imgSrc, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[280px] h-[350px] md:w-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-white/20 bg-black/50 shadow-xl cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={imgSrc}
                  alt="Happy Customer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-500 pointer-events-none" />

                {/* Aesthetic Glassmorphism Frame overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
