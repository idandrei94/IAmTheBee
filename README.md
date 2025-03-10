01: Create the app, setup Tailwind, ShadCN UI and UI basics
02: Prepare some data to work with, courtesy of themoviedb.org (check ./db)
03: Prepare some basic display components for the Home Page, an app skeleton.
04: Get the data in the Home Page through the backend (using Prisma and Neon Postgres). Because the apis are serverless, did a wee bit of WebSocket config sorcery on a custom PrismaClient to make it work. Nothing fancy, just docs stuff (check ./db/prisma.ts)
05: Get the DB data through backend using server actions.
06: Implement some nicer display components for home page and details page. I tried to setup static pages for the movies, but something broke in production. It might be due to the missing images? Might check it again after I move the images from /public to something online. The MovieList components implemented as a simple HoC, to customize the display for movies between generic and "followed" movie lists.
07: Setup login/auth stuff, using Github OAUTH. I'll just validate the admin roles during server actions, as needed.
08: Implement the follow (sort of wishlist) feature. It's not the most efficient thing, but just to get it going. You can separately check the movies you follow, and click the heart to (un)follow across multiple components. If you follow a movie, creating comments will generate notifications for other users. Opening movie details will clear notifications for that movie. - I made a fake client-side component to force updating the notification count. But I'm not sure it's the best solution.... But what else? setInterval useEffect? That'd be a lot of traffic and session/db checking...
09: Implement the rating feature. Nothing special, would be nice to do that smart hover highlight effect.
10: Implement comments. Only input really is the actual content. Just trigger a revalidation on the /movie/\[movieId].
11: Implement Admin pages (probably gonna skip role management and just do it db-side for relevant actions).
12: Implement Admin Movie C(r)UD (with image upload - migrate the image files).
13: Implement Admin can delete any comment.
14: all-MiniLM-L6-v2 - generate semantic similarity scores on movie descriptions (or maybe just titles?). Checking the search query input against the similarity score using the movie db. Current implementation is terrible, and can really eat through your LLM credits. Should limit user queries. Maybe instead of similarity index, use a different model to generate just the
semantic vectors. Generating the vectors separately (night job?) and just returning the closest 5 movie vectors would likely be an effective approach.
15: Use the movie LLM-relations on the details page for suggestions. Basically same as searching, but using an existing movie description for matching.
16: Create a browse page with infinite scrolling. Searching would just get you to the selected movie's details page, should be enough for the purpose.
17: Connect the search bar with LLM suggestions.
18: Implement favorites page, where you can check all the movies you're following. It's more or less the same story as the HomePage, but full favorite list instead of just a handful.

CREDITS:
Thanks to themoviedb.org for the freely available movie data.
