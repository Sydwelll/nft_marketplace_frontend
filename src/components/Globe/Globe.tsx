// import React, { useEffect, useRef } from "react";
// import Globe from "globe.gl";
// import * as THREE from "three";

// export default function Globe({ emissionsData }) {
//   const globeEl = useRef();

//   useEffect(() => {
//     // Initialize the globe
//     const globe = Globe()(globeEl.current)
//       .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
//       .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
//       .pointsData(emissionsData)
//       .pointAltitude(0)
//       .pointColor(() => "rgba(255, 0, 0, 0.6)") // Red color for emissions
//       .pointRadius(0.1);

//     // Add paths or heatmap logic here, depending on your data

//     // Example of adding paths
//     emissionsData.forEach((emission, idx) => {
//       setTimeout(() => {
//         globe
//           .pathsData([emission])
//           .pathPointAlt(0.01)
//           .pathPointColor(() => "red")
//           .pathResolution(5)
//           .pathTransitionDuration(1000);
//       }, idx * 100);
//     });

//     return () => {
//       // Dispose of the globe instance on unmount
//       globe.dispose();
//     };
//   }, [emissionsData]);

//   return <div ref={globeEl} style={{ width: "100%", height: "600px" }} />;
// }
