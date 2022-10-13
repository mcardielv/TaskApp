<template>
  <div>
    <div class="ticketInfo">
      <label class="labelTag" for="newTaskTitle">Ticket info:</label>
      <input
        class="inputTag"
        v-model="title"
        type="text"
        id="newTaskTitle"
        placeholder="Write here some ref, invoice number..."
      />
    </div>

    <hr />

    <div class="ticketInfo">
      <label class="labelTag" for="">Price:</label>
      <div class="labelTagPrice">
        <input
          class="inputTag"
          v-model="description"
          type="number"
          id="newTaskDesc"
          placeholder="0.00"
        />
        <label class="labelTag-inline" for="newTaskDesc">€</label>
      </div>
    </div>

    <hr />

    <div class="ticketInfo">
      <label class="labelTag" for="">Category:</label>

      <p class="inputTag">{{ categoryValue }}</p>

      <div class="ticketInfo-category">
        <label id="materials">
          <input
            checked="checked"
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
            @click="categoriesName"
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
            @click="categoriesName"
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
            @click="categoriesName"
          />
        </label>
      </div>
    </div>
  </div>

  <div class="end-function">
    <h5 class="errorMsg" v-if="errorBool">{{ emptyString }}</h5>
    <h5 class="checkedMsg" v-if="checkedBool">{{ emptyString }}</h5>
    <div v-else class="buttons-newtask">
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
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/task.js";
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";

//variable to stablish category values reactive
const category = ref("");

//to start with a category defined info
onMounted(() => {
  categoriesName();
});

// constant to save a variable that define the custom event that will be emitted to the homeView
const emits = defineEmits(["childNewTask"]);
// constant to save a variable that holds the value of the title input field of the new task
const title = ref("");
// constant to save a variable that holds the value of the description input field of the new task

const description = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
let errorBool = ref(false);
let checkedBool = ref(false);
// const constant to save a variable that holds the value of the error message & trueness
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
    // description.value = description.value.toFixed(2);
    emits("childNewTask", title.value, description.value, category.value);
    resetTask();
    checkedBool.value = true;
    emptyString.value = "Ticket added succesfully!";
    setTimeout(() => {
      checkedBool.value = false;
    }, 3000);
  }
}

//function to show category name depend selected radio form
const categoryValue = ref("");
console.log(category.value);
console.log(categoryValue.value);
function categoriesName() {
  if (category.value == 1) {
    categoryValue.value = "Materials";
  } else if (category.value == 2) {
    categoryValue.value = "Restaurants";
  } else if (category.value == 3) {
    categoryValue.value = "Supermarkets";
  } else if (category.value == 4) {
    categoryValue.value = "Transports";
  }
}

//function to limit number input

//function reset task data after decide not to fill or filled with errors
function resetTask() {
  title.value = "";
  description.value = "";
  // category.value = "1";
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
  display: flex;
  flex-direction: row;
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

[type="radio"]:checked,
[type="radio"]:focus {
  outline: 2px solid black;
}

.buttons-newtask {
  display: flex;
  justify-content: space-around;
  margin: 50px 70px 50px 70px;
  align-items: center;
}
.end-function {
  padding-bottom: 30px;
}

#buttons-newtask-input {
  width: 30px;
}

.checkedMsg {
  color: black;
}
</style>
