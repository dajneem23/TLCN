import axios from './axios'
const jobPath='/job'
export const Intern={
    GetAllJobs:  async ()=>{
        try{
                 return  await axios.post(`${jobPath}/getAllJobs`);
        }
        catch(e){
            console.log(e)
        }
    },
}
 