<template>
  <div>
    <h2>📢 Announcement</h2>

    <AnnouncementCarousel />

    <h2 style="margin-top: 20px">Menu</h2>
    <div class="grid">
      <button @click="$router.push('/attendance')">🕒 Attendance</button>
      <button @click="$router.push('/leave')">📝 Leave</button>
    </div>
  </div>
</template>

<script>
import AnnouncementCarousel from '/src/components/AnnouncementCarousel.vue'

export default {
  components: {
    AnnouncementCarousel,
  },
  data() {
    return {}
  },
}
</script>
