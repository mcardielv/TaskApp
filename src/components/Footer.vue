<template>
  <!-- <div id="footer" class="navbar black">
    <h2>TOTAL = {{ sumValues }}€</h2>
    <button class="footer-button">+</button>
  </div> -->
</template>

<script setup>
import { ref } from "vue";
</script>

<style>
.footer-button {
  position: fixed;
  bottom: 0px;
  right: 20px;
  font-size: 35px;
  padding-bottom: 13px;
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
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
