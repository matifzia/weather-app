<template>
  <div v-if="cities.length">
    <h2 class="text-center">Saved Cities</h2>
    <ul>
      <li v-for="(city, index) in cities" :key="index" @click="searchByCity(city)">
        {{ city.name }}, {{ city.state }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { City } from '@/types'
import { computed, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const cities: ComputedRef<Array<City>> = computed(() => store.state.savedCities)
const router = useRouter()
const searchByCity = (city: City) => {
  router.push(`/weather?lat=${city.lat}&lon=${city.lon}`)
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
}

li {
  background-color: #1a54a3;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

li:not(:nth-child(1)) {
  margin-left: 1rem;
}
</style>
