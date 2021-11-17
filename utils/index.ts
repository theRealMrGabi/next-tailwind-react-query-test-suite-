import cogoToast from "cogo-toast";
import jwt_decode from "jwt-decode";

/**Since Next.JS is a Server Side Rendering (SSR) App, Windows object doesn't exist on the server, and any Windows property will break while rendering from server, hence the need to prefix pathName to any window object */
export const pathName = () => typeof window !== "undefined" && window;

/**This is used to forcefully clear a users data from session and local storage and optionally push them to the login screen */
export const _clearData = ({ pushToLogin = true }) => {
	pathName() && localStorage.clear();
	pathName() && sessionStorage.clear();
	if (pushToLogin) {
		window.location.href = "/login";
	}
	return false;
};

export const _getToken = () => {
	const token = pathName() && localStorage.getItem("token");

	if (!token) return false;
	if (token) {
		const decodedToken: any = jwt_decode(token);
		// const tokenExpiryTime = new Date(decodedToken.exp * 1000);
		const tokenExpired = decodedToken.exp * 1000 === new Date().valueOf();
		if (tokenExpired) {
			_clearData({ pushToLogin: true });
		}
	}
	return token;
};

export const _isAnEmptyObject = (obj: any) => {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
};

export const _getUser = () => {
	const stringifiedUser: any = pathName() && localStorage.getItem("user");
	const localUser: any = JSON.parse(stringifiedUser);
	const user = _isAnEmptyObject(localUser) ? false : localUser;
	return user;
};

export const _isUserLoggedIn = () => {
	const user = _getUser();
	if (!_isAnEmptyObject(user) && _getToken()) {
		return true;
	}
	return false;
};

export const showToast = (
	message: string,
	type: "success" | "info" | "loading" | "warn" | "error"
) => {
	switch (type) {
		case "success":
			cogoToast.success(message, { position: "top-right", hideAfter: 5 });
			break;
		case "info":
			cogoToast.info(message, { position: "top-right", hideAfter: 5 });
			break;
		case "loading":
			cogoToast.loading(message, { position: "top-right", hideAfter: 5 });
			break;
		case "warn":
			cogoToast.warn(message, { position: "top-right", hideAfter: 5 });
			break;
		case "error":
			cogoToast.error(message, { position: "top-right", hideAfter: 5 });
			break;

		default:
			cogoToast.info(message, { position: "top-right", hideAfter: 5 });
			break;
	}
};

export const _copyToClipboard = (str: any, message?: any) => {
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
	// return showToast(message || "Copied", "info");
	return;
};

export const _textCapitalize = (text: string) => {
	return text && text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const _wordsCapitalize = (words: string) => {
	const newWord = words
		.toLowerCase()
		.split(" ")
		.map((word) => _textCapitalize(word))
		.join(" ");
	return newWord;
};

export const _removeUnderscore = (word: string) => word?.split("_").join(" ");
