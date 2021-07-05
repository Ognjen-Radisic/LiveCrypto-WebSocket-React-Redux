import { Button } from "@material-ui/core";
import React, { useState } from "react";
import defaultImg from "../assets/laptop.jpg";

const url = "https://picsum.photos/260/260";

const ProfileInfo = () => {
	const [avatarImg, setAvatarImg] = useState(defaultImg);

	const fetchNewAvatar = async () => {
		try {
			const response = await fetch(url);
			const newImage = response.url;
			setAvatarImg(newImage);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="profile-page">
			<img src={avatarImg} alt="avatar_img" className="profile-page__avatar" />
			<h4 className="profile-page__name">Ognjen Radisic</h4>
			<p className="profile-page__email">radisicognjen@gmail.com</p>
			<p
				className="profile-page__link"
				onClick={() =>
					window.open("https://github.com/Ognjen-Radisic", "_blank")
				}>
				https://github.com/Ognjen-Radisic
			</p>
			<div className="profile-page__btn-container">
				<Button
					variant="contained"
					color="primary"
					onClick={() => fetchNewAvatar()}>
					Shuffle&nbsp;avatar
				</Button>
			</div>
		</div>
	);
};

export default ProfileInfo;
