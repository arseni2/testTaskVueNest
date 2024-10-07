import axios from "axios";

export const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 10000,
	headers: {
		"Content-Type": "application/json"
	}
});

instance.interceptors.request.use(config => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
});

instance.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			window.location.href = "/auth";
		}
		return Promise.reject(error.response ? error.response.data : error);
	}
);
