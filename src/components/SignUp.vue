<template>
  <div class="general-div-log">
    <div class="signin-login">SIGN UP</div>
    <hr />
    <p class="welcome">Create your new account!</p>

    <p v-if="errorMsg" class="errorMsg">
      {{ errorMsg }}
    </p>
    <p v-if="errorMsg2" class="errorMsg">
      {{ errorMsg2 }}
    </p>
    <form @submit.prevent="signUp">
      <label class="labelTag" for="">Email</label>
      <div class="inputDiv">
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
      <div class="inputDiv">
        <input
          class="inputTag"
          type="password"
          placeholder="************"
          v-model="password"
          id="password"
        />
      </div>

      <label class="labelTag" for="">Confirm Password</label>
      <div class="inputDiv">
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
  </div>
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
// Error Message
const errorMsg = ref(null);
const errorMsg2 = ref(null);

// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  //first try add existing user error message
  // try {
  //   await Supabase.instance.client.auth.signUp(email.value, password.value);
  //   error = response.error;
  // } catch (error) {
  //   if (error != null) {
  //   } else error != null && email.value === null;

  //   errorMsg2.value = "This user email already exists!";
  //   setTimeout(() => {
  //     errorMsg2.value = null;
  //   }, 5000);
  // }
  //second try to enter auth/login once signup completed with same password and confirm pass
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      errorMsg.value = "Sign Up sucessfully, redirecting";
      redirect.push({ path: "/auth/login" });
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
