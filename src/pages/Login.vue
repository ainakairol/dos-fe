<template>
  <div class="wholepage-bg">
    <div class="login-container">
      <h2 class="text-center">Digital Office</h2>

      <input type="text" placeholder="Username" v-model="username" class="input-box" />
      <input type="password" placeholder="Password" v-model="password" class="input-box" />

      <button @click="clickLogin" class="login-btn">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '/src/composables/useAuth'

const username = ref('')
const password = ref('')
const router = useRouter()
const { login, loading, error } = useAuth()

const clickLogin = async () => {
  if (username.value && password.value) {
    const success = await login(username.value, password.value)
    if (success) {
      router.push('/dashboard')
    }
  } else {
    alert('Enter username and password')
  }
}
</script>

<style>
.wholepage-bg {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(176.8deg, #ffffff -28.59%, #009ee7 61.87%, #314f97 91.09%);
}
.login-container {
  max-width: 320px;
  margin: auto;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input,
button {
  padding: 12px;
  font-size: 16px;
}
.text-center {
  text-align: center;
}
.input-box {
  /* width: 100%; */
  padding: 10px;
  border: 3px solid white;
  border-radius: 5px;
  text-align: center;
}
.login-btn {
  /* width: 100%; */
  padding: 10px;
  border: 3px solid white;
  border-radius: 5px;
  background: white;
  color: black;
  cursor: pointer;
}
</style>
