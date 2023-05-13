import Vuex from 'vuex'
import type { City } from '@/types'
import router from '@/router'
import vuexPersistState from '@/plugins/vuex-persist-state'

export default new Vuex.Store({
  state: {
    savedCities: [],
    alertMessage: ""
  },
  mutations: {
    addSavedCity(state: { savedCities: City[] }, city: City) {
      state.savedCities.push(city)
    },
    removeSavedCity(state: { savedCities: City[] }, city: City) {
      const index = state.savedCities.findIndex((cit) => cit.name == city.name)
      if (index > -1) {
        state.savedCities.splice(index, 1)
      }
    },
    showAlert(state: { alertMessage: string }, message: string) {
      state.alertMessage = message
      setTimeout(() => {
        state.alertMessage = ""
      }, 3000);
    }
  },
  actions: {
    async search({ commit, state }: any, city: City) {
      if (!state.savedCities.find((cit: City) => cit.name == city.name)) {
        commit('addSavedCity', city)
      }
      router.push(`/weather?lat=${city.lat}&lon=${city.lon}`)
    }
  },
  getters: {
    savedCities: (state: { savedCities: Array<City> }) => state.savedCities,
    cityByLatLon: (state: { savedCities: Array<City> }) => (lat: number, lon: number) =>
      state.savedCities.find((cit: City) => cit.lat == lat && cit.lon == lon)
  },
  plugins: [vuexPersistState]
})
