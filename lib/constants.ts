export const APP_NAME = 'IAmTheBee';
export const APP_DESC = 'IAmTheBee - Just a little IMDB Wanna-Bee';
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `${process.env.NEXT_PUBLIC_BASE_URL}`;