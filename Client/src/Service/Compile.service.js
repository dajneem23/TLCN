import axios from './axios'
const compilePath = '/complier'
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
    }

}
