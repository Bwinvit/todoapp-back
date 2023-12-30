import Auth from "../DataBase/Models/AuthSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await Auth.findOne({ username });

        if (!user) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret, {
            expiresIn: "1h",
        });

        res.status(200).json({
            message: "Login successful",
            userInfo: { userId: user._id, username: user.username },
            token: token,
        });
    } catch (err) {
        next(err);
    }
};

export const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const existingUser = await Auth.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: "Username already used" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Auth({
            username: username,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
            expiresIn: "1h",
        });
        res.cookie("authToken", token);

        res.json({ message: "Registration successful" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed" });
    }
};

export const profile = async (req, res, next) => {
    const { id } = req.body;
    console.log("🚀 ~ file: AuthAPI.js:72 ~ profile ~ id:", id);

    try {
        const user = await Auth.findById({ _id: id });
        res.json({ username: user.username, id: user._id });
    } catch (err) {
        console.log(err);
    }
};
