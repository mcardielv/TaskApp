<template>
  <router-link class="hover" :to="route">{{ buttonText }}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  buttonText: String,
});
</script>

<style></style>
