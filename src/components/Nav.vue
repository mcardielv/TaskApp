<template>
  <div class="navbar black">
    <div class="logout-button" v-show="(route = !(auth / login))">
      <img id="logout-icon hover" src="../assets/logout.svg" @click="signOut" />
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

const signOut = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await supabase.auth.signOut();
    // redirects user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
