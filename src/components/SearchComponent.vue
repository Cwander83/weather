<template>
  <div class="search-container">
    <div class="search-box">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        @keyup.enter="selectFirstResult"
        type="text"
        placeholder="Search for a city..."
        class="search-input"
      />
      <button @click="handleSearchClick" class="search-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>

    <div v-if="searchResults.length > 0" class="search-results">
      <div
        v-for="(city, index) in searchResults"
        :key="`${city.lat}-${city.lon}`"
        @click="selectCity(city)"
        class="search-result-item"
        :class="{ highlighted: index === highlightedIndex }"
      >
        <div class="city-name">{{ city.name }}</div>
        <div class="country-name">{{ city.country }}</div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">Searching...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import weatherService, { type LocationData } from '../services/weatherService'

// Emits
const emit = defineEmits<{
  locationSelected: [location: LocationData]
}>()

// Reactive data
const searchQuery = ref('')
const searchResults = ref<LocationData[]>([])
const isLoading = ref(false)
const error = ref('')
const highlightedIndex = ref(-1)
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

// Methods
const handleSearch = async () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  searchTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim().length < 2) {
      searchResults.value = []
      return
    }

    try {
      isLoading.value = true
      error.value = ''
      const results = await weatherService.searchCities(searchQuery.value.trim())
      searchResults.value = results
      highlightedIndex.value = -1
    } catch {
      error.value = 'Failed to search cities. Please try again.'
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }, 300) // Debounce search requests
}

const handleSearchClick = () => {
  if (searchResults.value.length > 0) {
    selectCity(searchResults.value[0])
  } else if (searchQuery.value.trim()) {
    handleSearch()
  }
}

const selectFirstResult = () => {
  if (searchResults.value.length > 0) {
    selectCity(searchResults.value[0])
  }
}

const selectCity = (city: LocationData) => {
  searchQuery.value = `${city.name}, ${city.country}`
  searchResults.value = []
  emit('locationSelected', city)
}

// Watch for changes in search query
watch(searchQuery, (newValue) => {
  if (!newValue.trim()) {
    searchResults.value = []
    error.value = ''
  }
})
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.search-box:focus-within {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
}

.search-input::placeholder {
  color: #999;
}

.search-button {
  padding: 15px 20px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background: #0056b3;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 5px;
}

.search-result-item {
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.search-result-item:hover,
.search-result-item.highlighted {
  background-color: #f8f9fa;
}

.search-result-item:last-child {
  border-bottom: none;
}

.city-name {
  font-weight: 600;
  color: #333;
}

.country-name {
  font-size: 14px;
  color: #666;
  margin-top: 2px;
}

.loading {
  text-align: center;
  padding: 15px;
  color: #666;
  font-style: italic;
}

.error {
  text-align: center;
  padding: 15px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 5px;
  margin-top: 10px;
}

@media (max-width: 480px) {
  .search-container {
    max-width: 100%;
    padding: 0 15px;
  }

  .search-input {
    font-size: 14px;
    padding: 12px 15px;
  }

  .search-button {
    padding: 12px 15px;
  }
}
</style>
