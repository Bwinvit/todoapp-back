import express from "express";
import { createTodo, doneTodo, getTodo } from "../API/TodoAPI.js";

export const TodoRoute = express.Router()

TodoRoute.post("/create", createTodo)
TodoRoute.post("/get", getTodo)
TodoRoute.put("/done", doneTodo)