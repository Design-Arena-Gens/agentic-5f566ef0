'use client';

import { useEffect, useState } from 'react';
import './styles.css';

export default function HorrorScene() {
  const [scene, setScene] = useState(0);
  const [lightningFlash, setLightningFlash] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    if (!audioEnabled) return;

    // Scene progression
    const timers = [
      setTimeout(() => setScene(1), 3000),  // Boy approaches
      setTimeout(() => setScene(2), 6000),  // Boy at door
      setTimeout(() => setScene(3), 9000),  // Boy enters
      setTimeout(() => setScene(4), 12000), // Lights flicker
      setTimeout(() => setScene(5), 15000), // Face transforms
      setTimeout(() => setScene(6), 18000), // Full horror reveal
    ];

    // Lightning effects
    const lightningInterval = setInterval(() => {
      if (scene < 3) {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 150);
      }
    }, 2000 + Math.random() * 3000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(lightningInterval);
    };
  }, [scene, audioEnabled]);

  const startExperience = () => {
    setAudioEnabled(true);
    setScene(1);
  };

  if (!audioEnabled) {
    return (
      <div className="start-screen">
        <h1>THE RETURN</h1>
        <p>A Cinematic Horror Experience</p>
        <button onClick={startExperience} className="start-button">
          ENTER
        </button>
        <p className="warning">⚠️ Best experienced with sound and fullscreen</p>
      </div>
    );
  }

  return (
    <div className={`scene scene-${scene} ${lightningFlash ? 'lightning' : ''}`}>
      {/* Rain overlay */}
      {scene < 3 && (
        <div className="rain">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="raindrop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}

      {/* Thunder flash */}
      {lightningFlash && <div className="lightning-flash" />}

      {/* Outside scene */}
      {scene >= 1 && scene < 3 && (
        <div className="outside">
          <div className="house-exterior">
            <div className="house-window glow"></div>
            <div className="house-window glow" style={{ left: '60%' }}></div>
            <div className="house-door"></div>
          </div>
          <div className={`boy-outside ${scene >= 2 ? 'boy-approaching' : ''}`}>
            <div className="silhouette"></div>
          </div>
        </div>
      )}

      {/* Inside scene */}
      {scene >= 3 && (
        <div className={`inside ${scene >= 4 ? 'flicker' : ''}`}>
          {/* Family members */}
          <div className={`family ${scene >= 5 ? 'terrified' : ''}`}>
            <div className="father">
              <div className="person-body"></div>
              <div className={`face ${scene >= 5 ? 'scared' : 'anxious'}`}>
                {scene >= 5 && <div className="eyes-wide">👁️👁️</div>}
              </div>
            </div>

            <div className="mother">
              <div className="person-body"></div>
              <div className={`face ${scene >= 5 ? 'crying' : 'worried'}`}>
                {scene >= 5 && <div className="tears">😰</div>}
              </div>
            </div>

            <div className={`sister ${scene >= 5 ? 'hiding' : ''}`}>
              <div className="person-body small"></div>
              <div className={`face small ${scene >= 5 ? 'hiding-face' : 'nervous'}`}>
                {scene >= 5 && <div className="scared">😱</div>}
              </div>
            </div>
          </div>

          {/* The boy inside */}
          <div className={`boy-inside ${scene >= 5 ? 'transforming' : ''} ${scene >= 6 ? 'horror-face' : ''}`}>
            <div className="boy-body muddy"></div>
            <div className={`boy-face ${scene >= 5 ? 'transform' : 'emotionless'}`}>
              {scene < 5 && <div className="blank-stare">😐</div>}
              {scene >= 5 && scene < 6 && <div className="transition">😶</div>}
              {scene >= 6 && (
                <div className="demon-face">
                  <div className="dark-eyes">⚫⚫</div>
                  <div className="evil-smile">👹</div>
                </div>
              )}
            </div>
          </div>

          {/* Atmospheric effects */}
          {scene >= 4 && (
            <>
              <div className="cold-breath"></div>
              <div className="whispers">
                <span>ʷʰⁱˢᵖᵉʳ</span>
                <span>ʷʰⁱˢᵖᵉʳ</span>
                <span>ʷʰⁱˢᵖᵉʳ</span>
              </div>
            </>
          )}

          {/* Door frame */}
          <div className="doorway">
            <div className="door-frame"></div>
          </div>
        </div>
      )}

      {/* Camera zoom effect on final scene */}
      {scene >= 6 && (
        <div className="zoom-overlay">
          <div className="vignette"></div>
        </div>
      )}

      {/* Scene text overlays */}
      {scene === 1 && <div className="text-overlay fade-in">A stormy night...</div>}
      {scene === 2 && <div className="text-overlay fade-in">He returns...</div>}
      {scene === 6 && <div className="text-overlay fade-in final-text">But what returned... was not their son.</div>}
    </div>
  );
}
