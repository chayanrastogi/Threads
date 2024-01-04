import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	localStorage.setItem("jwt", token);

	res.cookie("jwt", token, {
		httpOnly: true, // more secure
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict", // CSRF
		domain: "https://threads-server-zh1c.onrender.com", // Set the correct domain
		secure: true,
	});

	return token;
};

export default generateTokenAndSetCookie;
