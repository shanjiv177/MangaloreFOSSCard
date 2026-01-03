
import React, { useRef, useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const BadgeCanvas = ({ name, description, userImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Load images
    const templateImg = new Image();
    const userImg = new Image();

    templateImg.src = '/assets/template.jpg';
    userImg.src = userImage || '/assets/default_tiger.png';

    Promise.all([
      new Promise(resolve => templateImg.onload = resolve),
      new Promise(resolve => userImg.onload = resolve)
    ]).then(() => {
        canvas.width = templateImg.width;
        canvas.height = templateImg.height;

        ctx.drawImage(templateImg, 0, 0);

        
        const photoX = 225;
        const photoY = 460;
        const photoSize = 200; 
        
        const textX = 450;
        const nameY = 510;
        const descY = 550;
        ctx.save();
        ctx.beginPath();

        roundRect(ctx, photoX, photoY, photoSize, photoSize, 20);
        ctx.closePath();
        ctx.clip();
        
        const aspect = userImg.width / userImg.height;
        let drawW = photoSize;
        let drawH = photoSize;
        let dx = photoX;
        let dy = photoY;
        
        if (aspect > 1) {
            drawW = photoSize * aspect;
            dx = photoX - (drawW - photoSize) / 2;
        } else {
            drawH = photoSize / aspect;
            dy = photoY - (drawH - photoSize) / 2;
        }

        ctx.drawImage(userImg, dx, dy, drawW, drawH);
        ctx.restore();

        ctx.fillStyle = '#111827';
        ctx.textAlign = 'left'; 

        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.fillText(name || 'Your Name', textX, nameY);

        ctx.font = 'normal 24px Inter, sans-serif';
        ctx.fillStyle = '#6B7280';
        wrapText(ctx, description || 'Frontend Developer @ FOSS', textX, descY, 400, 40);
    }).catch(err => {
        console.error("Failed to load images", err);
    });

  }, [name, description, userImage]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/jpeg', 1);
    const link = document.createElement('a');
    link.download = `mangalorefoss-badge-${name.replace(/\s+/g, '-').toLowerCase() || 'badge'}.jpg`;
    link.href = url;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full max-w-md aspect-square shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-base overflow-hidden bg-white border-2 border-border">
         <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
         />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button 
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-main text-black font-bold py-3 px-6 rounded-base border-2 border-border shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none flex-1"
        >
            <Download size={20} />
            Download Badge
        </button>
        <button 
        onClick={() => {
            handleDownload();
            const text = encodeURIComponent("I'm attending MangaloreFOSS at @surathkal_nitk on January 17-18 2026. \n Check out my badge for MangaloreFOSS!🚀\n @FOSSMangalore @FOSSUnited \n");
            const url = "https://x.com/intent/tweet?text=" + text + "&url=" + encodeURIComponent("https://fossunited.org/mangalorefoss") + "&hashtags=MangaloreFOSS2026,fossunited";
            window.open(url, '_blank');
        }}
        className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-base border-2 border-border shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none w-full sm:w-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share on X
      </button>

      <button 
        onClick={() => {
            handleDownload();
            const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://fossunited.org/mangalorefoss");
            window.open(url, '_blank');
        }}
        className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold py-3 px-6 rounded-base border-2 border-border shadow-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none w-full sm:w-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        Share on LinkedIn
      </button>
      </div>

      
    </div>
  );
};

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for(let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
}

export default BadgeCanvas;
