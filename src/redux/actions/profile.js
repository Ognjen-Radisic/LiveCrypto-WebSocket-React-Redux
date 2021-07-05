export const fetchNewAvatar = () => async (dispatch) => {
	try {
		const url = "https://picsum.photos/260/260";
		const response = await fetch(url);
		const newImage = response.url;
		dispatch({ type: "CHANGE_AVATAR", payload: newImage });
	} catch (error) {
		console.log(error);
	}
};
