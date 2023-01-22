import mongoose from "mongoose"

export interface User {
    id: string,
    name: string,
    email: string,
    image: string
}

const userSchema = new mongoose.Schema<User>({
    id: {type: String, required:true},
    name: {type: String, required:true},
    email: {type: String, required:true},
    image: {type: String, required:true},
})


export default mongoose.models?.User || mongoose.model("User", userSchema)