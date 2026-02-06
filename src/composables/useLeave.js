import { ref, computed } from 'vue'
import axios from 'axios'
import { useMainStore } from '@/stores/mainStore'

export function useLeave() {
  const mainStore = useMainStore()
  const loading = ref(false)
  const error = ref(null)

  const DOS_URL = import.meta.env.VITE_DOS_URL
  const userId = computed(() => mainStore.user?.id)

  const leaveBalances = ref([])
  const leaves = ref([])

  const fetchLeaveBalance = async () => {
    if (!userId.value) return

    try {
      loading.value = true
      const res = await axios.get(`${DOS_URL}leave/balance/${userId.value}`)

      leaveBalances.value = res.data.map((lb) => ({
        leave_type: lb.leave_type,
        allocated: lb.allocated,
        used: lb.used,
        balance: lb.balance,
      }))
    } catch (err) {
      console.error(err)
      error.value = 'Failed to load leave balance'
    } finally {
      loading.value = false
    }
  }

  // Fetch applied leaves from API
  const fetchLeaves = async () => {
    if (!userId.value) return

    try {
      const res = await axios.get(`${DOS_URL}leave/${userId.value}`)
      leaves.value = res.data.map((l) => ({
        from: l.date_from,
        to: l.date_to,
        type: l.leave_type,
        duration: l.day_count || 0,
        status: l.status_name,
      }))
    } catch (err) {
      console.error(err)
      error.value = 'Failed to load applied leaves'
    }
  }

  // Apply leave via API
  const applyLeave = async (form) => {
    if (!userId.value) return false

    try {
      const res = await axios.post(`${DOS_URL}leave/apply`, {
        userId: userId.value,
        leaveTypeId: form.leaveTypeId,
        dateFrom: form.from,
        dateTo: form.to,
        reason: form.reason || '',
      })

      if (res.data.status === 'success') {
        await fetchLeaveBalance()
        await fetchLeaves()
        return true
      } else {
        error.value = res.data.message
        return false
      }
    } catch (err) {
      console.error(err)
      error.value = 'Failed to apply leave'
      return false
    }
  }

  return {
    leaveBalances,
    leaves,
    fetchLeaveBalance,
    fetchLeaves,
    applyLeave,
    loading,
    error,
  }
}
