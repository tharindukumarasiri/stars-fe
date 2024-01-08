import { create } from 'zustand'
import {
    getAllCollections,
    addNewCollection,
    updateCollection,
    deleteCollection,
    getAllDrawings,
    addNewDrawing,
    deleteDrawing,
    updateDrawing
} from "../../services/drawingService";
import { getContacts } from "../../services/userService";

export const useUserStore = create((set) => ({
    selectedCompany: {},
    currentUser: {},
    setSelectedCompany: (value) => set({ selectedCompany: value }),
    setCurrentUser: (value) => set({ currentUser: value }),
}))

export const useDiagramStore = create((set, get) => ({
    currentUser: null,
    loading: false,
    collectionData: [],
    diagramData: [],
    filterdContacts: [],

    setCurrentUser: (user) => set({ currentUser: user }),
    getContactsList: async () => {
        const response = await getContacts();
        const options = response ? response.map((user) => {
            return {
                key: user.Id,
                label: user.Name,
                value: user.Name
            };
        }) : [];

        set({ filterdContacts: options });
    },
    getCollectionData: () => {
        set({ loading: true })
        getAllCollections().then(result => {
            set({ collectionData: result })
        }).then(() => set({ loading: false }));
    },
    addCollection: async (data) => {
        try {
            set({ loading: true })
            const response = await addNewCollection(get().currentUser?.Id, data);
            get().getCollectionData()
            return response
        } catch (error) {
            set({ loading: false })
            throw new Error(error);
        }
    },
    editCollection: async (data) => {
        try {
            set({ loading: true })
            const response = await updateCollection(get().currentUser?.Id, data);
            get().getCollectionData()
            return response
        } catch (error) {
            set({ loading: false })
            throw new Error(error);
        }
    },
    deleteCollection: async (data) => {
        try {
            set({ loading: true });
            const response = await deleteCollection(get().currentUser?.Id, data);
            get().getCollectionData()
            return response;
        } catch {
            set({ loading: false });
            throw new Error('error');
        }
    },
    getDiagramData: () => {
        set({ loading: true })
        getAllDrawings().then(result => {
            set({ diagramData: result })
        }).then(() => set({ loading: false }));
    },
    addDiagram: async (data) => {
        try {
            set({ loading: true })
            const response = await addNewDrawing(get().currentUser?.Id, data);
            get().getDiagramData()
            return response
        } catch (error) {
            set({ loading: false })
            throw new Error(error);
        }
    },
    saveDiagram: async (data) => {
        try {
            set({ loading: true })
            const response = await updateDrawing(get().currentUser?.Id, data);
            get().getDiagramData();
            return response
        } catch (error) {
            set({ loading: false })
            throw new Error(error);
        }
    },
    deleteDiagram: async (data) => {
        try {
            set({ loading: true });
            const response = await deleteDrawing(get().currentUser?.Id, data);
            get().getDiagramData()
            return response;
        } catch {
            set({ loading: false });
            throw new Error('error');
        }
    },
}))