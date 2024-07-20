import { Link } from "react-router-dom";
import "../TrackList.css";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

function TrackList({ tracks, setNowPlaying, setTracks }) {
    const handleDelete = (trackId) => {
        fetch(`${BASE_URL}/${trackId}`, {
            method: "DELETE",
        }).then(() => {
            setTracks((prevTracks) => prevTracks.filter((track) => track._id !== trackId));
        });
    };

    // console.log("Tracks:", tracks);

    return (
        <>
            <h2>Current List of Tracks:</h2>
            <div className="track-list">
                {tracks.map((track) => (
                    <div key={track._id} className="track-card">
                        <h2>{track.title}</h2>
                        <p>{track.artist}</p>
                        <button onClick={() => setNowPlaying(track)}>Play</button>
                        <button><Link to={`/edit-track/${track._id}`}>Edit</Link></button>
                        <button onClick={() => handleDelete(track._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TrackList;