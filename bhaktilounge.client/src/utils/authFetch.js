const authFetch = (url, token, options = {}) => {
	const defaultHeaders = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	};

	const mergedOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

	return fetch(url, mergedOptions);
};

export default authFetch;