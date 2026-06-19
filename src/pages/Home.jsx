import React, { useState, useCallback } from "react";


import Hero from "../components/Hero";
import TitleList from "../components/TitleList";
import SearchResults from "../components/SearchResult";
import Modal from "../components/Modals";

const API_KEY = "87dfa1c669eea853da609d4968d294be";

const ROWS = [
  { title: "Trending Now", url: "trending/movie/day" },
  {
    title: "Netflix Originals",
    url: "discover/tv?with_networks=213&sort_by=popularity.desc",
  },
  {
    title: "Popular on Netflix",
    url: "discover/movie?sort_by=popularity.desc&page=1",
  },
  { title: "Top Rated", url: "movie/top_rated" },
  { title: "Action Movies", url: "discover/movie?with_genres=28" },
  { title: "Comedy Movies", url: "discover/movie?with_genres=35" },
  { title: "Horror Movies", url: "discover/movie?with_genres=27" },
  { title: "Romance Movies", url: "discover/movie?with_genres=10749" },
  { title: "Documentaries", url: "discover/movie?with_genres=99" },
];

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  const handleSearch = useCallback(async (query) => {
    if (!query || !query.trim()) {
      setSearchResults(null);
      return;
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&api_key=${API_KEY}`;

    try {
      const res = await fetch(url);
      const json = await res.json();

      const filtered = (json.results || []).filter(
        (x) => x.backdrop_path || x.poster_path
      );

      setSearchResults(filtered);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="Home">
      {/* NAVBAR */}
      <Header onSearch={handleSearch} />



      {/* HERO */}
      {!searchResults && <Hero onMoreInfo={setModalItem} />}

      {/* SEARCH RESULTS */}
      {searchResults ? (
        <SearchResults results={searchResults} onOpen={setModalItem} />
      ) : (
        <>
          {/* MOVIE ROWS */}
          {ROWS.map((row) => (
            <TitleList
              key={row.url}
              title={row.title}
              url={row.url}
              onOpen={setModalItem}
            />
          ))}
        </>
      )}

      {/* FOOTER */}
      <footer className="Footer">
        <div className="Footer-links">
          <div className="col">
            <ul>
              <li>FAQ</li>
              <li>Investor Relations</li>
              <li>Privacy</li>
              <li>Speed Test</li>
            </ul>
          </div>

          <div className="col">
            <ul>
              <li>Help Center</li>
              <li>Jobs</li>
              <li>Cookie Preferences</li>
              <li>Legal Notices</li>
            </ul>
          </div>

          <div className="col">
            <ul>
              <li>Account</li>
              <li>Ways to Watch</li>
              <li>Corporate Information</li>
              <li>Only on Netflix</li>
            </ul>
          </div>

          <div className="col">
            <ul>
              <li>Media Center</li>
              <li>Terms of Use</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Netflix Clone
        </div>
      </footer>

      {/* MODAL */}
      {modalItem && (
        <Modal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </div>
  );
}