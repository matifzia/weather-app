<template>
  <div>
    <div v-if="error" class="alert">
      {{ error }}
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
const store=useStore()

const error=computed(()=>store.state.alertMessage)
</script>