import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "transparent" },
        particles: {
          number: { value: 220, density: { enable: true, area: 900 } },
          color: { value: "#7c1fd6" },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.35, max: 0.9 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          size: { value: { min: 0.3, max: 0.7 } },
          move: {
            enable: true,
            speed: { min: 0.02, max: 0.08 },
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
          },
          links: { enable: false },
        },
        interactivity: {
          events: { onHover: { enable: false } },
        },
        detectRetina: true,
      }}
    />
  );
}

export function FastDots() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-fast"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "transparent" },
        particles: {
          number: { value: 1 },
          color: { value: "#4a0f8f" },
          shape: { type: "circle" },
          opacity: { value: 0.95 },
          size: { value: { min: 1.2, max: 2 } },
          move: {
            enable: true,
            speed: { min: 0.9, max: 1.4 },
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
          },
          links: { enable: false },
        },
        interactivity: {
          events: { onHover: { enable: false } },
        },
        detectRetina: true,
      }}
    />
  );
}

export default ParticleBackground;