import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

export default function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; color: string; left: string }>>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti absolute"
          style={{
            left: particle.left,
            backgroundColor: particle.color,
            top: '-10px'
          }}
        />
      ))}
    </div>
  );
}