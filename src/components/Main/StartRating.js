import { useState } from "react";

export default function StarRating({
  maxRating = 10,
  color = "#FFD700",
  width = 24,
  height = 24,
  size = 24,
  messages = [],
  externalState = () => {
    return;
  },
  className = "",
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function onHoverIn(value) {
    setTempRating(value);
  }
  function onHoverOut() {
    setTempRating(0);
  }
  function onRate(value) {
    setRating(value);

    externalState(value);
  }
  const starStyle = {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  };
  const componentStyle = {
    paddingTop: "48px",
    paddingBottom: "48px",
    paddingLeft: "48px",
    paddingRight: "48px",
    backgroundColor: "darkgray",
    display: "grid",
  };
  return (
    <div style={componentStyle} className={className}>
      <div style={starStyle} onMouseLeave={onHoverOut}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            fill={i + 1 <= (tempRating || rating)}
            onHoverIn={() => onHoverIn(i + 1)}
            onHoverOut={onHoverOut}
            onRate={() => onRate(i + 1)}
            color={color}
            width={width}
            height={height}
            size={size}
          />
        ))}
        <span>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating}
        </span>
      </div>
    </div>
  );
}

function Star({ fill, onHoverIn, color, onRate, width, height, size }) {
  const starStyle = {
    width: `${width}px`,
    height: `${height}px`,
    color: color,
    cursor: "pointer",
  };
  return (
    <span onMouseEnter={onHoverIn} onClick={onRate} style={starStyle}>
      {fill ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          viewBox="0 0 24 24"
          stroke={color}
          width={size}
          height={size}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          width={size}
          height={size}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
