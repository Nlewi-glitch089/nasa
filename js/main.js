//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
//HTTP Request
//GET https://science.nasa.gov/wp-json/wp/v2/apod-basic
//
//concept_tags, hd, and thumbs are now disabled in this service.

//Example query
//https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY

const input = document.getElementById('date-input');
const btn = document.getElementById('nasa-btn');
const dateListEl = document.getElementById('date-list');
const titleEl = document.getElementById('apod-title');
const imgEl = document.getElementById('apod-img');
const descriptionEl = document.getElementById('apod-description');

// DEMO_KEY is nasa's public test key, fine for this assignment (same idea as thecocktaildb's "1")
// this endpoint doesn't take a date param - it just always hands back the last 25 days as an array
const API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY';

// show the user which dates actually exist as soon as the page loads, so they aren't guessing
renderDateList();

btn.addEventListener('click', getPictureOfTheDay);

// fetch the same array once, and list out every date the api gives us as a clickable item
function renderDateList() {
	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			// log the raw array so you can see the shape of what the api actually sends back
			console.log('all available apod entries:', data);

			dateListEl.innerHTML = '';

			data.forEach(entry => {
				const li = document.createElement('li');
				li.textContent = entry.date;
				// clicking a date just fills the input - the "Get Picture" button is still
				// what actually fetches and shows the picture, same as if the user typed the date themselves
				li.addEventListener('click', () => {
					input.value = entry.date;
				});
				dateListEl.appendChild(li);
			});
		})
		.catch(err => {
			console.log(`error: ${err}`);
		});
}

function getPictureOfTheDay() {
	const date = input.value.trim();
	if (!date) return;

	fetch(API_URL)
		.then(res => res.json())
		.then(data => {
			// data is an array of the last 25 days of pictures, each with its own date property
			// find() digs through that array and hands back the one entry that matches the date the user typed
			const picture = data.find(entry => entry.date === date);

			// log what find() actually handed back, so you can see the single object it pulled out of the array
			console.log('picture found for', date, ':', picture);

			if (picture) {
				showPicture(picture);
			} else {
				showError('No picture found for that date (this api only keeps the last 25 days).');
			}
		})
		.catch(err => {
			console.log(`error: ${err}`);
		});
}

function showPicture(picture) {
	// dot notation pulls each piece we need straight off the picture object
	console.log(`showing "${picture.title}" from ${picture.date}`);

	titleEl.textContent = picture.title;
	// hdurl is the actual image file - "url" on this endpoint is just a link to the article page
	imgEl.src = picture.hdurl;
	imgEl.alt = picture.title;
	descriptionEl.textContent = picture.explanation;
}

function showError(message) {
	titleEl.textContent = 'No picture found';
	imgEl.src = '';
	imgEl.alt = '';
	descriptionEl.textContent = message;
}
