import React from "react";

interface PlayerProps {
  videoPath: string;
  type?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

const Player: React.FC<PlayerProps> = ({
  videoPath,
  type = "video/mp4",
  controls = false,
  autoplay = false,
  loop = false,
  muted = false,
  className = "",
}) => {
  // Dynamically import the video
  const videoSrc = require(`../public/projects/${videoPath}`);

  return (
    <div>
      <video
        src={videoSrc}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        className={`${className}`}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;
