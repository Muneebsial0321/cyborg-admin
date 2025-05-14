import api from "../_shared/Configs/Axios"

const createAttandence = async (userId: string, time: "MORNING" | "EVENING") => {
    const { data } = await api.post("/attendance", { userId, time })
    console.log({ data });
    return data
}

const getAllAttendences = async ({ query, attendanceType, createdAt }: { query?: string, attendanceType?: string, createdAt?: string }) => {
    const { data } = await api.get("/attendance", {
        params: {
            ...(query ? { query } : {}),
            ...(attendanceType ? { attendanceType } : {}),
            ...(createdAt ? { createdAt } : {})
        }
    })
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