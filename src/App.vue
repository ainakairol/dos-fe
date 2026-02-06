<template>
  <div class="app-bg">
    <router-view />
  </div>
</template>

<style>
.app-bg {
  min-height: 100vh;
  background: linear-gradient(176.8deg, #ffffff -28.59%, #009ee7 61.87%, #314f97 91.09%);
  padding: 20px;
  font-family: Arial, sans-serif;
}
button {
  background: #314f97;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  background: gray;
}
.card {
  background: white;
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}
</style>
