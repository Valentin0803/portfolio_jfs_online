import React from "react";

const YouTubePlayer = ({
  videoId,
  className,
  autoplay = false,
  muted = false,
  controls = true,
  loop = false,
}: {
  videoId: string;
  className: string;
  autoplay: boolean;
  muted: boolean;
  controls: boolean;
  loop: boolean;
}) => {
  const autoplayParam = autoplay ? 1 : 0;
  const mutedParam = muted ? 1 : 0;
  const controlsParam = controls ? 1 : 0;
  const loopParam = loop ? 1 : 0;
  const playlistParam = loop ? `&playlist=${videoId}` : ""; // Nécessaire pour activer la boucle sur YouTube

  return (
    <div
      className={`relative w-full pb-[56.25%] h-0 overflow-hidden ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&mute=${mutedParam}&controls=${controlsParam}&loop=${loopParam}${playlistParam}`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
