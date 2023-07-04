import { create } from 'zustand'

export const useTextStore = create((set, get) => ({
    textdata: [],
    onTextChange: (id, value) => {
        const index = get().textdata.findIndex(item => item.id === id)
        if (index < 0) {
            set({ textdata: [...get().textdata, { id, value }] })
        } else {
            const newTextData = [...get().textdata];
            newTextData[index] = { id, value }
            set({ textdata: newTextData })
        }
    },
}))