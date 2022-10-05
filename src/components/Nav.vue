<template>
  <div class="navbar black">
    <div class="logout-button">
      <img id="logout-icon" src="../assets/logout.svg" />
    </div>
    <div class="logo">
      <h1 class="white logo-txt">ticketz</h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
//constant to save a variable that will hold the use router method
const redirect = useRouter();

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
</script>

<style></style>
