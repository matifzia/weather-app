<template>
  <WeatherViewer :city="currentCity" :weather-data="state.currentCityWeather" />
</template>
<script lang="ts" setup>
import WeatherViewer from '@/components/WeatherViewer.vue'
import type { Forecast, City } from '@/types'
import { onMounted, reactive, computed, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useWeatherData } from '@/composables'
import { useStore } from 'vuex'

const router = useRouter()
const lat: number = router.currentRoute.value.query.lat as unknown as number
const lon: number = router.currentRoute.value.query.lon as unknown as number
const store = useStore()
const currentCity: ComputedRef<City> = computed(() => store.getters.cityByLatLon(lat, lon))

const weatherData: Forecast = {
  lat: 0,
  lon: 0,
  timezone: '',
  timezone_offset: 0,
  current: {
    dt: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
    dew_point: 0,
    uvi: 0,
    clouds: 0,
    visibility: 0,
    wind_speed: 0,
    wind_deg: 0,
    wind_gust: 0,
    weather: []
  },
  minutely: [],
  hourly: [],
  daily: []
}

const state = reactive({
  currentCityWeather: weatherData
})

onMounted(async () => {
  try {
    state.currentCityWeather = await useWeatherData({ lat, lon })
  } catch (error) {
    store.commit('showAlert', 'Error fetching weather')
  }
})
</script>
