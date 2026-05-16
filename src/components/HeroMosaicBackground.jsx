import Image from "next/image";

export default function HeroMosaicBackground({ images }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-slate-50/90 dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-900/90 z-10" />

      {/* Mosaic grid of blurred images */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-20">
        {images.slice(0, 3).map((image, idx) => (
          <div key={idx} className="relative overflow-hidden">
            <div className="absolute inset-0 blur-3xl scale-110">
              <Image
                src={image}
                alt="Background"
                fill
                className="object-cover"
                priority
                quality={30}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
