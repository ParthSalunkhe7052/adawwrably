import { useEffect, useRef, useState } from 'react';

const startFrame = 51; // Start from thumb_0051.jpg
const endFrame = 192; // Ends at thumb_0192.jpg
const frameCount = endFrame - startFrame + 1;

const currentFrame = (index: number) => {
  const actualIndex = index + startFrame - 1;
  return `/sequence/thumb_${actualIndex.toString().padStart(4, '0')}.jpg`;
};

export function ScrollVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const imgArray: HTMLImageElement[] = [];
    let isMounted = true;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      
      img.onload = () => {
        if (!isMounted) return;
        if (i === 1) {
          setFirstFrameLoaded(true);
        }
        // Dispatch a custom event to notify that an image loaded
        window.dispatchEvent(new CustomEvent('video-frame-loaded', { detail: i - 1 }));
      };
      
      imgArray.push(img);
    }
    imagesRef.current = imgArray;

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!firstFrameLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Optimize for opaque background
    if (!context) return;

    let ticking = false;
    let lastDrawnIndex = -1;
    let lastWidth = -1;
    let lastHeight = -1;

    const drawFrame = (frameIndex: number, forceDraw = false) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);

      // Only resize internal canvas buffer if dimensions changed
      if (width !== lastWidth || height !== lastHeight) {
        canvas.width = width;
        canvas.height = height;
        lastWidth = width;
        lastHeight = height;
        forceDraw = true; // force a redraw if we resized the canvas
      }

      if (frameIndex === lastDrawnIndex && !forceDraw) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      // Mimic object-fit: cover
      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnIndex = frameIndex;
    };

    const updateRender = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const maxScrollTop =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollFraction = maxScrollTop === 0 ? 0 : scrollTop / maxScrollTop;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      drawFrame(frameIndex);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateRender);
        ticking = true;
      }
    };

    const onFrameLoaded = (e: Event) => {
      const customEvent = e as CustomEvent;
      const loadedIndex = customEvent.detail;
      
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollFraction = maxScrollTop === 0 ? 0 : scrollTop / maxScrollTop;
      const targetIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));

      // If the newly loaded frame is the one we're currently trying to view, force a render
      if (loadedIndex === targetIndex) {
        if (!ticking) {
          window.requestAnimationFrame(updateRender);
          ticking = true;
        }
      }
    };

    const onResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          const maxScrollTop =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollFraction = maxScrollTop === 0 ? 0 : scrollTop / maxScrollTop;

          const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
          );
          
          drawFrame(frameIndex, true);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('video-frame-loaded', onFrameLoaded);

    // Initial setup
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('video-frame-loaded', onFrameLoaded);
    };
  }, [firstFrameLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none opacity-100"
    />
  );
}
