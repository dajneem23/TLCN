import axios from './axios'
const jobPath = '/job'
export const Job = {
    GetAllJobs: async () => {
        try {
            const result = await axios.get(`${jobPath}/getAllJobs`);
            return result.data.listAllJobs;
        }
        catch (e) {
            console.log(e)
        }
    },
    GetNewestJobs: async () => {
        try {
            const result = await axios.get(`${jobPath}/getNewestJobs`);
            return result.data.listNewestJob;
        }
        catch (e) {
            console.log(e)
        }
    },
    GetHostestJobs: async () => {
        try {
            const result = await axios.get(`${jobPath}/getHotestJobs`);
            return result.data.listHotestJobs;
        }
        catch (e) {
            console.log(e)
        }
    },

}