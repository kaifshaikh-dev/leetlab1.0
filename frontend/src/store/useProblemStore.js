import { create } from 'zustand';
import axiosInstance  from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useProblemStore = create((set) => ({

    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemsLoading: false,
    isProblemLoading: false,


    getAllProblems:async()=>{

        try {

            set({ isProblemsLoading: true });

            const res = await axiosInstance.get("/problems/get-all-problems");
            console.log(res.data.problems);

            set({ problems: res.data.problems });


        } catch (error) {
            toast.error("Failed to get problems.");
            console.log("Error fetching problems:", error);


        } finally {
            set({ isProblemsLoading: false });
        }


    },

    getProblemById:async(id)=>{

        try {

            set({ isProblemLoading: true });

            const res = await axiosInstance.get(`/problems/get-problem/${id}`);
            

            set({ problem: res.data.problem });

        } catch (error) {
            toast.error("Failed to get problem.");
            console.log("Error fetching problem:", error);

        } finally {
            set({ isProblemLoading: false });
        }


    },


    getSolvedProblemByUser:async()=>{
        try {
           const res = await axiosInstance.get("/problems/get-solved-problem");
            set({ solvedProblems: res.data.problems});
      

        } catch (error) {
            toast.error("Failed to get solved problems.");
            console.log("Error fetching solved problems:", error);

        } 

    }



}))

