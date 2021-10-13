import React from 'react';

const Mute = (props) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#mute_filter)">
      <path
        d="M16.1912 10.6919C16.1912 8.72523 15.0578 7.03634 13.4134 6.21412V8.66967L16.1356 11.3919C16.1689 11.1697 16.1912 10.9363 16.1912 10.6919ZM18.9689 10.6919C18.9689 11.7363 18.7467 12.7141 18.3689 13.6252L20.0467 15.303C20.7801 13.9252 21.1912 12.3586 21.1912 10.6919C21.1912 5.93634 17.8689 1.95856 13.4134 0.94745V3.23634C16.6245 4.19189 18.9689 7.16967 18.9689 10.6919ZM2.60227 0.691895L1.19116 2.10301L6.44672 7.35856H1.19116V14.0252H5.63561L11.1912 19.5808V12.103L15.9134 16.8252C15.1689 17.403 14.3356 17.8586 13.4134 18.1363V20.4252C14.9467 20.0808 16.3356 19.3697 17.5134 18.4141L19.7801 20.6919L21.1912 19.2808L11.1912 9.28078L2.60227 0.691895ZM11.1912 1.80301L8.86894 4.12523L11.1912 6.44745V1.80301Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="mute_filter"
        x="0.191162"
        y="0.691895"
        width="22"
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
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
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

export default Mute;
