<template>
  <div class="autocomplete">
    <input
      ref="inputRef"
      type="text"
      :placeholder="placeholder"
      @input.passive="onInput"
      @keydown.down="highlightNext"
      @keydown.up="highlightPrev"
    />
    <ul v-if="isOpen">
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        :class="{ highlighted: index === highlightedIndex }"
        @mousedown="select(item)"
      >
        {{ item.name }}, {{ item.state || item.country }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { City } from '@/types'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array<City>,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['onSelect', 'onInput'])

const inputRef = ref()
const searchQuery = ref('')
const highlightedIndex = ref(-1)
const isOpen = computed(() => searchQuery.value.length > 0)

watch(
  () => props.value,
  (newValue) => {
    searchQuery.value = newValue
    inputRef.value.value =newValue
  }
)

const onInput = (event: Event) => {
  const inputValue: string = (event.target as HTMLInputElement).value
  searchQuery.value = inputValue
  emit('onInput', inputValue)
  highlightedIndex.value = -1
}

const filterItems = (): Array<City> => {
  return props.items.filter((item: City) => {
    return item.name.toLowerCase().startsWith(searchQuery.value.toLowerCase())
  })
}

const select = (selectedItem: City) => {
  if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredItems.value.length) {
    inputRef.value.value = filteredItems.value[highlightedIndex.value]
    searchQuery.value = ''
    highlightedIndex.value = -1
  }
  emit('onSelect', selectedItem)
}

const highlightNext = () => {
  if (highlightedIndex.value === filteredItems.value.length - 1) {
    highlightedIndex.value = 0
  } else {
    highlightedIndex.value++
  }
}

const highlightPrev = () => {
  if (highlightedIndex.value <= 0) {
    highlightedIndex.value = filteredItems.value.length - 1
  } else {
    highlightedIndex.value--
  }
}

const filteredItems = computed(() => filterItems())
</script>

<style scoped>
.autocomplete {
  position: relative;
}
.autocomplete input {
  width: 100%;
  height: 100%;
  padding: 10px 0px;
  border: none;
  outline: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
}

li {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #bdf6b0;
}

li.highlighted {
  background-color: #78d663;
}
</style>
