import React, { useState } from "react";

const AddMovieForm = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const addMovieHandler = (event) => {
    event.preventDefault();
    onAddMovie(newMovie);
    setNewMovie({
      title: "",
      openingText: "",
      releaseDate: "",
    });
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={addMovieHandler}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newMovie.title}
          onChange={inputChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="openingText">Opening Text:</label>
        <textarea
          id="openingText"
          name="openingText"
          value={newMovie.openingText}
          onChange={inputChangeHandler}
        ></textarea>
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={newMovie.releaseDate}
          onChange={inputChangeHandler}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
