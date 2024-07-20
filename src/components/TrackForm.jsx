import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

function TrackForm({ setTracks }) {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const { trackId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (trackId) {
            fetch(`${BASE_URL}/${trackId}`)
                .then((response) => response.json())
                .then((track) => {
                    setTitle(track.title);
                    setArtist(track.artist);
                });
        }
    }, [trackId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = trackId ? "PUT" : "POST";
        const url = trackId ? `${BASE_URL}/${trackId}` : BASE_URL;

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, artist }),
        })
            .then((response) => response.json())
            .then((updatedTrack) => {
                console.log("Updated track:", updatedTrack);
                setTracks((prevTracks) => {
                    if (trackId) {
                        return prevTracks.map((t) =>
                            t._id === updatedTrack._id ? updatedTrack : t
                        );
                    } else {
                        return [...prevTracks, updatedTrack];
                    }
                });
                navigate("/");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default TrackForm;