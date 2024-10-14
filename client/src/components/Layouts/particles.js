// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { useEffect, useMemo, useState } from "react";
// // import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// // import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.



// const ParticlesComponent = (props) => {

//   const [init, setInit] = useState(false);
//   // this should be run only once per application lifetime
//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
//       // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//       // starting from v2 you can add only the features you need reducing the bundle size
//       //await loadAll(engine);
//       //await loadFull(engine);
//       await loadSlim(engine);
//       //await loadBasic(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   const particlesLoaded = (container) => {
//     console.log(container);
//   };


//   const options = useMemo(
//     () => ({
//       background: {
//         color: {
//           value: "#1E2F97",
//         },
//       },
//       fpsLimit: 120,
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true,
//             mode: "repulse",
//           },
//           onHover: {
//             enable: true,
//             mode: 'grab',
//           },
//         },
//         modes: {
//           push: {
//             distance: 200,
//             duration: 15,
//           },
//           grab: {
//             distance: 150,
//           },
//         },
//       },
//       particles: {
//         color: {
//           value: "#FFFFFF",
//         },
//         links: {
//           color: "#FFFFFF",
//           distance: 150,
//           enable: true,
//           opacity: 0.3,
//           width: 1,
//         },
//         move: {
//           direction: "none",
//           enable: true,
//           outModes: {
//             default: "bounce",
//           },
//           random: true,
//           speed: 1,
//           straight: false,
//         },
//         number: {
//           density: {
//             enable: true,
//           },
//           value: 150,
//         },
//         opacity: {
//           value: 1.0,
//         },
//         shape: {
//           type: "circle",
//         },
//         size: {
//           value: { min: 1, max: 3 },
//         },
//       },
//       detectRetina: true,
//     }),
//     [],
//   );


//   return <Particles id={props.id} init={particlesLoaded} options={options} />; 
// };

// export default ParticlesComponent;

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // Ensure you have this installed

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Slim version of tsparticles engine
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    
    console.log('Particles loaded:', container);
  };

  // Replace the options with the provided configuration
  const options = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: { value: "#000000" },
        image: "",
        position: "",
        repeat: "",
        size: "",
        opacity: 1
      },
      backgroundMask: {
        composite: "destination-out",
        cover: { color: { value: "#fff" }, opacity: 1 },
        enable: false
      },
      clear: true,
      fullScreen: { enable: true, zIndex: -1 },
      detectRetina: true,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: { enable: false, mode: [] },
          onDiv: { selectors: [], enable: false, mode: [], type: "circle" },
          onHover: { enable: false, mode: [], parallax: { enable: false } },
          resize: { enable: true, delay: 0.5 }
        },
        modes: {
          trail: { delay: 1, pauseOnStop: false, quantity: 1 },
          attract: { distance: 200, duration: 0.4, maxSpeed: 50 },
          repulse: { distance: 200, duration: 0.4, factor: 100, speed: 1 }
        }
      },
      particles: {
        bounce: { horizontal: { value: 1 }, vertical: { value: 1 } },
        collisions: { enable: false },
        color: { value: "#fff" },
        move: {
          enable: true,
          speed: 5,
          direction: "right",
          outModes: { default: "out" }
        },
        number: { value: 200 },
        opacity: { value: 1 },
        shape: { type: "circle" },
        size: { value: 3 }
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      zLayers: 100,
      emitters: {
        autoPlay: true,
        rate: { quantity: 1, delay: 7 },
        size: { mode: "percent", height: 10, width: 10 },
        particles: {
          shape: {
            type: "images",
            options: {
              images: {
                src: "https://particles.js.org/images/cyan_amongus.png",
                width: 500,
                height: 634
              }
            }
          },
          size: { value: 80 },
          move: { speed: 10, outModes: { right: "destroy" }, straight: true },
          rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 10 } }
        },
        position: { x: 50, y: 50 }
      }
    }),
    []
  );

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
