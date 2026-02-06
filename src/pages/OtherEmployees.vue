<template>
  <div>
    <h2>Other Employees</h2>

    <table border="1" width="100%">
      <tr>
        <th>Name</th>
        <th>Status</th>
      </tr>
      <tr v-for="(emp, index) in employees" :key="index">
        <td>{{ emp.name }}</td>
        <td>{{ emp.status }}</td>
      </tr>
    </table>

    <button style="margin-top: 15px" @click="$router.back()">⬅ Back</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const employees = ref([
  { name: 'Ali', status: 'WFH' },
  { name: 'Aina', status: 'On Leave' },
  { name: 'Siti', status: 'Office' },
])
</script>
