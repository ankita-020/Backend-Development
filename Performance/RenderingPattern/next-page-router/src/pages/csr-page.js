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

export default function Home() {
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    try {
      const response = await fetch("http://localhost:4000/tutorials");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setVideos(result);
    } catch (err) {}
  };

  useEffect(() => {
    getVideos();
  }, []);

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
