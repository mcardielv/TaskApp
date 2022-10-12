<template>
  <div
    class="taskItem"
    :class="props.task.is_complete ? 'completed' : 'taskItem'"
  >
    <li>
      <img
        src="../assets/crossf.svg"
        v-if="!toEdit"
        @click="deleteTask"
        id="button-delete"
      />
      <img
        v-if="!props.task.is_complete && !toEdit"
        src="../assets/checkf.svg"
        @click="completeTask"
        id="button-complete"
      />
      <img
        v-else
        v-if="!toEdit"
        src="../assets/returnf.svg"
        @click="uncompleteTask"
        id="button-uncomplete"
      />
      <h4 v-if="!toEdit">{{ task.title }}</h4>
      <h4 v-else>
        <input class="h4" v-model="newTitle" :placeholder="task.title" />
      </h4>
      <h5 v-if="!toEdit">{{ task.description }}</h5>
      <h5 v-else>
        <input
          class="h5"
          v-model="newDescription"
          :placeholder="task.description"
        />
      </h5>
      <h5>€</h5>

      <img
        src="../assets/edit.svg"
        v-if="!toEdit"
        @click="changeParams"
        id="button-edit"
      />
      <img
        src="../assets/checkf.svg"
        v-else
        @click="editTask"
        id="button-edit"
      />
    </li>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["task"]);
const emits = defineEmits([
  "deleteChild",
  "completeChild",
  "uncompleteChild",
  "editChild",
]);

//variables to edit task create a new title, and new description
const toEdit = ref(false);
const newTitle = ref("");
const newDescription = ref("");

function deleteTask() {
  emits("deleteChild", props.task.id);
}
console.log(props.task.is_complete);

function completeTask() {
  emits("completeChild", props.task.id);
}
function uncompleteTask() {
  emits("uncompleteChild", props.task.id);
}

//function to editTasks adding newTitle and newDescrip divs above to call Update function Supabase
function editTask() {
  emits("editChild", newTitle.value, newDescription.value, props.task.id);
  toEdit.value = false;
}

//function to bool edit values
function changeParams() {
  toEdit.value = true;
}
</script>

<style>
#button-delete,
#button-complete,
#button-uncomplete {
  width: 30px;
  padding-right: 7px;
  align-self: flex-start;
  padding-bottom: 5px;
}

#button-edit {
  width: 22px;
  padding-left: 10px;
  align-self: flex-start;
  padding-bottom: 5px;
}

.completed {
  text-decoration-line: line-through;
}
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
