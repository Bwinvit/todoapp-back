import express from "express"
import { login, profile, register } from "../API/AuthAPI.js"

export const AuthRouter = express.Router()

AuthRouter.post("/login", login)
AuthRouter.post("/register", register)
AuthRouter.post('/profile', profile)