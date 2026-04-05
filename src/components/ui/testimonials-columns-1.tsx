"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type Testimonial = 
  | { type: 'text', text: string, image: string, name: string, role: string }
  | { type: 'image', src: string, alt: string };

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={cn(props.className)}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map((testimonial, i) => {
                if (testimonial.type === 'text') {
                  return (
                    <div className="p-8 rounded-2xl border border-white/25 bg-slate-950 shadow-xl shadow-black/50 max-w-xs w-full" key={i}>
                      <div className="text-sm text-white leading-relaxed">{testimonial.text}</div>
                      <div className="flex items-center gap-3 mt-6">
                        <img
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-10 w-10 rounded-full object-cover border border-white/30"
                        />
                        <div className="flex flex-col">
                          <div className="font-medium text-sm text-white tracking-tight leading-5">{testimonial.name}</div>
                          <div className="text-xs text-slate-200 leading-5 tracking-tight">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (testimonial.type === 'image') {
                  return (
                    <div className="rounded-2xl border border-white/25 bg-slate-950 shadow-xl shadow-black/50 max-w-xs w-full overflow-hidden" key={i}>
                      <img 
                        src={testimonial.src} 
                        alt={testimonial.alt} 
                        className="w-full h-auto object-cover aspect-[4/5]"
                      />
                    </div>
                  );
                }

                return null;
              })}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
