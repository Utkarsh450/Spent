import { useEffect, useState } from "react"

const Pikachuloader: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-screen h-screen bg-[#0f1115] flex items-center justify-center overflow-hidden relative">

      {/* Ambient warmth */}
      <div className="absolute inset-0 bg-linear-to-b from-yellow-400/5 via-transparent to-transparent" />

      <div
        className={`relative flex flex-col items-center gap-6 transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        {/* Video Hero */}
        <div className="relative">
          {/* Soft glow */}
          <div className="absolute inset-0 rounded-full bg-yellow-300/20 blur-3xl animate-pulse" />

          <div className="relative w-52 h-52 rounded-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/Pikachu.mp4"
            />
          </div>
        </div>

        {/* Friendly copy */}
        <p className="text-neutral-300 text-sm tracking-wide">
          Getting everything ready…
        </p>

        {/* Calm thinking dots */}
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80 animate-[fade_1.4s_ease-in-out_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80 animate-[fade_1.4s_ease-in-out_infinite_200ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80 animate-[fade_1.4s_ease-in-out_infinite_400ms]" />
        </div>
      </div>

      <style>
        {`
          @keyframes fade {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default Pikachuloader
