# README

## Welcome!

[Poll Everyone][live], a clone of [Poll Everywhere][original], is a live polling / survey web application that allows:

* presenters to create and edit multiple choice questions, and organize them into groups
* participants to answer activated polls from their own devices via a custom link
* audiences and presenters to view results in real time

## Technologies Used

* Backend
    * Ruby on Rails
    * Action Cable (WebSockets)
    * PostgreSQL
    * GraphQL Ruby with batch loading (in combination with RESTful routing)
* Frontend
    * React & React-Router
    * Redux for UI state management
    * React Query & Relay for data fetching & caching
    * Recharts for graphing poll results
    * SCSS

## Highlights

* Custom list order management using SQL window functions & more ([Orderable][orderable])
* Many custom hooks ([See here][hooks])
* A highly customized Recharts graph with dynamic sizing and labeling ([check it out][graph])
* Some overkill, [like waiting a second][font-loading] to render until the font has loaded (no [FOUT][fout]😤) and [prefetching][prefetch-hook] dynamic [imports][prefetch-import] in routed [components][prefetch-component].

## Notes

* Poll Everywhere has undergone a redesign since I cloned it; [check out these screen grabs][screens] to see the previous design.

* I'd recommend testing the realtime results by using two devices or browsers: presenting on one, and participating on the other

* Right now, data fetching and caching is done with Relay for the dashboard, and with React Query for the other pages, as well as for all data mutations.
    * I started with Redux-only, using Redux Thunk middleware for API-related actions.
    * Then, I looked into caching-oriented solutions and converted everything to React Query.
    * Finally, I wanted to learn GraphQL, and was curious about the React Suspense integration provided by Relay, so I partially migrated over to Relay / GraphQL
    * Because of this in-progress, hybrid solution, I didn't implement optimistic updates for mutations made on the dashboard.

## Next Steps

* Complete GraphQL implementation

* Improve accessibility

* Add drag and drop functionality to polls in the polls index

* Build out poll configurations and settings



[live]: https://poll-everyone.herokuapp.com/
[original]: https://www.polleverywhere.com/
[orderable]: ./app/models/concerns/orderable.rb
[hooks]: ./app/frontend/hooks
[graph]: app/frontend/components/polls/polls_show/presentation_graph.js
[font-loading]: ./app/frontend/packs/application.js#L9
[fout]: https://en.wikipedia.org/wiki/Flash_of_unstyled_content
[prefetch-import]: ./app/frontend/components/lazy_load_index.js
[prefetch-hook]: ./app/frontend/hooks/effect.js#L17
[prefetch-component]: ./app/frontend/components/polls/polls_index.js#L26
[screens]: https://ibb.co/album/dt6S7j