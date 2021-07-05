const defualt_picture_url =
	"https://i.picsum.photos/id/12/260/260.jpg?hmac=1Zv9uKwajEY-zLB8ZMWgT-GSZFdLRBhHzxzTGx208iU";

const profile = (state = defualt_picture_url, action) => {
	switch (action.type) {
		case "CHANGE_AVATAR":
			return action.payload;

		default:
			return state;
	}
};

export default profile;
