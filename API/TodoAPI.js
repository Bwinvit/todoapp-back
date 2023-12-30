import Todo from "../DataBase/Models/TodoSchema.js";
import Auth from "../DataBase/Models/AuthSchema.js";

export const createTodo = async (req, res, next) => {
    const { title, description, userId } = req.body;

    try {
        const newTodo = new Todo({
            title,
            description,
            completed: false,
            userId,
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        console.error("Error creating todo:", err);
        res.status(500).json({ error: "Failed to create todo" });
    }
};

export const getTodo = async (req, res, next) => {
    const { id } = req.body;

    try {
        const todo = await Todo.find({ userId: id }).sort({ createdAt: 1 });
        res.json({ todo: todo });
    } catch (err) {
        console.error("Error fetching todo:", err);
        res.status(500).json({ error: "Failed to fetch todo" });
    }
};

export const doneTodo = async (req, res, next) => {
    const { todoId } = req.body;

    try {
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        todo.completed = true;

        try {
            await todo.save();
            res.json({ message: "Todo marked as complete" });
        } catch (err) {
            console.error("Error updating todo:", err);
            res.status(500).json({ error: "Failed to update todo" });
        }
    } catch (err) {
        console.error("Error fetching todo:", err);
        return res.status(500).json({ error: "Failed to fetch todo" });
    }
};
