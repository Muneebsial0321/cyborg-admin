import api from "../_shared/Configs/Axios"
import { userCreateSchemaType } from "./User.schema";
import { UsersType } from "./Users.type"

const createUsers = async (payload: userCreateSchemaType) => {
    const { data } = await api.post("/users", payload)
    return data
}
const getAllUsers = async (
    query: string | null,
    pstatus: string | null,
): Promise<UsersType[]> => {
    const { data } = await api.get("/users", {
        params: {
            ...(query ? { query } : {}),
            ...(pstatus ? { pstatus } : {})
        }
    })
    return data
}
const getOneUsers = async () => { }
const deleteUsers = async () => { }

export {
    createUsers,
    getAllUsers,
    getOneUsers,
    deleteUsers,
}