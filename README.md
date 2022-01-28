# Finimize Full-Stack Development Challenge

Forked and Developed by `Mustafa Al Quraishi`

<p align="center">
 <img height="400px" src="https://github.com/mus2711/fullstack-dev-challenge/blob/master/screenshots/Screenshot%202022-01-28%20at%2011.30.24.png">
</p>

<p align="center">
 <img height="400px" src="https://github.com/mus2711/fullstack-dev-challenge/blob/master/screenshots/Screenshot%202022-01-28%20at%2011.30.34.png">
</p>

## App Planning and Development

With this App, I followed the Single Responsibility Principle by considering a component hierarchy of a cascading Calculator that has two toggle modes between Projection and Calculation modes.

- **Calculation Mode**
- `Input what you want to initially want to invest, how much you can invest per month and your annual interest compounded monthly, see how much you could potentially return on your investment.`
- **Projection Mode**
- `Input what you want to initially want to invest, how much you can invest per month and your annual interest compounded monthly, see how much you could potentially return on your investment.`

I aimed to develop a simple UI with sliding inputs for values. Beyond just the provided graph, I provided elements that displayed key figures such as profit.

## The Structure

I restructured the App Architecture by separating the front and back end into `/client` and `/server` directories.

### Client

- Structured .tsx input components in `/components` folder.

### Server

- Broke server down for easier API development by exporting types in `/types` for request and response queries.
- Route functions developed for calculating Projection and Calculation modes under `/renders` folder.

### What I would change on the Front End?

- Change the slider bar colours when toggled in different modes.
- Provide number input to allow for exact custom user input instead of discrete slider levels.
- Reformat the page into 2 columns to allow for all information on a large screen to be seen without having to scroll down.
- More component development to reduce clutter in App.tsx file.
- Figure out what to trigger UseEffect() only when in need of a specific set mode. As of now, the server routes are fetched for both modes despite the need for only one at any time.

### What I would change on the Back End?

- Develop a method to host routes separately instead of direct writing into `server.ts` file.
- Develop `calculationHandler.ts` to include more useful info such as ROI.
