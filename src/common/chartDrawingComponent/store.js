import { create } from 'zustand'

export const useTextStore = create((set, get) => ({
    textdata: [],
    selectedNodeId: '',
    onTextChange: (id, value) => {
        const index = get().textdata.findIndex(item => item.id === id)
        const inputKey = [Object.keys(value)[0]];
        const inputValue = [Object.values(value)[0]];

        if (index < 0) {
            set({ textdata: [...get().textdata, { id, [inputKey]: inputValue }] })
        } else {
            const newTextData = [...get().textdata];
            newTextData[index][inputKey] = inputValue
            set({ textdata: newTextData })
        }
    },
    setSelectedNodeId: (id) => set({ selectedNodeId: id })
}))