// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import TrackForm from "./components/TrackForm";
import "./App.css";


const App = () => {



  const [tracks, setTracks] = useState([]);
    const [nowPlaying, setNowPlaying] = useState(null);

    useEffect(() => {
        const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => setTracks(data))
            .catch((error) => console.error("Error fetching tracks:", error));
    }, []);



  return(
    <Router>
    <div className="App">
        <h1>Reactville Jukebox</h1>
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        tracks={tracks}
                        setTracks={setTracks}
                        nowPlaying={nowPlaying}
                        setNowPlaying={setNowPlaying}
                    />
                }
            />
            <Route path="/add-track" element={<TrackForm setTracks={setTracks} />} />
            <Route
                path="/edit-track/:trackId"
                element={<TrackForm setTracks={setTracks} />}
            />
        </Routes>
    </div>
</Router>
  
);
};

export default App;
