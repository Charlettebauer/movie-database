import './index.css'

import React, { useEffect, useState } from 'react'

import Movie from './components/Movie'

const POPULAR_API = 'https://api.themoviedb.org/3/discover/movie?sort=popularity.desc&api_key=d5fd3296592039d98783a240a1c1d43f'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d5fd3296592039d98783a240a1c1d43f&query=$'

function App () {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState([])

  useEffect(() => {
    getMovies(POPULAR_API)
  }, [])

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === []) {
          console.log('This is an empty array!')
          setError({ type: 'error', message: 'There are no movies that match that search. Sorry try again!' })
        } else { setMovies(data.results) }
      })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm)

      setSearchTerm('')
    }
  }

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div className='Title' htmlFor='title'>The Wonderful World of Movies</div>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            className='search'
            type='text' placeholder='Search for a movie...'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className='movie-container'>
        {setError &&
          <h3 className='error'>{setError}</h3>}
        {/* mapped over the movies and for each create a movie component */}
        {movies.length > 0 &&
      movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  )
}
export default App
