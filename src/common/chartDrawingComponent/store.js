import { create } from 'zustand'

export const useTextStore = create((set, get) => ({
    size: [],
    textdata: [],
    selectedNodeId: '',
    setSize: (id, size) => {
        const index = get().size.findIndex(item => item.id === id)

        if (index < 0) {
            set({ size: [...get().size, { id, ...size }] })
        } else {
            const newSize = [...get().size];
            newSize[index] = size
            newSize[index].id = id
            set({ size: newSize })
        }
    },
    onTextChange: (id, value) => {
        const index = get().textdata.findIndex(item => item.id === id)
        const inputKey = [Object.keys(value)[0]];
        const inputValue = [Object.values(value)[0]];

        if (index < 0) {
            set({ textdata: [...get().textdata, { id, ...value }] })
        } else {
            const newTextData = [...get().textdata];
            newTextData[index][inputKey] = inputValue[0]
            set({ textdata: newTextData })
        }
    },
    setSelectedNodeId: (id) => set({ selectedNodeId: id })
}))