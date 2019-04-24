## BookStore App

## Available Scripts

In order to run the application you must first start the REST Api server which gives both live and cached search results and can be found in the project directory. Navigate to the `server` folder and run the following in a terminal:

### `yarn install`
### `yarn start`

Navigate back to the base folder of the project and again install and start the development server:
### `yarn install`
### `yarn start`<br>

Ensure you have an internet connection, then open a browser to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage and Elements

In the search input element you must type at least (3) characters before the application will respond. The UI is minimal, however given the data source much more can be accomplished. The UI consists of four React components each of which is specialized for its intended View:

    App.js - a search component for additional books
    BookDetails.js - a component for an individual book
    BookShelf.js - which holds the user's collection
    NavBar.js - which has limited navigation to the search and bookshelf

Most user interaction is accomplished with clicking upon either a book image, a link or a select element. Given that nothing is perfect, at times an image or field in the data is missing but the user is notified by seeing placeholders.

## Libraries Used

Aside from the obvious ReactJS the other libraries include are:

    react-router-dom - for routing the views
    axios - for AJAX requests
    react-select - for a consistent UI element across the views that use it.

## Future maintainence

I intend to update this repo until I am satisfied with the quality of both the application logic and visual elements. Well that's about all I can say. Take care for now.

N.