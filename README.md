# Finimize Full-Stack Development Challenge

Forked and Developed by `Mustafa Al Quraishi`

<p align="center">
   <img height="400px" src="https://github.com/mus2711/fullstack-dev-challenge/blob/master/screenshots/Screenshot%202022-01-28%20at%2011.30.24.png">
</p>

<p align="center">
    <img height="400px" src="https://github.com/mus2711/fullstack-dev-challenge/blob/master/screenshots/Screenshot%202022-01-28%20at%2011.30.34.png">
</p>

## App Planning and Development

With this App I followed a the Single Reponsibility Principle by considering a component hierarchy of a cascading Calculator that has two toggle modes between Projection and Calculation modes.

- **Calculation Mode**
  - `Input what you want to intially want to invest, how much you can invest per month and your annual interest compounded monthly, see how much you could potentially return on your investment.`
- **Projection Mode**
  - `Input what you want to intially want to invest, how much you can invest per month and your annual interest compounded monthly, see how much you could potentially return on your investment.`

I aimed to develop a simple UI with sliding inputs for values. Beyond just the provided graph, I provided elements that displayed key figures such as profit.

## The Stucture

I restructured the App Architecture by seprating the front and back end into `/client` and `/server` directories.

### Client

- Structured .tsx input components in `/components` folder.

### Server

- Broke server down for easier API developemnt by exporting types in `/types` for request and response queries.
- Route functions developed for calculating Projection and Calculation modes under `/renders` folder.

### What I would change on the Front End?

- Change the slider bar colours when toggled in different modes.
- Provide number input to allow for exact custom user input instead of discrete slider levels.
- More component development to reduce clutter in App.tsx file.
- Figure out what to trigger UseEffect() only when in need for specfic set mode. As of now the server routes are fetched for both modes despite the need for only at at any time.

### What I would change on the Back End?

- Develop method to host routes seperately instead of direct writing into `server.ts` file.
