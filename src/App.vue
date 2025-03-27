<script setup lang="ts">
import { computed, ref } from 'vue'
import useCars from './composables/getCars'

const { cars, isLoading, error, isError } = useCars()
const searchQuery = ref('')
const currentPage = ref(1)
const carsPerPage = 2
const filteredCars = computed(() => {
  return cars.value.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const currentCars = computed(() => {
  const startIndex = (currentPage.value - 1) * carsPerPage
  const endIndex = startIndex + carsPerPage
  return filteredCars.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(filteredCars.value.length / carsPerPage))
const handlePageChange = (pageNumber: number) => {
  currentPage.value = pageNumber
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-white text-center mb-8">Car Gallery</h1>
      <div v-if="isLoading" class="text-center text-white">Loading...</div>
      <div v-else-if="isError" class="text-center text-red-500">{{ error }}</div>
      <div v-else>
        <input
          type="text"
          class="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-12"
          placeholder="Search"
          :value="searchQuery"
          @input="
            (e) => {
              searchQuery = (e.target as HTMLInputElement).value
              currentPage = 1
            }
          "
        />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            v-for="(car, index) in currentCars"
            :key="index"
            class="bg-gray-800 rounded-lg overflow-hidden"
          >
            <img :src="car.image" alt="" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h2 class="text-2xl font-bold text-white mb-4">{{ car.name }}</h2>
              <div class="space-y-2 mb-6">
                <div class="flex items-center text-gray-400">
                  <span class="w-24">Brand:</span>
                  <span class="text-white">Hot Wheels</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <span class="w-24">Color:</span>
                  <span class="text-white">Red</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="totalPages > 1" class="flex justify-center mt-12 space-x-2">
          <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="handlePageChange(pageNumber)"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              currentPage === pageNumber
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
            ]"
          >
            {{ pageNumber }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
