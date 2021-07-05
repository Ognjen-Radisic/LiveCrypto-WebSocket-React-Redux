import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchNewAvatar } from "../redux/actions/profile";

const ProfileInfo = () => {
	const dispatch = useDispatch();
	const profilePicture = useSelector((state) => state.profile);
	const [avatarImg, setAvatarImg] = useState(profilePicture);

	const generateNewPicture = () => {
		dispatch(fetchNewAvatar());
	};

	useEffect(() => {
		setAvatarImg(profilePicture);
	}, [profilePicture]);

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
					onClick={() => generateNewPicture()}>
					Shuffle&nbsp;avatar
				</Button>
			</div>
		</div>
	);
};

export default ProfileInfo;
