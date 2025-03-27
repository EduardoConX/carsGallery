import { database } from '@/database/config'
import type { Car } from '@/interfaces/Car'
import { useQuery } from '@tanstack/vue-query'
import { child, get, ref as firebaseRef } from 'firebase/database'
import { ref, watch } from 'vue'

const dbRef = firebaseRef(database)

const getCars = async () => {
  let data = []
  try {
    const snapshot = await get(child(dbRef, '/cars'))
    if (snapshot.exists()) {
      data = snapshot.val()
    }
    return snapshot.val()
  } catch (error) {
    console.error(error)
  }
  return data
}

const useCars = () => {
  const cars = ref<Car[]>([])
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  })

  watch(data, () => {
    if (data.value) cars.value = data.value
  })
  return { isLoading, cars, isError, error }
}

export default useCars
