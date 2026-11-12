# NASA Astronomy Picture Lookup

A small browser-based exercise using NASA's Astronomy Picture of the Day (APOD) data. The page lets users enter a date or choose from the dates currently listed, then displays the matching image, title, and explanation.

## How it works

- Loads a list of recent APOD entries from NASA's public APOD service.
- Shows the dates returned by that service as clickable choices.
- Looks up the selected date in the returned list.
- Displays the image, title, and description for a matching entry.

**Current API limitation:** the date list used by this project contains only the recent entries returned by the NASA WordPress endpoint (currently about 25 days). It does not provide a full historical date archive through that list.

## Technology

- HTML
- CSS
- JavaScript (Fetch API)
- NASA APOD public API

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Nlewi-glitch089/nasa.git
   cd nasa
   ```

2. Open `index.html` in a modern browser.

No dependencies or build step are required. Internet access is needed to request NASA's data and load the images.

## Hosting

This is a static site and can be deployed to GitHub Pages, Netlify, or another static hosting provider.

### Netlify

1. Import the repository into [Netlify](https://app.netlify.com/).
2. Leave the build command empty.
3. Set the publish directory to the repository root (`.`).
4. Deploy and test the date list and image lookup.

The code uses NASA's public `DEMO_KEY`, which is rate-limited. For regular or higher-volume use, request a personal API key from [NASA](https://api.nasa.gov/) and replace the demo key in `js/main.js`. A browser-side key is visible to visitors, so use the public demo key only for this simple learning project.

There is no verified live-demo URL recorded in this repository yet. Add the deployed URL after confirming the site works.