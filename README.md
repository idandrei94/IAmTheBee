01: Create the app, setup Tailwind, ShadCN UI and UI basics
02: Prepare some data to work with, courtesy of themoviedb.org (check ./db)
03: Prepare some basic display components for the Home Page
04: Get the data in the Home Page through the backend (using Prisma and Neon Postgres). Because the apis are serverless, did a wee bit of WebSocket config sorcery on a custom PrismaClient to make it work. Nothing fancy, just docs stuff (check ./db/prisma.ts)
05: Get the DB data through backend using server actions.
06: Implement some nicer display components for home page and details page.
07: Setup login/auth stuff, using Github OAUTH. I'll just validate the admin roles during server actions.
08: Implement the follow (sort of wishlist) feature. It's not the most efficient thing, but just to get it going. At least I only validate the user movie list once in the page, and pass that along to whatever display components need the information.
09: Implement the rating feature.
10: Implement comments.
11: Implement Admin pages (probably gonna skip role management and just do it db-side for relevant actions).
12: Implement Admin Movie C(r)UD (with image upload).
13: Implement Admin can delete any comment.
14: Pick an LLM (Perplexity??), create connections between movies. Without some more specific usecases, I'm rather uncomfortable with directly searching via LLM. I could limit it to registered users, I could add some sort of rate limits. I'm rather partial towards just LLM'ing movies when they are created.
15: Use the movie LLM-relations on the details page for suggestions.
16: Create a browse and search pages with infinite scrolling.
17: Connect the search bar with suggestions.
18: Implement favorites page, where you can check all the movies you're following

CREDITS:
Thanks to themoviedb.org for the freely available movie data.
