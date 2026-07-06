const express = require("express");
const app = express();
const  {initializeDatabase} = require("./db/db.connect");
const Movie = require("./models/movie.models");
app.use(express.json());
initializeDatabase();


// find a movie with a Particular title
async function readMovieByTitle(movieTitle){
  try{
    const movie = await Movie.findOne({title: movieTitle});
    return movie;
  } catch(error){
    throw error
  }
}

app.get("/movies/:title", async (req,res) => {
  try{
    const movie = await readMovieByTitle(req.params.title);
    if(movie){
      res.json(movie);
    } else{
      res.status(404).json({error: "movie not found"});
    }
  } catch(error){
    res.status(500).json({error: "failed to fetch movie by title"})
  }
}) 

// to get all the movies in database
async function readAllMovies(){
    try{
      const allMovies = await Movie.find()
      return allMovies;
    } catch(error){
        throw error
    }
}
app.get("/movies", async (req,res) => {
    try{
        const movies = await readAllMovies();
        if(movies.length != 0){
          res.json(movies)
        } else{
          res.status(404).json({error: "No movies found"});
        }
    } catch(error){
        res.status(500).json({error: "failed to fetch movies"});
    }
});

async function readMovieByDirector(directorName){
    try{
      const movieByDirector = await Movie.find({director: directorName});
      return movieByDirector;
    } catch(error){
        throw error
    }
}

app.get("/movies/director/:directorName", async (req,res) => {
    try{
        const movies = await readMovieByDirector(req.params.directorName);
        if(movies.length != 0){
            res.json(movies);
        } else{
            res.status(404).json({error: "No movies found"});
        }
    } catch(error){
        res.status(500).json({error: "failed to fetch movie"});
    }
});

async function readMoviesByGenre(genreName){
    try{
      const moviesByGenre = await Movie.find({genre: genreName});
      return moviesByGenre;
    } catch(error){
        throw error
    }
}

app.get("/movies/genre/:genreName", async (req,res) => {
    try{
        const movies = await readMoviesByGenre(req.params.genreName);
        if(movies.length != 0){
            res.json(movies);
        } else{
            res.status(404).json({error: "No movies found"});
        }
    } catch(error){
        res.status(500).json({error: "failed to fetch movies"});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});