<template>
  <div class="navbar black">
    <div class="logout-button" v-if="routePath !== '/'"></div>
    <div class="logout-button" v-else>
      <img id="logout-icon hover" src="../assets/logout.svg" @click="signOut" />
    </div>
    <div class="logo">
      <h1 class="white logo-txt">ticketz</h1>
    </div>
    <!-- <img
      class="nav-button"
      src="../assets/edit_white.svg"
      id="button-edit"
      @click="editEverything"
    /> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { ref } from "vue";
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

const routePath = ref(useRouter().currentRoute.value.path);
</script>

<style>
.nav-button {
  position: fixed;

  right: 15px;
  font-size: 35px;
  padding-top: 15px;
  color: white;
  border-style: none;
  background-color: transparent;
}
</style>
