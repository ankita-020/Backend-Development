"use client";
import Image from "next/image";

export const Tutorials = ({ video }) => {
  console.log("Rendered on client");

  return (
    <>
      <li>
        <a href={video.image} target="_blank" rel="noopener noreferrer">
          <Image src={video.image} alt={video.title} width={420} height={200} />
          <h4>{video.title}</h4>
          <div>{video.views}</div>
        </a>
      </li>
    </>
  );
};
