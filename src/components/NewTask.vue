<template>
  <div>
    <div class="ticketInfo">
      <label class="labelTag" for="">Ticket info</label>
      <input
        class="inputTag"
        v-model="title"
        type="text"
        id="newTaskTitle"
        placeholder="Write here"
      />
    </div>

    <hr />

    <div class="ticketInfo"></div>
    <label class="labelTag" for="">Price</label>
    <div>
      <input
        class="inputTag"
        v-model="description"
        type="text"
        id="newTaskDesc"
        placeholder="0,00"
      />
      <label class="labelTag-inline" for="">€</label>
    </div>

    <hr />
    <div class="ticketInfo">
      <label class="labelTag" for="">Category</label>
      <div class="ticketInfo-category">
        <label class="materials">
          <input
            class="pickedTag yellow"
            v-model="category"
            type="radio"
            value="1"
            id="materials"
            placeholder=""
          />
        </label>

        <label id="restaurants">
          <input
            class="pickedTag blue"
            v-model="category"
            type="radio"
            value="2"
            id="restaurants"
            placeholder=""
          />
        </label>
        <label id="supermarket">
          <input
            class="pickedTag green"
            v-model="category"
            type="radio"
            value="3"
            id="supermarket"
            placeholder=""
          />
        </label>
        <label id="transports">
          <input
            class="pickedTag orange"
            v-model="category"
            type="radio"
            value="4"
            id="transports"
            placeholder=""
          />
        </label>
      </div>
    </div>

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
.ticketInfo {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
}

.ticketInfo-category {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
}
/* li {
  list-style-type: none;
} */

/* .materials input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
}

.materials label {
  display: inline-block;
  background-color: #fee99c;
  padding: 10px 20px;
  font-family: sans-serif, Arial;
  font-size: 16px;
  border: 2px solid #444;
  border-radius: 4px;
}

.materials input[type="radio"]:checked + label {
  border: 5px;
  border-color: black;
  width: 40px;
  height: 40px;
  margin: 20px;
  background-color: #fee99c;
} */
</style>
