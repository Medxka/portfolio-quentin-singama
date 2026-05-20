"use client";

import { motion } from "motion/react";

/**
 * Process flow — signature data viz hero
 * 4 nodes : Research → Wireframe → Design → Ship
 * SVG statique après entry animation 800ms, respecte prefers-reduced-motion
 */
export function ProcessFlow({ className = "" }: { className?: string }) {
  const nodes = [
    { id: "research", label: "RESEARCH", x: 50, y: 50 },
    { id: "wireframe", label: "WIREFRAME", x: 250, y: 50 },
    { id: "design", label: "DESIGN", x: 450, y: 50 },
    { id: "ship", label: "SHIP", x: 650, y: 50 },
  ];

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 700 200"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        aria-label="Process flow : research, wireframe, design, ship"
      >
        {/* Background grid (decorative) */}
        <defs>
          <pattern
            id="dotgrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="0.5" fill="var(--border-subtle)" />
          </pattern>
        </defs>
        <rect width="700" height="200" fill="url(#dotgrid)" opacity="0.4" />

        {/* Connecting lines */}
        {nodes.slice(0, -1).map((node, i) => {
          const next = nodes[i + 1];
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={node.x + 12}
              y1={node.y}
              x2={next.x - 12}
              y2={next.y}
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.15,
                ease: [0.2, 0, 0, 1],
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2 + i * 0.15,
              ease: [0.2, 0, 0, 1],
            }}
          >
            {/* Node ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill="var(--bg-base)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            {/* Node dot */}
            <circle cx={node.x} cy={node.y} r="3" fill="var(--accent)" />

            {/* Label below */}
            <text
              x={node.x}
              y={node.y + 30}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="0.15em"
              fill="var(--text-t2)"
              style={{ textTransform: "uppercase" }}
            >
              {`0${i + 1}`}
            </text>
            <text
              x={node.x}
              y={node.y + 44}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.12em"
              fill="var(--text-t1)"
              fontWeight="500"
              style={{ textTransform: "uppercase" }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* REF code top-right */}
        <text
          x="650"
          y="20"
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.12em"
          fill="var(--text-t3)"
          style={{ textTransform: "uppercase" }}
        >
          // REF · QS-PROCESS-V1
        </text>
      </svg>
    </div>
  );
}
