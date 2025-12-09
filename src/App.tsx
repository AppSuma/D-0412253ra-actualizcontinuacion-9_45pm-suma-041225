import { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo animado: corazón + onda ECG + S */}
      <div className="relative mb-10 w-48 h-48">
        {/* Corazón rojo con borde azul */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <path
            d="M100 180 C60 140, 20 100, 20 60 C20 20, 60 0, 100 40 C140 0, 180 20, 180 60 C180 100, 140 140, 100 180 Z"
            fill="#DC2626"
            stroke="#2563EB"
            strokeWidth="8"
          />
          {/* Letra S blanca centrada */}
          <text
            x="100"
            y="125"
            fontSize="110"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-sans"
          >
            S
          </text>
          {/* Onda ECG verde animada */}
          <path
            d="M10 100 L30 100 L40 80 L50 140 L60 60 L70 120 L80 100 L190 100"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeLinecap="round"
            className="animate-pulse"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;200"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dasharray"
              values="0,200;200,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Título */}
      <h1 className="text-6xl font-black tracking-tighter mb-2 text-gray-900">
        S U M A
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-md text-lg">
        Tu Asistente Médico Personal,<br />Cuando Más Lo Necesitas
      </p>

      {/* Input código */}
      <div className="w-full max-w-xs mb-8 relative">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          className="w-full text-center text-4xl font-mono tracking-widest border-2 border-gray-300 rounded-2xl py-5 pl-12 pr-12 focus:border-red-600 outline-none bg-gray-50"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">♥</span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">👁</span>
      </div>

      {/* Botón ACTIVAR */}
      <button className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white font-bold text-2xl py-6 rounded-2xl transition shadow-lg">
        ACTIVAR
      </button>

      <p className="text-xs text-gray-400 mt-10">
        v1.5
      </p>
    </div>
  );
}
