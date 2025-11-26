import React from 'react';
import { ResearchLevel } from './types';

export const APP_NAME = "VERITAS";
export const APP_VERSION = "v1.0.0";

export const SYSTEM_INSTRUCTION = `You are Veritas, a high-precision AI research assistant. 
Your goal is 99.9% accuracy. 
Always cite your sources when using external tools.
Format your response using Markdown.
Be concise in 'Quick' mode, thorough in 'Moderate' mode, and exhaustive/analytical in 'Deep' mode.`;

export const MODE_DESCRIPTIONS = {
  [ResearchLevel.QUICK]: "Fast response using internal knowledge.",
  [ResearchLevel.MODERATE]: "Verifies facts using live Google Search.",
  [ResearchLevel.DEEP]: "Complex reasoning (Thinking) + Deep Web Search.",
};

// Helper for React.createElement to keep code concise
const e = React.createElement;

// Icons (SVG Components implemented as pure JS to avoid .tsx requirement in constants.ts)
export const Icons = {
  Send: () => e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, e("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
  })),
  Sparkles: () => e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, e("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 19.441L18 20.25l-.259-.809a2.25 2.25 0 00-1.55-1.55L15.382 17.5l.809-.259a2.25 2.25 0 001.55-1.55L18 14.132l.259.809a2.25 2.25 0 001.55 1.55l.809.259-.809.259a2.25 2.25 0 00-1.55 1.55z"
  })),
  Globe: () => e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, e("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0-18a9 9 0 018.716 6.747M12 3a9 9 0 00-8.716 6.747M12 3c2.485 0 4.5 4.03 4.5 9s-2.015 9-4.5 9m0-18c-2.485 0-4.5 4.03-4.5 9s2.015 9 4.5 9"
  })),
  Brain: () => e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-5 h-5"
  }, e("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  })),
  Logo: () => e("svg", {
    viewBox: "0 0 100 100",
    className: "w-10 h-10",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    e("path", {
      key: "p1",
      d: "M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z",
      stroke: "#66FCF1",
      strokeWidth: "2",
      fill: "none",
      className: "opacity-50"
    }),
    e("path", {
      key: "p2",
      d: "M50 20 L80 35 L50 80 L20 35 Z",
      stroke: "#66FCF1",
      strokeWidth: "3",
      fill: "rgba(102, 252, 241, 0.1)"
    }),
    e("circle", {
      key: "c1",
      cx: "50",
      cy: "50",
      r: "5",
      fill: "#45A29E",
      className: "animate-pulse"
    })
  ]),
  Link: () => e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: "w-3 h-3"
  }, e("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
  }))
};
