// src/lib/nodeColors.ts

/**
 * 🎨 Genera un array de 50 colores pastel aleatorios
 */
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.floor(Math.random() * 20); // entre 60% y 80%
  const lightness = 60 + Math.floor(Math.random() * 20); // entre 60% y 80%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const nodeColors: string[] = Array.from({ length: 50 }, getRandomColor);
