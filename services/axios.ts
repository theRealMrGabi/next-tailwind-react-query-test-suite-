import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosInstance,
} from "axios";
import { _getToken, showToast } from "@utils";

let that: any;

export const baseURL = process.env.NEXT_PUBLIC_BASEURL!;

class ApiService {
	private service: AxiosInstance;
	hide: any;
	constructor() {
		const service = axios.create({
			baseURL: `whatever api base url you want to append, include this in your .env.local`,
			withCredentials: false,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Origin": baseURL,
			},
		});

		service.interceptors.response.use(this.handleSuccess, this.handleError);
		service.interceptors.request.use((config: AxiosRequestConfig) => {
			const token = _getToken();
			if (!token) return config;

			//@ts-ignore
			config.headers["Authorization"] = "Bearer " + token;
			return config;
		});

		this.service = service;
		that = this;
	}

	handleSuccess(response: AxiosResponse) {
		if (that.hide) that.hide && that.hide();
		// if (response?.data?.message) showToast(response?.data?.message, "success");
		return response;
	}

	handleError = (error: AxiosError) => {
		if (error?.response === undefined)
			showToast("No internet connection", "error");
		else {
			// let message = "";
			const status = error?.response?.status;
			// message = error?.response?.data?.responseText;

			//@ts-ignore
			const errorMessage = error.response.data?.error;
			showToast(errorMessage, "error");

			if (status && status === 401) {
				localStorage.clear();
				sessionStorage.clear();
				window.location.href = "/login";
			}
		}

		if (that.hide) that.hide && that.hide();
		return Promise.reject(error?.response?.data);
	};

	request(
		method:
			| "GET"
			| "get"
			| "delete"
			| "DELETE"
			| "head"
			| "HEAD"
			| "options"
			| "OPTIONS"
			| "post"
			| "POST"
			| "put"
			| "PUT"
			| "patch"
			| "PATCH"
			| "link"
			| "LINK"
			| "unlink"
			| "UNLINK"
			| undefined,
		path: string,
		callback: any,
		errorCallback: any,
		payload?: AxiosRequestConfig
	) {
		if (method === "GET" || method === "get") {
			return this.service
				.request({
					method,
					url: path,
					responseType: "json",
				})
				.then(
					(response: { data: AxiosResponse }) => callback(response.data),
					errorCallback
				);
		} else {
			return this.service
				.request({
					method,
					url: path,
					responseType: "json",
					data: payload,
				})
				.then(
					//@ts-ignore
					(response: { data: AxiosResponse }) => callback(response?.data),
					errorCallback
				);
		}
	}
}

export default new ApiService();
