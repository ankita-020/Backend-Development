import { Tutorials } from "../tutorial";

async function fetchVideos() {
  const response = await fetch("http://localhost:4000/tutorials");
  const result = await response.json();
  return result;
}

export default async function Home() {
  const videos = await fetchVideos();
  console.log("Rendered on server");

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
