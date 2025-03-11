What this application does:
A simple IMDB clone, featuring login using Github, an Admin role, and the ability to rate, comment or follow movies.
Admins can create, edit or delete movies, and can delete any comment.
Logged in users can follow movies, they can rate and comment on them. A user can delete or update their own comment.

1. Home
   Shows a list of movies, grouped by trending, new, and favorites. Also features an infinite scroller.
2. Movie Details
   Shows the details for a movie. Also features the comments section.
   The movie details page shows up to 6 movie recommendations, generated through the LLM. I would prefer to generate/update similarities on movie creation and store them in the database instead of querying the LLM API every time.
3. Admin Dashboard
   See/Delete movies. Protected by the admin role. Check the middleware, the solution is a little... hacky.
4. Admin Create/Edit movie
   Add a new movie, or update an existing one. Featuring image uploads. The image upload is in need of some sort of cleanup function, or you can over time fill the storage with unused images.

Services Used:
[Neon Postgres](https://console.neon.tech) Database for persistence
[Uploadthing](https://uploadthing.com) for image uploads
Github as OAUTH2 Provider
[HuggingFace](https://huggingface.co/) - For the LLM API. Using the all-MiniLM-L6-v2 model for similarity vectors/scores.

A rough sketch of my thought process:

1.  Create the app, setup Tailwind, ShadCN UI and UI basics
2.  Prepare some data to work with, courtesy of themoviedb.org (check ./db)
3.  Prepare some basic display components for the Home Page, an app skeleton.
4.  Get the data in the Home Page through the backend (using Prisma and Neon Postgres). Because the apis are serverless, did a wee bit of WebSocket config sorcery on a custom PrismaClient to make it work. Nothing fancy, just docs stuff (check ./db/prisma.ts)
5.  Get the DB data through backend using server actions.
6.  Implement some nicer display components for home page and details page. I tried to setup static pages for the movies, but something broke in production. It might be due to the missing images? Might check it again after I move the images from /public to something online. The MovieList components implemented as a simple HoC, to customize the display for movies between generic and "followed" movie lists.
7.  Setup login/auth stuff, using Github OAUTH. I'll just validate the admin roles during server actions, as needed.
8.  Implement the follow (sort of wishlist) feature. It's not the most efficient thing, but just to get it going. You can separately check the movies you follow, and click the heart to (un)follow across multiple components. If you follow a movie, creating comments will generate notifications for other users. Opening movie details will clear notifications for that movie. - I made a fake client-side component to force updating the notification count. But I'm not sure it's the best solution.... But what else? setInterval useEffect? That'd be a lot of traffic and session/db checking...
9.  Implement the rating feature. Nothing special, would be nice to do that smart hover highlight effect.
10. Implement comments. Only input really is the actual content. Just trigger a revalidation on the /movie/\[movieId].
11. Implement Admin pages (probably gonna skip role management and just do it db-side for relevant actions). It's not great cuz it slows down the middleware. Would be better to have the role embedded in the access token, or open up a session after OATH2 login.
12. Implement Admin Movie C(r)UD (with image upload - migrate the image files).
13. Implement Admin can delete any comment.
14. all-MiniLM-L6-v2 - generate semantic similarity scores on movie descriptions (or maybe just titles?). Checking the search query input against the similarity score using the movie db. Current implementation is terrible, and can really eat through your LLM credits. Should limit user queries. Maybe instead of similarity index, use a different model to generate just the
    semantic vectors. Generating the vectors separately (night job?) and just returning the closest 5 movie vectors would likely be an effective approach.
15. Use the movie LLM-relations on the details page for suggestions. Basically same as searching, but using an existing movie description for matching.
16. Create a browse page with infinite scrolling. Searching would just get you to the selected movie's details page, should be enough for the purpose.
17. Connect the search bar with LLM suggestions.
18. Implement favorites page, where you can check all the movies you're following. It's more or less the same story as the HomePage, but full favorite list instead of just a handful.

CREDITS:
themoviedb.org - for the freely available movie data.
dummyjson.com - random quotes to use as fake movie comments.
