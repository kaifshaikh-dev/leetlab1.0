import { create } from 'zustand';
import axiosInstance  from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useExecutionStore = create((set) => ({

    isExecuting: false,
    submission: null,

    executeCode: async(source_Code, language_id, stdin, expected_Output, problemId ) =>{

        set({isExecuting: true});

        console.log("submission data:", {source_Code, language_id, stdin, expected_Output, problemId });

        try {

            const res = await axiosInstance.post('/execute-code', {
               source_Code, language_id, stdin, expected_Output, problemId 
            });
             
            console.log("Execution response:", res.data);

            set({submission: res.data.submission});
            toast.success(res.data.message);

            
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during code execution.");
            console.log("Execution error:", error);
            
        } finally {
            set({isExecuting: false});  
        }
    }
}))