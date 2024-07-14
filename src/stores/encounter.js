import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            symps: [],
            diags: [],
            exams: [],
            updateSymps: (newSymps) => set({ symps: newSymps }),
            updateDiags: (newDiags) => set({ diags: newDiags }),
            updateExams: (newExams) => set({ exams: newExams }),
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
