'use strict';

const success = (position) => {
	const crd = position.coords;
	const latitude = crd.latitude;
	const longitude = crd.longitude;

	getLocation(latitude, longitude);
};

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

const position = navigator.geolocation.getCurrentPosition(
	success,
	error,
	options
);

function getLocation(latitude, longtitude) {
	const cityApi = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longtitude}&format=json&addressdetails=1&accept-language=ru`;
	fetch(cityApi)
		.then((response) => response.json())
		.then((data) => {
			const city =
				data.address.city || data.address.town || data.address.village;
			console.log(city);
			displayCity(city);
		})
		.catch((error) => {
			console.log(error);
		});
}

function displayCity(city) {
	const cityElement = document.getElementById('city');
	cityElement.innerText = `${city}`;
}
