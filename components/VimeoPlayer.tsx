import React from "react";

const VimeoPlayer = ({
  videoId,
  className,
  autoplay = false,
  muted = false,
  controls = true,
  loop = false,
  vertical = false,
}: {
  videoId: string;
  className?: string;
  autoplay: boolean;
  muted: boolean;
  controls: boolean;
  loop: boolean;
  vertical?: boolean;
}) => {
  const autoplayParam = autoplay ? 1 : 0;
  const mutedParam = muted ? 1 : 0;
  const controlsParam = controls ? 1 : 0;
  const loopParam = loop ? 1 : 0;

  const paddingBottom = vertical ? "177.77%" : "56.25%"; // 9:16 = 177.77%, 16:9 = 56.25%

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ paddingBottom }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}&muted=${mutedParam}&controls=${controlsParam}&loop=${loopParam}`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Vimeo Video"
      ></iframe>
    </div>
  );
};

export default VimeoPlayer;
