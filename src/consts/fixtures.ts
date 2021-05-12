import { FireDBMovieItem } from '../types/APITypes';

export const movies: FireDBMovieItem[] = [
  {
    id: '1234567',
    name: 'The Dark Knight',
    watched: true,
    dateWatched: 234567890,
    whatYouLearnt: 'The world is as good as we let it to be',
    Poster: 'https://image.com',
    createdAt: 9876543,
  },
  {
    id: '4567890',
    name: 'GodFather',
    watched: false,
    dateWatched: 98765434567,
    whatYouLearnt: 'You can act like a man what is the matter with you?',
    Poster: 'https://godfather.com',
    createdAt: 987654567890,
  },
];

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
