import React from 'react'

type Props = {}

const CloudSimIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud shape */}
      <path
        d="M18.5 12.5C19.88 12.5 21 11.38 21 10C21 8.62 19.88 7.5 18.5 7.5C18.14 7.5 17.8 7.58 17.5 7.72C17.19 5.64 15.41 4 13.25 4C11.09 4 9.31 5.64 9 7.72C8.7 7.58 8.36 7.5 8 7.5C6.62 7.5 5.5 8.62 5.5 10C5.5 11.38 6.62 12.5 8 12.5H18.5Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Server/simulation elements */}
      <path
        d="M7 15H17C17.55 15 18 15.45 18 16V17C18 17.55 17.55 18 17 18H7C6.45 18 6 17.55 6 17V16C6 15.45 6.45 15 7 15Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 19H17C17.55 19 18 19.45 18 20V21C18 21.55 17.55 22 17 22H7C6.45 22 6 21.55 6 21V20C6 19.45 6.45 19 7 19Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Activity indicators */}
      <circle
        cx="8"
        cy="16.5"
        r="0.5"
        fill="black"
      />
      <circle
        cx="8"
        cy="20.5"
        r="0.5"
        fill="black"
      />
      {/* Connection lines */}
      <path
        d="M12 12.5V15"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default CloudSimIcon
