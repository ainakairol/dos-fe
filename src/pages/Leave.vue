<template>
  <div>
    <h2>Leave Balance</h2>

    <!-- Leave Cards -->
    <div v-if="leaveBalances.length === 0">No leave balance found</div>

    <div
      v-else
      class="grid"
      style="gap: 15px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))"
    >
      <div class="card" v-for="leave in leaveBalances" :key="leave.leave_type">
        <h4>{{ leave.leave_type }}</h4>
        <p>Allocated: {{ leave.allocated }}</p>
        <p>Used: {{ leave.used }}</p>
        <p>Balance: {{ leave.balance }}</p>
      </div>
    </div>

    <!-- Apply Leave Button -->
    <button style="margin-top: 15px" @click="showDialog = true">Apply Leave</button>

    <!-- Apply Leave Dialog -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>Apply Leave</h3>

        <div class="form-row">
          <label>From:</label>
          <input type="date" v-model="form.from" />
        </div>

        <div class="form-row">
          <label>To:</label>
          <input type="date" v-model="form.to" />
        </div>

        <div class="form-row">
          <label>Type:</label>
          <select v-model="form.type">
            <option
              v-for="leave in leaveBalances"
              :key="leave.leave_type"
              :value="leave.leave_type"
            >
              {{ leave.leave_type }} (Balance: {{ leave.balance }})
            </option>
          </select>
        </div>

        <div class="form-row">
          <label>Duration:</label>
          <select v-model="form.duration">
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
          </select>
        </div>

        <div class="form-row">
          <label>Reason:</label>
          <textarea v-model="form.reason" placeholder="Optional"></textarea>
        </div>

        <div class="form-row" v-if="form.type === 'Medical Leave'">
          <label>Upload Document:</label>
          <input type="file" @change="handleFileUpload" />
        </div>

        <div class="dialog-buttons">
          <button @click="submitLeave">Submit</button>
          <button @click="showDialog = false">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Applied Leaves Table -->
    <h3 style="margin-top: 20px">Applied Leaves</h3>
    <table border="1" width="100%">
      <tr>
        <th>From</th>
        <th>To</th>
        <th>Type</th>
        <th>Duration(Days)</th>
        <th>Status</th>
      </tr>
      <tr v-for="(l, index) in leaves" :key="index">
        <td>{{ formatDate(l.from) }}</td>
        <td>{{ formatDate(l.to) }}</td>
        <td>{{ l.type }}</td>
        <td>{{ l.duration }}</td>
        <td>{{ l.status }}</td>
      </tr>
    </table>

    <button style="margin-top: 15px" @click="$router.push('/dashboard')">⬅ Back</button>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useLeave } from '@/composables/useLeave'

const showDialog = ref(false)

const form = reactive({
  from: '',
  to: '',
  type: '',
  leaveTypeId: 1,
  duration: 'Full Day',
  reason: '',
  file: null,
})

const { leaveBalances, leaves, fetchLeaveBalance, fetchLeaves, applyLeave } = useLeave()

onMounted(async () => {
  await fetchLeaveBalance()
  await fetchLeaves()
})

const handleFileUpload = (event) => {
  form.file = event.target.files[0]
}

const leaveTypeMap = {
  'Annual Leave': 1,
  'Emergency Leave': 2,
  'Medical Leave': 3,
  'Book Leave': 4,
  'Unpaid Leave': 5,
  'Maternity Leave': 6,
  'Hospitalisation Leave': 7,
}

const submitLeave = async () => {
  if (!form.from || !form.to || !form.type) {
    alert('Please fill all required fields')
    return
  }

  const selectedLeave = leaveBalances.value.find((l) => l.leave_type === form.type)
  const balance = selectedLeave?.balance || 0
  if (balance <= 0) {
    alert('Insufficient leave balance')
    return
  }

  form.leaveTypeId = leaveTypeMap[form.type]

  const success = await applyLeave(form)
  if (success) {
    form.from = ''
    form.to = ''
    form.type = ''
    form.duration = 'Full Day'
    form.reason = ''
    form.file = null
    showDialog.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style>
.grid {
  display: grid;
}

.card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  background: #f9f9f9;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.form-row label {
  font-weight: 600;
  margin-bottom: 4px;
}

.form-row input,
.form-row select,
.form-row textarea {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-row textarea {
  resize: vertical;
}

.dialog-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
