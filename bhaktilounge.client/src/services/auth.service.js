const API_URL = "/api/v1/auth/";

// Function to register a new user
const signup = (username, email, password, firstname, lastname) => {
	return fetch(API_URL + "signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body:
			JSON.stringify({
				username: username,
				email: email,
				password: password,
				firstname: firstname,
				lastname: lastname
			}),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

// Function to login a user
const signin = (username, password) => {
	return fetch(API_URL + "signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			if (data.accessToken) {
				localStorage.setItem("user", JSON.stringify(data));
			}
			return data;
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};


const signout = () => {
	localStorage.removeItem("user");
};

// Exporting the functions as an object
export default {
	signup,
	signin,
	signout,
};
