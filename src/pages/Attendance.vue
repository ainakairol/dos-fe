<template>
  <div>
    <button style="margin-top: 15px" @click="$router.push('/dashboard')">⬅ Back</button>
    <h2>Attendance</h2>

    <div class="grid" style="gap: 10px; margin-bottom: 20px">
      <button :disabled="signedIn" @click="handleSignIn">
        Sign In <br />
        ⏰ {{ currentTime }}
      </button>

      <button :disabled="!signedIn" @click="handleSignOut">
        Sign Out <br />
        ⏰ {{ currentTime }}
      </button>
    </div>

    <h3>My Attendance</h3>
    <table border="1" width="100%">
      <tr>
        <th>Date & Time (From)</th>
        <th>Date & Time (To)</th>
        <th>Status</th>
      </tr>
      <tr v-for="(a, index) in records" :key="index">
        <td>{{ a.from }}</td>
        <td>{{ a.to || '-' }}</td>
        <td>{{ a.status }}</td>
      </tr>
    </table>

    <!-- <button style="margin-top: 15px" @click="$router.push('/others')">See Others</button> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { fetchAttendance, signIn, signOut } = useAuth()

const currentTime = ref('')
const records = ref([])
const signedIn = ref(false)

let timer = null
onMounted(async () => {
  currentTime.value = new Date().toLocaleString()
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleString()
  }, 1000)

  await loadAttendance()
})

onUnmounted(() => {
  clearInterval(timer)
})

// ===== LOAD ATTENDANCE =====
const loadAttendance = async () => {
  const data = await fetchAttendance()
  records.value = data

  // check if currently signed in
  signedIn.value = records.value.some((r) => r.status === 'SIGNED_IN')
}

// ===== SIGN IN =====
const handleSignIn = async () => {
  await signIn()
  await loadAttendance()
}

// ===== SIGN OUT =====
const handleSignOut = async () => {
  await signOut()
  await loadAttendance()
}
</script>
