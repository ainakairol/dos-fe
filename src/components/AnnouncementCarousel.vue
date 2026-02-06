<template>
  <div class="carousel card">
    <p>{{ announcements[currentIndex] }}</p>

    <div class="dots">
      <span
        v-for="(a, i) in announcements"
        :key="i"
        class="dot"
        :class="{ active: i === currentIndex }"
        @click="currentIndex = i"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const announcements = [
  '📢 Office closed this Friday',
  '⏰ Meeting at 10AM',
  '📝 Submit leave before 20th',
  '💻 WFH allowed this week',
]

const currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % announcements.length
  }, 3000)
})
</script>

<style>
.carousel {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
.dot {
  width: 10px;
  height: 10px;
  background: #ccc;
  border-radius: 50%;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
}
.dot.active {
  background: #314f97;
}
</style>
