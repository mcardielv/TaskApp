<template>
  <div class="signin-login">SIGN UP</div>
  <hr />
  <p class="welcome">Create your new account!</p>

  <form @submit.prevent="signUp">
    <label class="labelTag" for="">Email</label>
    <div class="">
      <input
        class="inputTag"
        type="email"
        placeholder="name@email.com"
        v-model="email"
        id="email"
      />
    </div>
    <hr />
    <label class="labelTag" for="">Password</label>
    <div class="">
      <input
        class="inputTag"
        type="password"
        placeholder="************"
        v-model="password"
        id="password"
      />
    </div>

    <label class="labelTag" for="">Confirm Password</label>
    <div class="">
      <input
        class="inputTag"
        type="password"
        placeholder="************"
        v-model="confirmPassword"
        id="confirmPassword"
      />
    </div>
    <button class="button" type="submit">SIGN UP</button>
    <p class="welcome">
      <span class="signin-login">Have an account? </span>
      <PersonalRouter :route="route" :buttonText="buttonText" />
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>
