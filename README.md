# REST Countries API with Color Theme Switcher

This project was built as part of my Week 11 PerScholas bootcamp. The requirements and design were based on the [REST Countries API challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca), which I adapted to practice React, TypeScript, and live API integration.

## Live Demo
https://react-development-project-iota.vercel.app/

## Features
- **React + TypeScript:** Built with functional components and strict typing.
- **React Router:** Navigation between the main list and individual country detail pages.
- **Dark/Light Mode:** Implemented using React Context API and saved to `localStorage` so it persists on refresh.
- **Search & Filter:** Filter countries by name (case-insensitive) and by region (dropdown) entirely on the client side to save API calls.
- **Custom Hooks:** `useCountries` handles paginated API fetching, caching, and de-duplication. `useTheme` simplifies accessing the global theme context.
- **Fully Responsive:** CSS Grid and Flexbox with media queries ensure it works on mobile, tablet, and desktop.
- **API Caching:** The `useCountries` hook caches the fetched data in memory to prevent unnecessary API calls when navigating back and forth.

## Built With
- React (Vite)
- TypeScript
- React Router DOM
- Plain CSS (CSS Variables & Media Queries)
- REST Countries v5 API

## Project Structure

```
rest-countries-react/
├── src/
│   ├── components/
│   │   ├── Controls.tsx       # Search bar and region filter
│   │   ├── CountryCard.tsx    # Individual country card for the grid
│   │   └── CountryDetail.tsx  # Detail page view for a single country
│   ├── context/
│   │   └── ThemeContext.tsx   # Global state for Dark/Light mode
│   ├── hooks/
│   │   ├── useCountries.ts    # Custom hook for fetching & caching API data
│   │   └── useTheme.ts        # Custom hook to access ThemeContext
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces (Country, Theme)
│   ├── App.tsx                # Main routing and layout
│   ├── index.css              # Global styles, CSS variables, and media queries
│   └── main.tsx               # React entry point (wraps App in Providers)
├── .env                       # API key (ignored by Git)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## How to Run Locally
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file in the root directory and add your API key: `VITE_RESTCOUNTRIES_KEY=your_key_here`.
4. Run `npm run dev`.

## Reflection
Honestly, this project was a huge learning curve for me. Even though I've done projects before, this was my first time building a full app from scratch with TypeScript and the REST Countries v5 API, and I definitely made a lot of mistakes before things started clicking.

The biggest headache was dealing with the API's pagination. The free tier only gives you 100 countries at a time, so I knew I had to make multiple requests. At first, I tried using `page=1`, `page=2`, etc., but the app kept breaking. My search bar wouldn't work, and the console was screaming at me about duplicate keys. It took me a while (and a lot of staring at the Network tab, `console.log`s and Google) to figure out the API actually uses an `offset` parameter instead of a page number. Once I switched to 
`offset=0`, `100,` and `200` and used `Promise.all`, everything clicked. I also ran into CORS errors and had to go into my API dashboard to add `localhost` to my allowed origins. That was a whole new thing I had never dealt with before.

Another thing I had to figure out was how to make the search and region filter work without calling the API every single time someone typed a letter. I ended up keeping all 254 countries in state and just using `.filter()` and `.toLowerCase()` on the cached data. It made the app feel super fast and saved my API requests.

If I had more time, I'd definitely replace the plain "Loading..." text with skeleton screens so it feels more professional. I'd also add a "scroll to top" button for the detail page, and maybe write some unit tests with Vitest to make sure my custom hooks don't break if I change something later. Overall, I'm really proud of how it turned out, even though there were a few times I wanted to throw my PC out the window.