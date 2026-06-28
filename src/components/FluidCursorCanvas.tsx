import { useEffect } from 'react';
import initFluidCursor from '../hooks/useFluidCursor';

export default function FluidCursorCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('fluid') as HTMLCanvasElement | null;
    if (!canvas || canvas.dataset.fluidInit) return;
    canvas.dataset.fluidInit = '1';
    initFluidCursor();
  }, []);

  return (
    <canvas
      id="fluid"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
