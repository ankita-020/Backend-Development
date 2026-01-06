import { useEffect, useState } from "react";
import Image from "next/image";

const Tutorials = ({ video }) => {
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

export default function Home({ videos }) {
  return (
    <>
      <h1>Tutorials</h1>
      <ul>
        {videos.length &&
          videos.map((video, i) => {
            return <Tutorials video={video} key={i} />;
          })}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  // The below promise will affect time when server is serving. So do not block server
  await new Promise((res, rej) => {
    setTimeout(res, 5000);
  });
  const response = await fetch("http://localhost:4000/tutorials");
  const videos = await response.json();

  // Pass data to the page via props
  return { props: { videos } };
}
