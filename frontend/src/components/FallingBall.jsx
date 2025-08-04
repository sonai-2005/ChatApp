import React, { useEffect, useState } from 'react';

export default function FallingBalls() {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBall = {
        id: Date.now(),
        left: Math.random() * 100 + '%',
        size: Math.random() * 20 + 10,
        color: randomColor(),
        animationDuration: Math.random() * 3 + 2 + 's',
      };
      setBalls((prev) => [...prev, newBall]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const randomColor = () => {
    const colors = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#a78bfa'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 999 }}>
      {balls.map((ball) => (
        <div
          key={ball.id}
          style={{
            position: 'absolute',
            top: '-30px',
            left: ball.left,
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            borderRadius: '50%',
            animation: `fall ${ball.animationDuration} linear forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
