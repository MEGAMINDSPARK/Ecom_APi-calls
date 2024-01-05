// import React, { useState } from "react";

// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);

//   function fetchMoviesHandler() {
//     fetch(`https://swapi.dev/api/films`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         const transformedMovies = data.results.map((movieData) => {
//           return {
//             id: movieData.episode_id,
//             title: movieData.title,
//             openingText: movieData.opening_crawl,
//             releaseDate: movieData.release_date,
//           };
//         });
//         setMovies(transformedMovies);
//       });
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         <MoviesList movies={movies} />
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   function fetchMoviesHandler() {
//     setIsLoading(true); 
//     fetch(`https://swapi.dev/api/films`)
//       .then((response) => response.json())
//       .then((data) => {
//         const transformedMovies = data.results.map((movieData) => ({
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         }));
//         setMovies(transformedMovies);
//         setIsLoading(false); 
//       })
//       .catch((error) => {
//         setIsLoading(false); 
//         console.error("Error fetching movies:", error);
//       });
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {isLoading ? (
//           <div className="loader">Loading...</div> 
//         ) : (
//           <MoviesList movies={movies} />
//         )}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import MoviesList from "./components/MoviesList";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [retryTimer, setRetryTimer] = useState(null);

//   useEffect(() => {
//     if (retryTimer === null) return;

//     const timer = setInterval(() => {
//       fetchMoviesHandler();
//     }, 2000);

//     return () => clearInterval(timer);
//   }, [retryTimer]);

//   function fetchMoviesHandler() {
//     setIsLoading(true);
//     setError(null); 
//     fetch(`https://swapi.dev/api/films`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const transformedMovies = data.results.map((movieData) => ({
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         }));
//         setMovies(transformedMovies);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setError("Something went wrong... Retrying");
//         setRetryTimer(Date.now());
//         setIsLoading(false);
//         console.error("Error fetching movies:", error);
//       });
//   }

//   function cancelRetryHandler() {
//     if (retryTimer !== null) {
//       clearInterval(retryTimer);
//       setRetryTimer(null);
//     }
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler} disabled={isLoading}>
//           Fetch Movies
//         </button>
//         {retryTimer !== null && (
//           <button onClick={cancelRetryHandler}>Cancel Retry</button>
//         )}
//       </section>
//       <section>
//         {isLoading ? (
//           <div className="loader">Loading...</div>
//         ) : error ? (
//           <div className="error">{error}</div>
//         ) : (
//           <MoviesList movies={movies} />
//         )}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;


import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch(`https://swapi.dev/api/films`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }));
        setMovies(transformedMovies);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong... Retrying");
        setRetryTimer(Date.now());
        setIsLoading(false);
        console.error("Error fetching movies:", error);
      });
  }, []);

  const cancelRetryHandler = useCallback(() => {
    if (retryTimer !== null) {
      clearInterval(retryTimer);
      setRetryTimer(null);
    }
  }, [retryTimer]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (retryTimer === null) return;

    const timer = setInterval(() => {
      fetchMoviesHandler();
    }, 5000);

    return () => clearInterval(timer);
  }, [retryTimer, fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <MoviesList movies={movies} />
        )}
      </section>
      {retryTimer !== null && (
        <section>
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
