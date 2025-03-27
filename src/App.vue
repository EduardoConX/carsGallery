<script setup lang="ts">
import useCars from './composables/getCars'

const { cars, isLoading, error, isError } = useCars()
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-white text-center mb-12">Car Gallery</h1>
      <div v-if="isLoading" class="text-center text-white">Loading...</div>
      <div v-else-if="isError" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="(car, index) in cars"
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
    </div>
  </main>
</template>
