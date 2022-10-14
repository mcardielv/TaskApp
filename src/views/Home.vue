<template>
  <Nav />
  <!-- <img
    class="nav-button"
    src="../assets/edit_white.svg"
    id="button-edit"
    @click="editEverything"
  /> -->
  <div class="general-div">
    <div v-if="newTaskBool" class="responsive-task-lists">
      <div class="materialsArray">
        <h3 class="categoryTitle">Materials</h3>
        <hr class="separator" />
        <TaskItem
          class="materialsArrayData"
          v-for="myTask in taskArrayMaterials"
          :key="myTask"
          :task="myTask"
          @deleteChild="deleteFather"
          @completeChild="completeFather"
          @uncompleteChild="uncompleteFather"
          @editChild="editFather"
        />
      </div>

      <div class="restaurantsArray">
        <h3 class="categoryTitle">Restaurants</h3>
        <hr class="separator" />
        <TaskItem
          class="restaurantsArrayData"
          v-for="myTask in taskArrayRestaurants"
          :key="myTask"
          :task="myTask"
          @deleteChild="deleteFather"
          @completeChild="completeFather"
          @uncompleteChild="uncompleteFather"
          @editChild="editFather"
        />
      </div>

      <div class="supermarketArray">
        <h3 class="categoryTitle">Supermarket</h3>
        <hr class="separator" />
        <TaskItem
          class="supermarketArrayData"
          v-for="myTask in taskArraySupermarkets"
          :key="myTask"
          :task="myTask"
          @deleteChild="deleteFather"
          @completeChild="completeFather"
          @uncompleteChild="uncompleteFather"
          @editChild="editFather"
        />
      </div>

      <div class="transportsArray">
        <h3 class="categoryTitle">Transport</h3>
        <hr class="separator" />
        <TaskItem
          class="transportsArrayData"
          v-for="myTask in taskArrayTransports"
          :key="myTask"
          :task="myTask"
          @deleteChild="deleteFather"
          @completeChild="completeFather"
          @uncompleteChild="uncompleteFather"
          @editChild="editFather"
        />
      </div>
    </div>
    <div v-if="!newTaskBool" class="responsive-new-task">
      <NewTask @childNewTask="addTask" />
    </div>
  </div>

  <br />
  <br />
  <br />
  <div id="footer" class="navbar black">
    <h2>TOTAL = {{ sumValues }}€</h2>
    <button v-if="newTaskBool" class="footer-button" @click="newTaskSelect">
      +
    </button>
  </div>
  <button v-if="!newTaskBool" class="footer-button" @click="newTaskDeSelect">
    v
  </button>

  <Footer />
</template>

<script setup>
import Nav from "../components/Nav.vue";
import { ref, onMounted } from "vue";
import { useTaskStore } from "../stores/task";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Footer from "../components/Footer.vue";

const useTasks = useTaskStore();

const taskArray = ref([]);
const taskArrayMaterials = ref([]);
const taskArrayRestaurants = ref([]);
const taskArraySupermarkets = ref([]);
const taskArrayTransports = ref([]);

onMounted(() => {
  fetchTasksGeneral();
  fetchTasksNumber();
});

//function to getTasks from the store and separate in arrays filtered depending each category
async function fetchTasksGeneral() {
  taskArray.value = await useTasks.fetchTasks();
  taskArrayMaterials.value = taskArray.value.filter(
    (task) => task.category === 1
  );
  taskArrayRestaurants.value = taskArray.value.filter(
    (task) => task.category === 2
  );
  taskArraySupermarkets.value = taskArray.value.filter(
    (task) => task.category === 3
  );
  taskArrayTransports.value = taskArray.value.filter(
    (task) => task.category === 4
  );
}
//function to add task
async function addTask(title, description, category) {
  await useTasks.addTask(title, description, category);
  fetchTasksGeneral();
  fetchTasksNumber();
}

const newTaskBool = ref(true);
//function to activate new task screen
function newTaskSelect() {
  newTaskBool.value = false;
}
function newTaskDeSelect() {
  newTaskBool.value = true;
}

//3 functions to delete, mark as complete/uncomplete or update info
async function deleteFather(taskId) {
  await useTasks.deleteTask(taskId);
  fetchTasksGeneral();
  fetchTasksNumber();
}

async function completeFather(taskId) {
  await useTasks.completeTask(taskId);
  fetchTasksGeneral();
  fetchTasksNumber();
}
async function uncompleteFather(taskId) {
  await useTasks.uncompleteTask(taskId);
  fetchTasksGeneral();
  fetchTasksNumber();
}
async function editFather(title, description, id) {
  await useTasks.editTask(title, description, id);
  fetchTasksGeneral();
  fetchTasksNumber();
}

//function to sum values from all
const sumValues = ref("");
const emits = defineEmits(["sumEmit"]);

async function fetchTasksNumber() {
  sumValues.value = await useTasks.fetchTasks();
  sumValues.value = sumValues.value
    .filter((task) => task.is_complete === false)
    .map((task) => task.description)
    .reduce((previousValue, currentValue) => previousValue + currentValue)
    .toFixed(2);
  emits("sumEmit", sumValues.value);
  console.log(sumValues.value);
}
</script>

<style>
.general-div {
  padding-top: 55px;
}
/* .responsive-new-task {
} */
.behind {
  position: sticky;
}
.materialsArray {
  background-color: #fee99c;
  padding-bottom: 40px;
  min-height: 200px;
}

.restaurantsArray {
  background-color: #9cd4ff;
  padding-bottom: 40px;
  min-height: 200px;
}

.supermarketArray {
  background-color: #9cffb2;
  padding-bottom: 40px;
  min-height: 200px;
}

.transportsArray {
  background-color: #fc4e12;
  padding-bottom: 40px;
  min-height: 200px;
}

.categoryTitle {
  text-align: center;
  padding-top: 15px;
}

.separator {
  margin-top: 10px;
  margin-bottom: 10px;
}
@media (min-width: 1025px) {
  .general-div {
    display: flex;
    flex-direction: row;
  }
  .responsive-task-lists {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  .materialsArray,
  .restaurantsArray,
  .supermarketArray,
  .transportsArray {
    min-width: 900px;
    max-width: 1200px;
  }
  .responsive-new-task {
    width: 100%;

    /* min-width: 500px; */
    margin-left: auto;
    margin-right: auto;
  }
  .h4 {
    width: 100%;
  }
  .h5 {
    width: 100%;
  }
}
</style>
