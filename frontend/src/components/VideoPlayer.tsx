import React from 'react';

type Props = {
  className?: string;
  source: string;
};

export default function VideoPlayer(props: Props) {
  return (
    <iframe
      className={props.className}
      width="352"
      height="198"
      src={props.source}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
