<template>
  <div id="footer" class="navbar black">
    <h2>TOTAL = {{ sumValue }}€</h2>
    <button class="footer-button">+</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style>
.footer-button {
  position: absolute;
  right: 20px;
  font-size: 35px;
  padding-bottom: 5px;
  color: white;
  border-style: none;
  background-color: transparent;
}

#footer {
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
