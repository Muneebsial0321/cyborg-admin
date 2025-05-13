import api from "../_shared/Configs/Axios"

const createAttandence = async (userId: string, time: "MORNING" | "EVENING") => {
    const { data } = await api.post("/attendance", { userId, time })
    console.log({ data });
    return data
}

const getAllAttendences = async () => {
    const { data } = await api.get("/attendance")
    return data
}
const getOneAttendence = async () => { }
const deleteAttendence = async () => { }

export {
    createAttandence,
    getAllAttendences,
    getOneAttendence,
    deleteAttendence,
}