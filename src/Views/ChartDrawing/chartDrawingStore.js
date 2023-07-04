import { create } from 'zustand'

export const useUserStore = create((set) => ({
    selectedCompany: {},
    currentUser: {},
    setSelectedCompany: (value) => set({ selectedCompany: value }),
    setCurrentUser: (value) => set({ currentUser: value }),
}))

export const useDiagramStore = create((set, get) => ({
    loading: false,
    diagramData: [],
    saveDiagram: (data, name) => set({ diagramData: [...get().diagramData, { name, data, date: new Date(), id: Math.floor(Math.random() * 100) }] }),
}))