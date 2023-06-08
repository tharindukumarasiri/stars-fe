import { create } from 'zustand'
import { getCommunicationBasket, getCommunicationsList } from "../../services/communicationService";
import { schedulingTypes, recurringTypes, DaysOfTheWeek } from "../../utils/constants";

export const useUserStore = create((set) => ({
    selectedCompany: {},
    currentUser: {},
    setSelectedCompany: (value) => set({ selectedCompany: value }),
    setCurrentUser: (value) => set({ currentUser: value }),
}))

export const useBasketStore = create((set) => ({
    communicationBasketData: [],
    communicationBasketTotalResults: 0,
    loading: false,
    pageNumber: 1,
    setLoading: (value) => set({ loading: value }),
    getCommunicationBasketData: (params) => {
        set({ loading: true })
        getCommunicationBasket(params).then(result => {
            set({ communicationBasketData: result?.Value, communicationBasketTotalResults: result?.Key })
        }).finally(() => set({ loading: false }))
    },
    setPageNumber: (value) => set({ pageNumber: value }),
}))

export const useTimeConfigStore = create((set) => ({
    schedulingType: schedulingTypes.IMMIDIATE,
    oneTimeData: { date: null, time: null, deleteReciver: false },
    recurringeData: { startDate: null, endDate: null, recurringType: recurringTypes.DALY },
    recurringeDaily: { isEveryDay: true, everyDayCount: 1, nextTime: null },
    recurringeWeekly: { recurEveryCount: 1, selectedDays: [], nextDate: null, nextTime: null },
    recurringeMonthly: { day: 1, nextDate: null, nextTime: null, isEndOfMonth: false },
    setSchedulingType: (value) => set({ schedulingType: value }),
    setoneTimeData: (value) => set({ oneTimeData: value }),
    setRecurringeData: (value) => set({ recurringeData: value }),
    setRecurringeDaily: (value) => set({ recurringeDaily: value }),
    setRecurringeWeekly: (value) => set({ recurringeWeekly: value }),
    setRecurringeMonthly: (value) => set({ recurringeMonthly: value }),
    resetTimeConfigs: () => set({
        schedulingType: schedulingTypes.IMMIDIATE,
        oneTimeData: { date: null, time: null, deleteReciver: false },
        recurringeData: { startDate: null, endDate: null, recurringType: recurringTypes.DALY },
        recurringeDaily: { isEveryDay: true, everyDayCount: 1, nextTime: null },
        recurringeWeekly: { recurEveryCount: 1, selectedDays: [], nextDate: null, nextTime: null },
        recurringeMonthly: { day: 1, nextDate: null, nextTime: null, isEndOfMonth: false },
    })
}))

export const useCommunicationsStore = create((set) => ({
    communicationsData: [],
    pageNumber: 1,
    totalResults: 0,
    loading: false,
    getCommunicationsList: (params) => {
        set({ loading: true })
        getCommunicationsList(params).then(result => {
            set({ communicationsData: result?.Value, totalResults: result?.Key })
        }).finally(() => set({ loading: false }))
    },
    setLoading: (value) => set({ loading: value }),
    setPageNumber: (value) => set({ setPageNumber: value }),
}))