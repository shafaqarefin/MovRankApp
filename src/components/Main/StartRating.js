import { useState } from "react";

const starContainerStyle = { display: "flex" };
const textStyle = { lineHeight: "1", margin: "0" };

export default function StarRating({ maxRating = 10 }) {
  const [starNum, setStarNum] = useState(0);
  const [clicked, setClicked] = useState(null);
  const ratings = Array.from({ length: maxRating }, (_, i) =>
    i + 1 < starNum + 1 ? <FilledStar /> : <EmptyStar />
  );

  return (
    <div>
      <div
        style={starContainerStyle}
        onMouseLeave={
          clicked === null
            ? () => {
                setStarNum(0);
              }
            : () => {
                setStarNum(clicked);
              }
        }
      >
        {ratings.map((star, i) => (
          <div
            key={i}
            onMouseEnter={() => {
              setStarNum(i + 1);
            }}
            onClick={() => {
              setClicked(i + 1);
            }}
          >
            {star}
          </div>
        ))}
        <div style={textStyle}>{starNum}</div>
      </div>
      <div>
        <button>Add to list</button>
      </div>
    </div>
  );
}

function EmptyStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="orange"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}
function FilledStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="orange"
      viewBox="0 0 24 24"
      stroke="orange"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}
