import mongoose, { LeanDocument } from "mongoose"
import User from "./User"

const _db:any = mongoose.connect(process.env.MONGODB_URL!, () => {console.log(`connected to mongodb`)})
export interface IUser {
    id: string,
    name: string,
    email: string,
    image: string
}

export default class Database {


    public db
    public models

    constructor() {
        if (_db) {
            this.db = _db
            console.log("db existed")
        } else {
            this.db =  mongoose.connect(process.env.MONGODB_URL!)
            console.log("db created")
        }
        this.models = {
            User: User
        }
        console.log("db invoked")
    }
    // addModel(_model:object) {
    //     return this.models
    // }

    async checkUserExists(_email:string):Promise<boolean> {
        console.log("checkUseExists invoked")
        const user = await this.models.User.find({email: _email}).exec()
        if (user.length > 0) {
            return true
        }
        return false
    }

    async createUser(_user:IUser):Promise<IUser> {
        console.log("createUser invoked")
        const isDupe = await this.checkUserExists(_user.email)
        if (isDupe) {throw new Error("User Exists")}
        const user = new User(_user)
        const data = await user.save()
        return data
    }

    async readUser(_email:string):Promise<any> {
        const user:LeanDocument<IUser>[] = await this.models.User.find({email:_email}).lean()
        return user
    }
}