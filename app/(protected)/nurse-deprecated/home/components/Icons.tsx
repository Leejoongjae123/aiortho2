import React from 'react';

export const AvatarIcon: React.FC = () => (
  <svg
    width="84"
    height="85"
    viewBox="0 0 84 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      opacity="0.4"
      d="M82 42.8887C82 54.9421 76.6686 65.7504 68.2353 73.084C61.2122 79.1912 52.0379 82.8887 42 82.8887C31.9621 82.8887 22.7878 79.1912 15.7647 73.084C7.33139 65.7504 2 54.9421 2 42.8887C2 20.7973 19.9086 2.88867 42 2.88867C64.0914 2.88867 82 20.7973 82 42.8887Z"
      fill="#B6C2D9"
    ></path>
    <circle cx="42" cy="34.8887" r="12" fill="#B6C2D9"></circle>
    <path
      d="M68.2363 73.084C64.2626 62.4558 54.0155 54.8887 42.001 54.8887C29.9865 54.8887 19.7394 62.4558 15.7656 73.084C22.7887 79.1912 31.963 82.8887 42.001 82.8887C52.0389 82.8887 61.2132 79.1912 68.2363 73.084Z"
      fill="#B6C2D9"
    ></path>
  </svg>
);

export const PrescriptionIcon: React.FC = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_23_355)">
      <path
        opacity="0.21"
        d="M37 0C49.7025 0 60 10.2975 60 23V37C60 49.7025 49.7025 60 37 60H23C10.2975 60 0 49.7025 0 37V23C0 10.2975 10.2975 0 23 0H37Z"
        fill="#8280FF"
      ></path>
      <path
        opacity="0.8"
        d="M24.7109 22.0586H35.2992"
        stroke="#8280FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        opacity="0.6"
        d="M24.7109 26.4707H35.2992"
        stroke="#8280FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        opacity="0.4"
        d="M24.7109 30.8828H30.0051"
        stroke="#8280FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M31.7656 37.0586H37.0597"
        stroke="#8280FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <mask id="path-6-inside-1_23_355" fill="white">
        <rect x="17.6484" y="15" width="24.7059" height="30" rx="2"></rect>
      </mask>
      <rect
        x="17.6484"
        y="15"
        width="24.7059"
        height="30"
        rx="2"
        stroke="#8280FF"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask="url(#path-6-inside-1_23_355)"
      ></rect>
      <path
        d="M34.4141 34.4121V39.7062"
        stroke="#8280FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_23_355">
        <rect width="60" height="60" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);

export const PatientRegistrationIcon: React.FC = () => (
  <div className="relative h-[60px] w-[60px]" aria-hidden="true">
    <div className="absolute top-0 left-0 bg-indigo-400 rounded-3xl h-[60px] w-[60px]" />
    <div className="absolute left-3.5 w-8 h-6 top-[18px]">
      <div className="absolute top-0 bg-amber-300 h-[15px] left-[7px] opacity-[0.5878] w-[21px]" />
      <div className="absolute left-0 w-8 bg-amber-300 h-[11px] top-[13px]">
        <div className="absolute top-4 h-2 bg-zinc-300 left-[23px] w-[9px]" />
      </div>
    </div>
  </div>
);

export const SearchIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6415 14.7187C14.3714 13.4975 15.6439 10.178 14.4837 7.30454C13.3235 4.43102 10.1701 3.09157 7.44025 4.31278C4.71041 5.534 3.43793 8.85343 4.59808 11.7269C5.75823 14.6005 8.91169 15.9399 11.6415 14.7187Z"
      stroke="#97A8C4"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M13.3373 13.5131L17.5026 17.8983"
      stroke="#97A8C4"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const SortArrowsIcon: React.FC = () => (
  <svg
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M5 0L8.89711 5.25H1.10289L5 0Z" fill="#DADFE9"></path>
    <path d="M5 16L1.10288 10.75L8.89711 10.75L5 16Z" fill="#DADFE9"></path>
  </svg>
);

export const PrevIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9.58974 11.5297C9.84946 11.7895 10.2705 11.7895 10.5303 11.5297C10.7898 11.2702 10.79 10.8495 10.5308 10.5897L7.94667 8L10.5308 5.41026C10.79 5.15046 10.7898 4.72977 10.5303 4.47026C10.2705 4.21054 9.84946 4.21054 9.58974 4.47026L6.48895 7.57105C6.25205 7.80795 6.25205 8.19205 6.48895 8.42895L9.58974 11.5297Z"
      fill="#B6C2D9"
    ></path>
  </svg>
);

export const NextIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6.41026 11.5297C6.15054 11.7895 5.72946 11.7895 5.46974 11.5297C5.21023 11.2702 5.21 10.8495 5.46923 10.5897L8.05333 8L5.46923 5.41026C5.21 5.15046 5.21023 4.72977 5.46974 4.47026C5.72946 4.21054 6.15054 4.21054 6.41026 4.47026L9.51105 7.57105C9.74795 7.80795 9.74795 8.19205 9.51105 8.42895L6.41026 11.5297Z"
      fill="#B6C2D9"
    ></path>
  </svg>
);
