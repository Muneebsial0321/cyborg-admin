import api from "../_shared/Configs/Axios"

const getDashBoardData = async () => {
    const { data } = await api.get("/users/stats")
    return data
}
const getOneHome = async () => { }
const deleteHome = async () => { }

export {
    getDashBoardData,
    getOneHome,
    deleteHome,
}