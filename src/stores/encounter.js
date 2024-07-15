import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
    symps: [],
    diags: [],
    exams: [],

    // events: new Map([]),
    events: [],

    dialog: "",
    tmpDialog: "",
    isSubmittedDialog: false,
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

            addEvent: (event) => set((state) => {
                // console.warn(event);
                // console.error(state);
                const map = new Map([...state.events]);
                map.set(event?.title ?? '', event);
                return { events: [...map] };
            }),
            deleteEvent: (eventKey) => set((state) => {
                const map = new Map(state.events);
                map.delete(eventKey);
                return { events: [...map] };
            }),

            // setText: (newText) => set({ text: newText }),
            updateDialog: (dialog) => set({ dialog }),
            updateTmpDialog: (tmpDialog) => set({ tmpDialog }),
            updateIsSubmittedDialog: (isSubmittedDialog) => set({ isSubmittedDialog }),
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
