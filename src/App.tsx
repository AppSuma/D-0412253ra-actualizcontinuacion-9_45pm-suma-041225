import { useState } from "react";
import { Heart } from "lucide-react";

export default function App() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 relative">
        <Heart className="w-32 h-32 text-red-600 fill-red-600" />
        <span className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
          S
        </span>
      </div>

      {/* Título */}
      <h1 className="text-6xl font-black tracking-tighter mb-2">
        S<span className="text-red-600">U</span>M
        <span className="text-red-600">A</span>
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-md">
        Tu Asistente Médico Personal, Cuando Más Lo Necesitas
      </p>

      {/* Input código */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder="000000"
        className="w-full max-w-xs text-center text-4xl font-mono tracking-widest border-2 border-gray-300 rounded-xl py-4 mb-8 focus:border-red-600 outline-none"
      />

      {/* Botón ACTIVAR */}
      <button className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white font-bold text-2xl py-6 rounded-xl transition">
        ACTIVAR
      </button>

      <p className="text-xs text-gray-400 mt-8">
        v63.0 (Layout Locked)
      </p>
    </div>
  );
}
