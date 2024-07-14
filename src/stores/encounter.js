import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
    symps: [],
    diags: [],
    exams: [],
};

const useStore = create(
    persist(
        (set) => ({
            ...initialState,
            init: () => set(initialState),

            updateSymps: (newSymps) => set({ symps: newSymps }),
            addSymp: (symp) => set((state) => ({ symps: [...(new Set(state.symps)).add(symp)]})),
            deleteSymp: (symp) => set((state) => {
                const set = new Set(state.symps);
                set.delete(symp);
                return { symps: [...set] };
            }),

            updateDiags: (newDiags) => set({ diags: newDiags }),
            addDiag: (diag) => set((state) => ({ diags: [...(new Set(state.diags)).add(diag)]})),
            deleteDiag: (diag) => set((state) => {
                const set = new Set(state.diags);
                set.delete(diag);
                return { diags: [...set] };
            }),

            updateExams: (newExams) => set({ exams: newExams }),
            addExam: (exam) => set((state) => ({ exams: [...(new Set(state.exams)).add(exam)]})),
            deleteExam: (exam) => set((state) => {
                const set = new Set(state.exams);
                set.delete(exam);
                return { exams: [...set] };
            }),
            // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            // removeAllBears: () => set({ bears: 0 }),
            // updateBears: (newBears) => set({ bears: newBears }),
        }),
        {
            name: 'stores/encounter',
            // storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export {
    useStore,
};
