import axios from "axios";


const api = axios.create({
    baseURL: 'https://api-football-standings.azharimm.site'
})

export default api