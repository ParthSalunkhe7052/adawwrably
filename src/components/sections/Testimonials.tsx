import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials: Testimonial[] = [
  {
    text: "The quality of the Luffy Gear 5 shirt is insane. The print hasn't faded even after multiple washes. Best anime merch store in India!",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
    name: "Rahul Sharma",
    role: "Verified Buyer",
  },
  {
    text: "Got the Zoro Enma sword keychain and it's incredibly detailed. Shipping was super fast too. Highly recommended for One Piece fans.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    name: "Priya Patel",
    role: "Verified Buyer",
  },
  {
    text: "Adawwrably is my go-to for all my anime figures. The Kakashi figure I ordered was authentic and packaged perfectly.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    name: "Aryan Khan",
    role: "Collector",
  },
  {
    text: "I was looking for a good Gojo plushie everywhere and finally found it here. Customer support was very helpful with my sizing questions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    name: "Neha Gupta",
    role: "Verified Buyer",
  },
  {
    text: "Their Demon Slayer apparel collection is fire! The fabric is premium and comfortable. Will definitely buy again.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    name: "Vikram Singh",
    role: "Verified Buyer",
  },
  {
    text: "Finally an Indian store that sells high-quality anime merch without crazy import fees. The Akatsuki ring looks great.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    name: "Anjali Desai",
    role: "Verified Buyer",
  },
  {
    text: "The Saitama hoodie is so comfortable. I've gotten so many compliments on it already. Keep dropping new stuff!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    name: "Rohan Verma",
    role: "Verified Buyer",
  },
  {
    text: "I bought the Spirited Away wall art for my room and the colors are vibrant and beautiful. Really elevates the whole aesthetic.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    name: "Kavya Iyer",
    role: "Verified Buyer",
  },
  {
    text: "Amazing selection of Jujutsu Kaisen merch. The website was easy to use and my order arrived within 3 days.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150",
    name: "Karan Mehta",
    role: "Verified Buyer",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="relative py-14 md:py-[var(--spacing-section)] px-4 md:px-[var(--container-padding)] overflow-hidden">
      {/* Background Image with Blending */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-scroll md:bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/hero4.png')" }}
      />
      {/* Soft center feather to hide visible seam/artifact in the background artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 z-0 w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl"
      />
      {/* Blur strip at section top to smooth the transition from previous section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-20 bg-gradient-to-b from-background/85 via-background/45 to-transparent backdrop-blur-[2px]"
      />
      {/* Matching blur strip at section bottom for a balanced transition */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-20 bg-gradient-to-t from-background/85 via-background/45 to-transparent backdrop-blur-[2px]"
      />
      {/* Gradient overlay for seamless blending with other sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="max-w-[var(--container-max)] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex items-center justify-center max-w-[760px] mx-auto pt-8 pb-2 md:pt-12 md:pb-4"
        >
          <div className="inline-block backdrop-blur-[8px] bg-black/20 border border-white/10 px-5 py-3 md:px-8 md:py-4 rounded-3xl shadow-lg">
            <h2 className="font-['Bebas_Neue'] text-center uppercase leading-none tracking-[0.06em] text-white text-[clamp(2.35rem,5.8vw,4.25rem)] mb-0">
              What our fans say
            </h2>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 md:gap-6 mt-0 h-[400px] md:h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:flex" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:flex" duration={17} />
        </div>
      </div>
    </section>
  );
}