import api from "../_shared/Configs/Axios"
import { userCreateSchemaType } from "./User.schema";
import { UsersType } from "./Users.type"

const createUsers = async (payload: userCreateSchemaType) => {
    const formData = new FormData()
    const { name, phone, cardio, monthlyFee, personalTrainer, registrationFee, image, nextPayment } = payload
    formData.append("name", name)
    formData.append("phone", phone)
    formData.append("monthlyFee", monthlyFee.toString())
    formData.append("registrationFee", registrationFee.toString())
    formData.append("cardio", cardio.toString())
    formData.append("personalTrainer", personalTrainer.toString())
    formData.append("nextPayment", nextPayment.toString())
    if(image){
        formData.append("image", image[0])
    }
    console.log("types ===========================");
    console.log({payload});
    console.log("types ===========================");
     
    const { data } = await api.post("/users", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
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