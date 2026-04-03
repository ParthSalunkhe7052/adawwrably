interface CollectionCardProps {
  name: string;
  count: number;
  index: number;
  image?: string;
}

export function CollectionCard({ name, image }: CollectionCardProps) {
  return (
    <a
      href={`#${name.toLowerCase().replace(/\s+/g, '-')}`}
      className="group perspective-[1200px] cursor-pointer flex flex-col items-center"
    >
      {/* 3D Container */}
      <div className="relative w-full aspect-square transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(15deg)_rotateY(-10deg)]">
        
        {/* Glow Shadow Drop */}
        <div className="absolute -bottom-6 left-1/2 w-4/5 -translate-x-1/2 h-8 bg-primary/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card Body - Glassmorphism */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md overflow-hidden flex items-center justify-center p-6 shadow-2xl">
          
          {/* Subtle Glow inside */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Product Image */}
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-4" 
          />
        </div>
      </div>
      
      {/* Name Below */}
      <div className="mt-8 flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="text-xl md:text-2xl font-display tracking-[0.15em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {name}
        </h3>
        <div className="h-[2px] w-0 bg-primary mt-2 transition-all duration-500 group-hover:w-full rounded-full" />
      </div>
    </a>
  );
}
