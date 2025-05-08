import api from "../_shared/Configs/Axios"

const createAttandence  = async (userId:string) => {
    const {data}=  await api.post("/attendance",{userId})
    console.log({data});
    
    return data
 }
 
const getAllAttendences = async () => { }
const getOneAttendence  = async () => { }
const deleteAttendence  = async () => { }

export {
    createAttandence,
    getAllAttendences,
    getOneAttendence,
    deleteAttendence,
}