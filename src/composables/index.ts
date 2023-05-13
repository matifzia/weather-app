import type { City, Forecast, LatLon } from '@/types'
import axios from 'axios'

const useCityAutoComplete = async (cityName: string): Promise<Array<City>> => {
  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY
    }`
  )
  return res.data
}

const useWeatherData = async (location: LatLon): Promise<Forecast> => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon
    }&exclude=alerts&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`
  )
  return res.data
}

const useGetCityFromLocation = async (location: LatLon): Promise<City> => {
  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`
  )
  return res.data[0]
}

export { useWeatherData, useCityAutoComplete, useGetCityFromLocation }
