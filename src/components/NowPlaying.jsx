import { Link } from "react-router-dom";
import TrackList from "./TrackList";
import NowPlaying from "./NowPlaying";

function Home({ tracks, setTracks, nowPlaying, setNowPlaying }) {
    return (
        <div>
            <button>
                <Link to="/add-track" className="new-track">
                    Add New Track
                </Link>
            </button>
            <TrackList tracks={tracks} setNowPlaying={setNowPlaying} setTracks={setTracks} />
            {nowPlaying && <NowPlaying track={nowPlaying} />}
        </div>
    );
}

export default Home;