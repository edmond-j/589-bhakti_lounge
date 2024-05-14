import {useDispatch} from "react-redux";
import {setToken, clearToken}  from "./tokenSlice.js";
const API_URL = "/api/v1/auth/";
const dispatch = useDispatch();

// Function to register a new user
const signup = (username, email, password) => {
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
/*				firstname: firstname,
				lastname: lastname*/
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
export const login = async (username, password) => {
	fetch(API_URL + "signin", {
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
		})
		.then(data => {
			if (data.token) {
				dispatch(setToken(data.token))
			}
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};


export const logout = async () => {
	await dispatch(clearToken());
};

// Exporting the functions as an object

