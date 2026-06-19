import React, { useState } from "react";
import YouTube from "react-youtube";
import HeroButton from "./Herobutton.jsx";

const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export default function Hero({ onMoreInfo }) {

  const [showTrailer, setShowTrailer] = useState(false);

  // Fixed movie
  const item = {
    title: "Spider-Man: Brand New Day",

    backdrop_path:
      "/tv351KK1HPpRMcjKs0VBMuajafG.jpg",

    overview:
      "Four years have passed since the events of No Way Home, and Peter is now an adult living entirely alone, having voluntarily erased himself from the lives and memories of those he loves. Crime-fighting in a New York that no longer knows his name, he's devoted himself entirely to protecting his city — a full-time Spider-Man — but as the demands on him intensify, the pressure sparks a surprising physical evolution that threatens his existence, even as a strange new pattern of crimes gives rise to one of the most powerful threats he has ever faced.",

    vote_average: 8.7,

    release_date: "2026-7-31b ",

    // YouTube trailer ID
    trailer: "8TZMtslA3UY",
  };

  const title = item.title;

  const backdrop = `${IMG_ORIGINAL}${item.backdrop_path}`;

  const year = item.release_date.slice(0, 4);

  const score = Math.round(item.vote_average * 10);

  return (
    <>
      <div className="Hero">

        {/* Background */}
        <div
          className="bg"
          style={{
            backgroundImage: `url(${backdrop})`,
          }}
        />

        {/* Overlay */}
        <div className="vignette" />

        {/* Content */}
        <div className="content">

          <div className="badge">
            Movie • Featured
          </div>

          <h1>{title}</h1>

          <div className="meta">
            <span className="match">
              {score}% Match
            </span>

            <span>{year}</span>

            <span className="rating-badge">
              PG-13
            </span>
          </div>

          <p>{item.overview}</p>

          <div className="button-wrapper">

            {/* PLAY TRAILER */}
            <HeroButton
              primary={true}
              text="Play Trailer"
              icon="▶"
              onClick={() => setShowTrailer(true)}
            />

            {/* MORE INFO */}
            <HeroButton
              primary={false}
              text="More Info"
              icon="ⓘ"
              onClick={() =>
                onMoreInfo && onMoreInfo(item)
              }
            />
          </div>
        </div>

        {/* Rating */}
        <div className="maturity">
          <span className="maturity-rating">
            PG-13
          </span>
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="Modal-overlay">

          <div className="Modal">

            {/* Close */}
            <button
              className="modal-close"
              onClick={() =>
                setShowTrailer(false)
              }
            >
              ✕
            </button>

            {/* YouTube Player */}
            <YouTube
              videoId={item.trailer}
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