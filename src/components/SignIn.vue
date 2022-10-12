<template>
  <div class="signin-login">SIGN IN</div>
  <hr />
  <p class="welcome">Welcome back!</p>

  <p v-if="errorMsg" class="errorMsg">
    {{ errorMsg }}
  </p>
  <form @submit.prevent="signIn">
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
      <div class="">
        <input
          class="inputTag"
          :type="passwordFieldType"
          onpaste="return false"
          placeholder="************"
          v-model="password"
          id="password"
        />
        <span class="">
          <EyeIcon
            :class="[passwordFieldIcon]"
            @click.prevent="hidePassword = !hidePassword"
          />
        </span>
      </div>
    </div>

    <button class="button" type="submit">SIGN IN</button>
    <p class="welcome">
      <span class="">Don’t have an account? </span>

      <PersonalRouter :route="route" :buttonText="buttonText" />
    </p>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
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

<style>
.passwordFieldIcon {
  width: 20px;
}
.eyeicon {
  width: 20px;
}
.errorMsg {
  text-align: center;
  color: red;
}
</style>
