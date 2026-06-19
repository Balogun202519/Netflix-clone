import React, { useState } from "react";
import YouTube from "react-youtube";
import ListToggle from "./ListToggle";

const API_KEY = "87dfa1c669eea853da609d4968d294be";
const PLACEHOLDER =
  "https://via.placeholder.com/400x225?text=No+Image";

export default function Item({
  title = "Untitled",
  score,
  overview = "",
  backdrop = "",
  movieId, // 👈 IMPORTANT (TMDB id)
  onOpen,
}) {
  const [showTrailer, setShowTrailer] =
    useState(false);

  const [trailerKey, setTrailerKey] =
    useState("");

  const bg =
    backdrop && backdrop.trim()
      ? backdrop
      : PLACEHOLDER;

  const matchPct = score
    ? Math.round(score * 10)
    : null;

  // FETCH TRAILER FROM TMDB
  async function fetchTrailer() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );

      const data = await res.json();

      const trailer = data.results.find(
        (vid) =>
          vid.type === "Trailer" &&
          vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("No trailer found");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* MOVIE CARD */}
      <div
        className="Item"
        role="article"
        aria-label={title}
      >
        <img
          className="thumb"
          src={bg}
          alt={title}
          loading="lazy"
          onClick={fetchTrailer} // 👈 CLICK OPENS TRAILER
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
        />

        <div className="overlay">
          <div className="actions">

            {/* PLAY TRAILER */}
            <button
              className="card-btn play"
              onClick={(e) => {
                e.stopPropagation();
                fetchTrailer();
              }}
            >
              ▶
            </button>

            <ListToggle />

            <button className="card-btn">
              👍
            </button>

            <button
              className="card-btn more"
              onClick={(e) => {
                e.stopPropagation();
                onOpen && onOpen();
              }}
            >
              ⌄
            </button>
          </div>

          <div className="title">
            {title}
          </div>

          <div className="rating">
            {matchPct && (
              <span className="match">
                {matchPct}% Match
              </span>
            )}
            <span className="hd-badge">
              HD
            </span>
          </div>

          {overview && (
            <div className="plot">
              {overview}
            </div>
          )}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && trailerKey && (
        <div className="Modal-overlay">
          <div className="Modal">
            <button
              className="modal-close"
              onClick={() =>
                setShowTrailer(false)
              }
            >
              ✕
            </button>

            <YouTube
              videoId={trailerKey}
              opts={{
                width: "100%",
                height: "500",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}