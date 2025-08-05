import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("token", token, {
		httpOnly: true, // Prevent JS access
		secure: process.env.NODE_ENV !== "development", // Required for cross-origin
		sameSite: "None", // Allow cross-site cookies
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
	});
};
