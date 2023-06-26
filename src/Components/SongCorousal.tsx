
import { Card } from "./Cards";


export type Track = {
  id: number;
  title: string;
  url: string;
  images: {
    coverart: string;
  };
};
type SongCorousalProps = {
  heading: string,
  corousalArray: Track[];
  textColor?: string
}
export const SongCorousal = (props: SongCorousalProps) => {

  console.log("coroARRAY", props.corousalArray)
  if (props.corousalArray.length === 0) {
    return null
  }
  const uniqueSongs = props.corousalArray.reduce((acc: Track[], song: Track) => {
    if (!acc.find((s) => s.title === song.title)) {
      acc.push(song);
    }
    return acc;
  }, []);


  return (

    <div id={props.heading} style={{ padding: "20px" }}>
      <h2 className="text-muted display-6 text-center">{props.heading}</h2>
      <hr />
      <div style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {uniqueSongs.map((song) => (
            <Card key={song.id} id={song.id} songTitle={song.title} songUrl={song.url} bgImg={song.images.coverart} textColor={props.textColor} />
          ))}

        </div>
      </div>

    </div>
  )
}