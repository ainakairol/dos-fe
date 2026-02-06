import { ref, computed } from 'vue'
import axios from 'axios'
import { useMainStore } from '@/stores/mainStore'

export function useAuth() {
  const mainStore = useMainStore()
  const loading = ref(false)
  const error = ref(null)

  const DOS_URL = import.meta.env.VITE_DOS_URL

  const userId = computed(() => mainStore.user?.id)

  // ===== LOGIN =====
  const login = async (email, password) => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.post(`${DOS_URL}login`, {
        email,
        password,
      })

      if (response.data.status === 'success') {
        mainStore.setUser(response.data.user[0])
        return true
      } else {
        error.value = response.data.message
        return false
      }
    } catch (err) {
      error.value = 'Server error or connection failed'
      return false
    } finally {
      loading.value = false
    }
  }

  // ===== GET ATTENDANCE =====
  const fetchAttendance = async () => {
    if (!userId.value) return []

    const res = await axios.get(`${DOS_URL}attendance/${userId.value}`)

    return res.data.map((a) => ({
      from: new Date(a.sign_in).toLocaleString(),
      to: a.sign_out ? new Date(a.sign_out).toLocaleString() : null,
      status: a.status_name,
    }))
  }

  // ===== SIGN IN =====
  const signIn = async () => {
    if (!userId.value) return

    await axios.post(`${DOS_URL}attendance/signin`, {
      userId: userId.value,
    })
  }

  // ===== SIGN OUT =====
  const signOut = async () => {
    if (!userId.value) return

    await axios.post(`${DOS_URL}attendance/signout`, {
      userId: userId.value,
    })
  }

  return {
    login,
    fetchAttendance,
    signIn,
    signOut,
    loading,
    error,
  }
}
