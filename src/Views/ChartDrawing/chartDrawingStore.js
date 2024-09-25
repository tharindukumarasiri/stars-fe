import { create } from 'zustand'
import {
    getAllCollections,
    addNewCollection,
    updateCollection,
    deleteCollection,
    getAllDrawings,
    addNewDrawing,
    deleteDrawing,
    updateDrawing,
    getDrawingImages,
    addNewDrawingImage,
    getWorkInstructions,
    getSoftwareSystems,
    getAgreements,
    getReferenceTypes,
    getCompanies,
    getForms
} from "../../services/drawingService";
import { getNotSubscribedPartyTsByTenantId } from '../../services/organizationsService';
import { getContactsByCompanyId } from '../../services/userService';
import { ReferenceTypes } from '../../utils/constants';

export const useUserStore = create((set) => ({
    selectedCompany: {},
    currentUser: {},
    setSelectedCompany: (value) => set({ selectedCompany: value }),
    setCurrentUser: (value) => set({ currentUser: value }),
}))

export const useDiagramStore = create((set, get) => ({
    currentUser: null,
    currentCompany: null,
    loading: false,
    collectionData: [],
    currentCollectionId: '',
    diagramData: [],
    filterdContacts: [],
    uploadedImages: [],
    referenceData: {},
    referenceTypes: [],
    formsData: [],
    formFillData: "",
    formsModalVisible: false,

    setCurrentUser: async (user) => set({ currentUser: user }),
    setCurrentCompany: async (company) => set({ currentCompany: company }),
    setCurrentCollectionId: (currentCollectionId) => set({ currentCollectionId }),
    getContactsList: async () => {
        const response = await getNotSubscribedPartyTsByTenantId(get()?.currentCompany?.tenantId);
        const options = response ? response.map((user) => {
            return {
                key: user.Key,
                label: user.Value,
                value: user.Value,
                // PersonId: user.PersonId,
                // GovernmentIdNo: user.GovernmentIdNo
            };
        }) : [];

        set({ filterdContacts: options });
    },
    getCollectionData: () => {
        set({ loading: true })
        getAllCollections(get().currentUser?.Id).then(result => {
            set({ collectionData: result })
        }).finally(() => set({ loading: false }));
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
        getAllDrawings(get().currentCollectionId).then(result => {
            set({ diagramData: result })
        }).finally(() => set({ loading: false }));
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
    getUploadedImages: () => {
        set({ loading: true })
        getDrawingImages(get().currentUser?.Id).then(result => {
            set({ uploadedImages: result })
        }).finally(() => set({ loading: false }));
    },
    uploadImage: async (data) => {
        try {
            set({ loading: true })
            const response = await addNewDrawingImage(get().currentUser?.Id, data);
            get().getUploadedImages()
            return response
        } catch (error) {
            set({ loading: false })
            throw new Error(error);
        }
    },
    getReferanceData: () => {
        const mapValues = (result, idKey = 'Id', nameKey = 'Name') => {
            const response = result.map((item) => {
                return {
                    Id: item[idKey],
                    Name: item[nameKey]
                };
            })
            return response
        }

        getReferenceTypes().then(result => {
            set({ referenceTypes: result })
        });

        set({ referenceData: { ...get().referenceData, [ReferenceTypes.contactPersons]: mapValues(get().filterdContacts, 'GovernmentIdNo', 'label') } })

        getWorkInstructions().then(result => {
            set({ referenceData: { ...get().referenceData, [ReferenceTypes.workInstructions]: result } })
        });
        getSoftwareSystems().then(result => {
            set({ referenceData: { ...get().referenceData, [ReferenceTypes.softwareSystems]: mapValues(result, 'SystemId') } })
        });
        getAgreements().then(result => {
            set({ referenceData: { ...get().referenceData, [ReferenceTypes.agreements]: mapValues(result, 'CompanyTId') } })
        });
        getCompanies().then(result => {
            set({ referenceData: { ...get().referenceData, [ReferenceTypes.companies]: mapValues(result, 'CompanyRegistrationID') } })
        });
        getContactsByCompanyId(get()?.currentCompany?.companyPartyId).then(result => {
            set({ referenceData: { ...get().referenceData, [ReferenceTypes.contactPersonsByCompanies]: result } })
        });
    },
    getFormsData: () => {
        getForms(get().currentUser?.Id).then(result => {
            set({ formsData: result })
        });
    },
    setFormsModalVisible: (value) => set({ formsModalVisible: value }),
    setFormFillData: (value) => set({ formFillData: value })
}))