"use client";

import { useId } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

type Star = [x: number, y: number, dim?: boolean, blur?: boolean];

const stars: Array<Star> = [
  [4, 4, true, true],
  [4, 44, true],
  [36, 22],
  [50, 146, true, true],
  [64, 43, true, true],
  [76, 30, true],
  [101, 116],
  [140, 36, true],
  [149, 134],
  [162, 74, true],
  [171, 96, true, true],
  [210, 56, true, true],
  [235, 90],
  [275, 82, true, true],
  [306, 6],
  [307, 64, true, true],
  [380, 68, true],
  [380, 108, true, true],
  [391, 148, true, true],
  [405, 18, true],
  [412, 86, true, true],
  [426, 210, true, true],
  [427, 56, true, true],
  [538, 138],
  [563, 88, true, true],
  [611, 154, true, true],
  [637, 150],
  [651, 146, true],
  [682, 70, true, true],
  [683, 128],
  [781, 82, true, true],
  [785, 158, true],
  [832, 146, true, true],
  [852, 89],
];

const constellations: Array<Array<Star>> = [
  [
    [247, 103],
    [261, 86],
    [307, 104],
    [357, 36],
  ],
  [
    [586, 120],
    [516, 100],
    [491, 62],
    [440, 107],
    [477, 180],
    [516, 100],
  ],
  [
    [733, 100],
    [803, 120],
    [879, 113],
    [823, 164],
    [803, 120],
  ],
];

function Star({
  blurId,
  point: [cx, cy, dim, blur],
}: {
  blurId: string;
  point: Star;
}) {
  let initialScale = dim ? 1 : 1.2;
  let animateScale = dim ? 1.2 : 1;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, delay: Math.random() * 2 }}
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r={1}
        initial={{
          opacity: dim ? 0.2 : 1,
          scale: initialScale,
        }}
        animate={{
          opacity: dim ? [0.2, 0.5] : [1, 0.6],
          scale: [initialScale, animateScale],
        }}
        transition={{
          duration: Math.random() * 2 + 2,
          yoyo: Infinity,
          delay: Math.random() * 2,
        }}
        style={{
          transformOrigin: `${cx / 16}rem ${cy / 16}rem`,
        }}
        filter={blur ? `url(#${blurId})` : undefined}
      />
    </motion.g>
  );
}

function Constellation({
  points,
  blurId,
}: {
  points: Array<Star>;
  blurId: string;
}) {
  let path = `M ${points.join("L")}`;
  let isFilled = new Set(points).size !== points.length;

  return (
    <>
      <motion.path
        stroke="white"
        strokeOpacity="0.2"
        strokeDasharray={1}
        strokeDashoffset={1}
        pathLength={1}
        fill="transparent"
        d={path}
        initial={{ strokeDashoffset: 1, visibility: "hidden" }}
        animate={{ strokeDashoffset: 0, visibility: "visible" }}
        transition={{ duration: 5, delay: Math.random() * 3 + 2 }}
      />
      {isFilled && (
        <motion.path
          d={path}
          fill="rgb(255 255 255 / 0.02)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      {points.map((point, pointIndex) => (
        <Star key={pointIndex} point={point} blurId={blurId} />
      ))}
    </>
  );
}

export default function StarField({ className }: { className?: string }) {
  let blurId = useId();

  return (
    <svg
      viewBox="0 0 881 211"
      fill="white"
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute w-[55.0625rem] origin-top-right rotate-[30deg] overflow-visible opacity-70",
        className
      )}
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
        </filter>
      </defs>
      {constellations.map((points, constellationIndex) => (
        <Constellation
          key={constellationIndex}
          points={points}
          blurId={blurId}
        />
      ))}
      {stars.map((point, pointIndex) => (
        <Star key={pointIndex} point={point} blurId={blurId} />
      ))}
    </svg>
  );
}
