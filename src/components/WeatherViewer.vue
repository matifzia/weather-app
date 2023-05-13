<template>
  <div v-if="currentForecast.dt">
    <span>
      <h2 style="margin-bottom: 0">{{ city.name }}, {{ city.state }}</h2>
      <span>{{ formatDateFromTimeStamp(currentForecast.sunrise) }}</span>
    </span>

    <span class="d-sm-block d-flex justify-space-between">
      <span class="d-flex justify-space-around w-full">
        <img
          :src="getImageUrlFromIcon(currentForecast.weather[0].icon)"
          width="120"
          height="120"
          alt="Forecast Image"
        />
        <div style="margin-left: 1rem">
          <div style="font-size: 3.5rem">{{ currentForecast.temp }}&deg;</div>
          <div class="text-capitalize text-center">
            {{ currentForecast.weather[0].description }}
          </div>
        </div>
      </span>
      <hr />
      <span class="d-flex justify-space-around w-full">
        <span class="text-center">
          <div class="headline">{{ firstDailyForecast.temp.max }}&deg;</div>
          <div class="subline">Heigh</div>
          <div class="headline">{{ firstDailyForecast.temp.min }}&deg;</div>
          <div class="subline">Low</div>
        </span>

        <span class="text-center">
          <div class="headline">{{ currentForecast.wind_speed }}mph</div>
          <div class="subline">Wind</div>
          <div class="headline">{{ currentForecast.pressure }}in</div>
          <div class="subline">Pressure</div>
        </span>
        <span class="text-center">
          <div class="headline">{{ currentForecast.humidity }}%</div>
          <div class="subline">Humidity</div>
          <div class="headline">{{ firstminutelyForecast.precipitation }}%</div>
          <div class="subline">Precipitation</div>
        </span>
      </span>
    </span>
    <h4 style="margin-top: 2rem">Today's weather</h4>
    <span class="d-flex justify-space-between forecast-card-container">
      <span
        v-for="(forecast, i) in hourlyForecasts"
        :key="'hf_' + i"
        class="d-flex justify-space-around w-full"
        style="margin-bottom: 1rem"
      >
        <div class="forecast-card text-center">
          <div>{{ formatShortTimeFromTimeStamp(forecast.dt) }}</div>
          <img
            :src="getImageUrlFromIcon(forecast.weather[0].icon)"
            width="30"
            height="30"
            alt="Forecast Image"
          />
          <div>{{ forecast.temp }}&deg;</div>
        </div>
      </span>
    </span>

    <h4 style="margin-top: 2rem">Next 3 days</h4>
    <span class="d-block w-full">
      <template v-for="(forecast, i) in dailyForecasts">
        <span
          v-if="i < 3"
          :key="'df_' + i"
          class="d-flex justify-space-around forecast-card w-full"
          style="margin-bottom: 1rem"
        >
          <div class="text-center">{{ formatDateFromTimeStamp(forecast.dt) }}</div>
          <img
            :src="getImageUrlFromIcon(forecast.weather[0].icon)"
            width="30"
            height="30"
            alt="Forecast Image"
          />
          <div class="text-center">
            <div>{{ forecast.temp.min }}&deg;</div>
            <div class="subline">Low</div>
          </div>
          <div class="text-center">
            <div>{{ forecast.temp.max }}&deg;</div>
            <div class="subline">High</div>
          </div>
          <div class="text-center">
            <div>{{ forecast.rain || 0 }}%</div>
            <div class="subline">Rain</div>
          </div>
          <div class="text-center">
            <div>{{ forecast.wind_speed }}mph</div>
            <div class="subline">Wind</div>
          </div>
        </span>
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
import type {
  Forecast,
  City,
  CurrentForecast,
  MinuteForecast,
  HourlyForecast,
  DayForecast
} from '@/types'
import { computed, type ComputedRef, type PropType } from 'vue'
import { formatDateFromTimeStamp, formatShortTimeFromTimeStamp } from '@/plugins/filters'

const props = defineProps({
  weatherData: {
    type: Object as PropType<Forecast>,
    required: true
  },
  city: {
    type: Object as PropType<City>,
    required: true
  }
})
const currentForecast: ComputedRef<CurrentForecast> = computed(() => props.weatherData.current)
const firstminutelyForecast: ComputedRef<MinuteForecast> = computed(
  () => props.weatherData.minutely[0]
)
const dailyForecasts: ComputedRef<Array<DayForecast>> = computed(() => props.weatherData.daily)
const hourlyForecasts: ComputedRef<Array<HourlyForecast>> = computed(() => props.weatherData.hourly)
const firstDailyForecast: ComputedRef<DayForecast> = computed(() => dailyForecasts.value[0])
const getImageUrlFromIcon = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`
</script>

<style scoped>
.headline {
  font-size: 20px;
}
.subline {
  color: #b8bde3;
}

.forecast-card-container {
  max-width: 100%;
  overflow-x: auto;
}

.forecast-card {
  background-color: #1a54a3;
  padding: 15px;
  border-radius: 5px;
  margin-right: 0.65rem;
}
</style>
