<template>
  <div>
    <div class="ticketInfo">
      <label class="labelTag" for="newTaskTitle">Ticket info</label>
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
    <div class="labelTagPrice">
      <input
        class="inputTag"
        v-model="description"
        type="text"
        id="newTaskDesc"
        placeholder="0.00"
      />
      <label class="labelTag-inline" for="newTaskDesc">€</label>
    </div>

    <hr />

    <div class="ticketInfo">
      <label class="labelTag" for="">Category</label>

      <p class="">{{ categoryValue }}</p>

      <div class="ticketInfo-category">
        <label id="materials">
          <input
            step="0.01"
            class="pickedTag yellow"
            v-model="category"
            type="radio"
            value="1"
            id="materials"
            placeholder=""
            @click="categoriesName"
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
  </div>

  <div class="buttons-newtask">
    <img
      src="../assets/crossf.svg"
      @click="resetTask"
      id="buttons-newtask-input"
    />
    <img
      src="../assets/checkf.svg"
      @click="addTask"
      id="buttons-newtask-input"
    />
  </div>

  <div>
    <h5 class="errorMsg" v-if="errorBool">{{ emptyString }}</h5>
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
    emptyString.value = "Add Ticket info and Price";
    setTimeout(() => {
      errorBool.value = false;
    }, 3000);
  } else {
    emits("childNewTask", title.value, description.value, category.value);
  }
  resetTask();
}

//function to show category name depend selected radio form
const categoryValue = ref("");

function categoriesName() {
  if (category.value === 1) {
    categoryValue.value = "Materials";
  } else if (category.value === 2) {
    categoryValue = "Supermarket";
  } else if (category.value === 3) {
    categoryValue = "Restaurants";
  } else if (category.value === 4) {
    categoryValue.value = "Transports";
  }
}

//function to limit number input

//function reset task data after decide not to fill or filled with errors
function resetTask() {
  title.value = "";
  description.value = "";
  category.value = "1";
}
</script>

<style>
.ticketInfo {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
}
.labelTagPrice {
  margin-bottom: 20px;
}

.ticketInfo-category {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

#materials [type="radio"],
#restaurants [type="radio"],
#supermarket [type="radio"],
#transports [type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  margin-left: 5px;
  margin-right: 5px;
  width: 50px;
  height: 50px;
}

[type="radio"]:checked {
  outline: 2px solid black;
}

.buttons-newtask {
  display: flex;
  justify-content: space-around;
  margin: 50px 70px 50px 70px;
  align-items: center;
}

#buttons-newtask-input {
  width: 30px;
}
</style>
