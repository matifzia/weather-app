<template>
  <div>
    <form class="search-form">
      <button type="button" class="search-button">
        <img src="@/assets/search.png" width="15" height="15" alt="Search Image" />
      </button>
      <autocomplete
        :items="suggestions"
        :value="currentLocation"
        @onSelect="searchWeather"
        @onInput="onInput"
        class="searchbox"
        placeholder="Search for a city"
      />
      <button type="button" class="location-button" @click="getCurrentLocation">
        <img src="@/assets/location.png" width="15" height="15" alt="Location Image" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useStore } from 'vuex'
import { useCityAutoComplete, useGetCityFromLocation } from '@/composables'
import type { City } from '@/types'
import autocomplete from './location-autocomplete.vue'

const store = useStore()
const suggestions: Ref<Array<City>> = ref([])
const currentLocation: Ref<string> = ref('')

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const city: City = await useGetCityFromLocation({ lat: latitude, lon: longitude })
          currentLocation.value = city.name
          store.dispatch('search', city)
        } catch (error) {
          store.commit('showAlert', 'Error fetching location')
        }
      },
      () => {
        store.commit('showAlert', 'Unable to retrieve your location')
      }
    )
  } else {
    store.commit('showAlert', 'Geolocation is not supported by your browser')
  }
}

const searchWeather = (selectedLocation: City) => {
  if (selectedLocation.lat && selectedLocation.lon) {
    store.dispatch('search', selectedLocation)
  } else {
    store.commit('showAlert', 'Please enter something to search')
  }
}

const onInput = async (value: string) => {
  if (value.length >= 3) {
    try {
      suggestions.value = await useCityAutoComplete(value)
    } catch (error) {
      store.commit('showAlert', 'Error getting cities')
    }
  } else {
    suggestions.value = []
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  align-items: center;
  margin-top: 4rem;
}

.searchbox {
  flex-grow: 1;
  padding: 0.9rem;
  font-size: 17px;
  border-right: 1px solid grey;
  background: white;
  width: 80vw;
}

.search-button,
.location-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border: none;
  background-color: white;
  outline: none;
}

.location-button {
  cursor: pointer;
}

.search-button img,
.location-button img {
  width: 15px;
  height: 15px;
  color: white;
}
</style>
