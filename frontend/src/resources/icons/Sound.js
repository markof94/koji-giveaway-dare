import React from 'react';

const Sound = (props) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#sound_filter)">
      <path
        d="M1.12915 7.27114V14.1126H5.69015L11.3914 19.8139V1.56989L5.69015 7.27114H1.12915ZM16.5225 10.6919C16.5225 8.67365 15.3595 6.94047 13.6719 6.09668V15.2757C15.3595 14.4433 16.5225 12.7101 16.5225 10.6919ZM13.6719 0.691895V3.04081C16.9672 4.02143 19.3732 7.0773 19.3732 10.6919C19.3732 14.3065 16.9672 17.3624 13.6719 18.343V20.6919C18.2443 19.6543 21.6537 15.5722 21.6537 10.6919C21.6537 5.81162 18.2443 1.72952 13.6719 0.691895Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="sound_filter"
        x="0.12915"
        y="0.691895"
        width="22.5245"
        height="22"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Sound;
