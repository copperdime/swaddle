import axios from "axios";

let axiosInstance = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 60000,
});

export default {

    login: async function(email, password) {
        return await axiosInstance.post("/login", {email, password});
    },

    signup: async function(email, password, name, phone) {
        let result = await axiosInstance.post("/signup", {email, password, name, phone});
        console.log(result);
        return result;
    },


    //Get transactions
    items: async function() {
        return await axiosInstance.get("/getTransactions");
    }

};
