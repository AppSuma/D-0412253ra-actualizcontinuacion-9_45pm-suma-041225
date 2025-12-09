import { useState } from "react";
import { Heart, Eye } from "lucide-react";

export default function App() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo animado perfecto */}
      <div className="relative w-64 h-64 mb-10">
        <svg viewBox="0 0 256 256" className="w-full h-full">
          {/* Corazón rojo con borde azul */}
          <path
            d="M128 228 C70 180, 20 130, 20 80 C20 30, 60 0, 128 60 C196 0, 236 30, 236 80 C236 130, 186 180, 128 228 Z"
            fill="#DC2626"
            stroke="#2563EB"
            strokeWidth="12"
          />
          {/* S blanca centrada */}
          <text
            x="128"
            y="155"
            fontSize="140"
            fontWeight="900"
            fill="white"
            textAnchor="middle"
            className="font-sans"
          >
            S
          </text>
          {/* Onda ECG verde animada */}
          <path
            d="M20 128 L50 128 L65 100 L80 160 L95 80 L110 140 L125 128 L236 128"
            fill="none"
            stroke="#10B981"
            strokeWidth="10"
            strokeLinecap="round"
            className="animate-pulse"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,300;300,0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <h1 className="text-7xl font-black tracking-tighter text-gray-900 mb-3">
        S U M A
      </h1>
      <p className="text-gray-600 text-center text-lg mb-12 max-w-md">
        Tu Asistente Médico Personal,<br />
        Cuando Más Lo Necesitas
      </p>

      {/* Input con iconos */}
      <div className="relative w-full max-w-xs mb-10">
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="0 0 0 0 0 0"
          className="w-full text-center text-5xl font-mono tracking-widest bg-gray-50 border-2 border-gray-300 rounded-3xl py-6 pl-14 pr-14 focus:border-red-600 outline-none"
        />
        <Heart className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
        <Eye className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
      </div>

      {/* Botón rojo gigante */}
      <button className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white font-bold text-3xl py-7 rounded-3xl shadow-2xl transition">
        ACTIVAR
      </button>

      <p className="text-xs text-gray-400 mt-12">v63.0 (Layout Locked)</p>
    </div>
  );
}
