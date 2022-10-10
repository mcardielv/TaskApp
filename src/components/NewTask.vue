<template>
  <div>
    <br />
    <label class="labelTag" for="">Ticket info</label>
    <input
      class="inputTag"
      v-model="title"
      type="text"
      id="newTaskTitle"
      placeholder="items"
    />
    <label class="labelTag" for="">Price</label>
    <input
      class="inputTag"
      v-model="description"
      type="text"
      id="newTaskDesc"
      placeholder="0,00€"
    />

    <label class="labelTag" for="">Category</label>
    <input
      class="pickedTag yellow"
      v-model="category"
      type="radio"
      value="1"
      id="materials"
      placeholder=""
    />
    <input
      class="pickedTag blue"
      v-model="category"
      type="radio"
      value="2"
      id="restaurants"
      placeholder=""
    />
    <input
      class="pickedTag green"
      v-model="category"
      type="radio"
      value="3"
      id="supermarket"
      placeholder=""
    />
    <input
      class="pickedTag orange"
      v-model="category"
      type="radio"
      value="4"
      id="transports"
      placeholder=""
    />
    <button @click.prevent="addTask">+</button>
  </div>
  <div>
    <h3 v-if="errorBool">{{ emptyString }}</h3>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/task.js";
import { ref } from "vue";
import { supabase } from "../supabase";

const category = ref("");

// constant to save a variable that define the custom event that will be emitted to the homeView
const emits = defineEmits(["childNewTask"]);
// constant to save a variable that holds the value of the title input field of the new task
const title = ref("");
// constant to save a variable that holds the value of the description input field of the new task
const description = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
let errorBool = ref(false);
// const constant to save a variable that holds the value of the error message
const emptyString = ref("");
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
function addTask() {
  if (title.value === "" || description.value === "") {
    errorBool.value = true;
    emptyString.value = "Add something!";
    setTimeout(() => {
      errorBool.value = false;
    }, 1000);
  } else {
    emits("childNewTask", title.value, description.value, category.value);
  }
}
</script>

<style>
li {
  list-style-type: none;
}
</style>
