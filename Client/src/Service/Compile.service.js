import axios from './axios'
const compilePath = '/complier'
const submitPath = '/submit'
const getAllProblems = '/problem/getAllProblems'
const getProblemsById = "/problem/getProblemById"
const getSubmitByUserId ="/problem/submit"
export const Compile = {
    CompileCode: async (lang, code, problemId, userId) => {
        try {
            const result = await axios.post(compilePath, {
                language: lang,
                code: code,
                problemId: problemId,
                userId: userId
            })

            return result;
        } catch (error) {
            console.log(error);
        }
    },
    GetAllProblems: async () => {
        try {
            const result = await axios.get(getAllProblems);
            return result.data.listAllProblems;
        } catch (error) {
            console.log(error);
        }
    },
    GetProblemsById: async (id) => {
        try {
            const result = await axios.get(`${getProblemsById}`,{
                params : {
                    id: id
                }
            })
            return result.data.problem;
        } catch (error) {
            console.log(error);
        }
    },
    GetSubmitByUserId: async (userId, problemId) => {
        try{
            const result = await axios.get(`${getSubmitByUserId}`,{
                params : {
                    userId: userId,
                    problemId : problemId
                }
            })
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }

}
