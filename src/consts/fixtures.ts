import {
  APIMovieResultByTitle,
  APISingleMovieResultBySearch,
  FireDBMovieItem,
} from '../types/APITypes';
import { AuthUserType } from '../types/AuthTypes';

export const movies: FireDBMovieItem[] = [
  {
    id: '1234567',
    name: 'The Dark Knight',
    watched: true,
    dateWatched: '234567890',
    whatYouLearnt: 'The world is as good as we let it to be',
    Poster: 'https://image.com',
    createdAt: '9876543',
  },
  {
    id: '4567890',
    name: 'GodFather',
    watched: false,
    dateWatched: '98765434567',
    whatYouLearnt: 'You can act like a man what is the matter with you?',
    Poster: 'https://godfather.com',
    createdAt: '987654567890',
  },
  {
    id: '9ikjnbvfrty',
    name: 'Avengers: EndGame',
    watched: false,
    dateWatched: '',
    whatYouLearnt: 'Thanos will be defeated',
    Poster: 'https://avengers.com',
    createdAt: '69864123340404',
  },
];

export const myUser: AuthUserType = {
  user: {
    name: 'Tanzeel',
    email: 'tanzeelahmed550@gmail.com',
    passion: 'Web Dev',
    os: 'Kali Linux',
    version: '1.0.0',
    height: 5.5,
  },
};

export const skills1 = [
  'Web Design',
  'JavaScript Developer',
  'React JS',
  'Rest API',
  'NodeJS',
];

export const skills2 = ['Company', 'Team', 'Careers'];

export const email = 'unknownPerson123@uet.com';
export const password = 'JonSnow';
export const nameOfTheMovie = 'Godfather';

export const movieFromAPIByTitle: APIMovieResultByTitle = {
  Title: 'The Dark Knight',
  Year: '2008',
  Rated: 'PG-13',
  Released: '18 Jul 2008',
  Runtime: '152 min',
  Genre: 'Action, Crime, Drama, Thriller',
  Director: 'Christopher Nolan',
  Writer:
    'Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)',
  Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine',
  Plot:
    'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  Language: 'English, Mandarin',
  Country: 'USA, UK',
  Awards: 'Won 2 Oscars. Another 157 wins & 163 nominations.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '9.0/10' },
    {
      Source: 'Rotten Tomatoes',
      Value: '94%',
    },
    { Source: 'Metacritic', Value: '84/100' },
  ],
  Metascore: '84',
  imdbRating: '9.0',
  imdbVotes: '2,341,244',
  imdbID: 'tt0468569',
  Type: 'movie',
  DVD: '14 Jun 2010',
  BoxOffice: '$534,858,444',
  Production: 'Syncopy',
  Website: 'N/A',
  Response: 'True',
};

export const moviesFromAPIBySearch: APISingleMovieResultBySearch[] = [
  {
    Title: 'The Dark Knight',
    Year: '2008',
    imdbID: 'tt0468569',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'The Dark Knight Rises',
    Year: '2012',
    imdbID: 'tt1345836',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',
  },
  {
    Title: 'Batman: The Dark Knight Returns, Part 1',
    Year: '2012',
    imdbID: 'tt2313197',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg',
  },
  {
    Title: 'Batman: The Dark Knight Returns, Part 2',
    Year: '2013',
    imdbID: 'tt2166834',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
  },
  {
    Title: 'Batman: The Dark Knight Returns',
    Year: '2013',
    imdbID: 'tt11060882',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjExMGE4NDQtM2MwMS00YzhlLTlkYjgtNmExNzM1ZDBhYzg1XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_SX300.jpg',
  },
];
