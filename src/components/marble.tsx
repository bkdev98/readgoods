// https://github.com/boringdesigners/boring-avatars/blob/master/src/lib/components/avatar-marble.js

import * as React from 'react';

const ELEMENTS = 3;

export const hashCode = (name: string) => {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
    var character = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export const getModulus = (num: number, max: number) => {
  return num % max;
}

export const getDigit = (number: number, ntn: number) => {
  return Math.floor((number / Math.pow(10, ntn)) % 10);
}

export const getBoolean = (number: number, ntn: number) => {
  return (!((getDigit(number, ntn)) % 2))
}

export const getAngle = (x: number, y: number) => {
  return Math.atan2(y, x) * 180 / Math.PI;
}

export const getUnit = (number: number, range: number, index: number) => {
  let value = number % range

  if (index && ((getDigit(number, index) % 2) === 0)) {
    return -value
  } else return value
}

export const getRandomColor = (number: number, colors: string[], range: number) => {
  return colors[(number) % range]
}

export const getContrast = (hexcolor: string) => {

  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Check contrast
  return (yiq >= 128) ? '#000000' : '#FFFFFF';

};

function generateColors(name: string, colors: string[], width: number, height: number) {
  const numFromName = hashCode(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), width / 10, 1),
    translateY: getUnit(numFromName * (i + 1), height / 10, 2),
    scale: 3 + getUnit(numFromName * (i + 1), height / 20, 0) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
}

export type MarbleProps = {
  name: string;
  width: number;
  height: number;
  colors: string[];
  title?: boolean;
  square?: boolean;
  className?: string;
};

const Marble = React.forwardRef<SVGSVGElement, MarbleProps>((props, ref) => {
  const properties = generateColors(props.name, props.colors, props.width, props.height);
  const maskID = React.useId();

  return (
    <svg
      viewBox={'0 0 ' + props.width + ' ' + props.height}
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      ref={ref}
      className={props.className}
    >
      {props.title && <title>{props.name}</title>}
      <mask id={maskID} maskUnits="userSpaceOnUse" x={0} y={0} width={props.width} height={props.height}>
        <rect width={props.width} height={props.height} fill="#FFFFFF" />
      </mask>
      <g mask={`url(#${maskID})`}>
        <rect width={props.width} height={props.height} fill={properties[0].color} />
        <path
          filter="url(#prefix__filter0_f)"
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill={properties[1].color}
          transform={
            'translate(' +
            properties[1].translateX +
            ' ' +
            properties[1].translateY +
            ') rotate(' +
            properties[1].rotate +
            ' ' +
            props.height / 2 +
            ' ' +
            props.width / 2 +
            ') scale(' +
            properties[2].scale +
            ')'
          }
        />
        <path
          filter="url(#prefix__filter0_f)"
          style={{
            mixBlendMode: 'overlay',
          }}
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={properties[2].color}
          transform={
            'translate(' +
            properties[2].translateX +
            ' ' +
            properties[2].translateY +
            ') rotate(' +
            properties[2].rotate +
            ' ' +
            props.height / 2 +
            ' ' +
            props.width / 2 +
            ') scale(' +
            properties[2].scale +
            ')'
          }
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_f"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={7} result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
});

Marble.displayName = 'Marble';

export { Marble }
