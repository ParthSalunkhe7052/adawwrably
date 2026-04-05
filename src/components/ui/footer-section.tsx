'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Camera, Play, MessageCircle, Share2 } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Shop',
		links: [
			{ title: 'Keychains', href: '#latest-drops' },
			{ title: 'Figures', href: '#latest-drops' },
			{ title: 'Necklaces', href: '#latest-drops' },
			{ title: 'Plushies', href: '#latest-drops' },
		],
	},
	{
		label: 'Support',
		links: [
			{ title: 'FAQs', href: '#' },
			{ title: 'Track Order', href: '#' },
			{ title: 'Returns Policy', href: '#' },
			{ title: 'Privacy Policy', href: '#' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#' },
			{ title: 'Contact', href: '#contact' },
			{ title: 'Brand Story', href: '#' },
		],
	},
	{
		label: 'Connect With Us',
		links: [
			{ title: 'Instagram', href: 'https://www.instagram.com/adawwrably', icon: Camera },
			{ title: 'YouTube', href: '#', icon: Play },
			{ title: 'WhatsApp', href: '#', icon: MessageCircle },
			{ title: 'Facebook', href: '#', icon: Share2 },
		],
	},
];

export function FooterSection() {
	return (
		<footer className="relative w-full mx-auto flex flex-col items-center justify-center border-t border-white/10 bg-black px-6 py-12 lg:py-20 overflow-hidden">
			<div className="grid w-full max-w-[1400px] gap-12 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="flex flex-col items-start gap-6">
                    <div className="flex items-center gap-2">
					    <img src="/Logo.png" alt="Adawwrably" className="h-10 w-auto" />
                    </div>
                    <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
						India's biggest anime merchandise destination. Crafting quality collectibles for the culture since 2026.
					</p>
					<p className="text-muted-foreground/50 text-xs">
						© {new Date().getFullYear()} Adawwrably. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="flex flex-col gap-5">
								<h3 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-bold">{section.label}</h3>
								<ul className="text-muted-foreground flex flex-col gap-3 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-primary inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-2 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: 10, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
