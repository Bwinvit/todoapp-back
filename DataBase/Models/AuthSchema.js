import mongoose from "mongoose"

const AuthSchema = new mongoose.Schema({
      username: {
            type: String,
            require: true,
      },
      password: {
            type: String,
            require: true
      }
})

export default mongoose.model("Auth", AuthSchema)