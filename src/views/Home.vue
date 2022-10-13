<template>
  <Nav />
  <div v-if="!editFromNav" class="responsive-task-lists">
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
        v-for="myTask in taskArraySupermarket"
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
  <div class="responsive-new-task"><NewTask @childNewTask="addTask" /></div>

  <br />
  <br />
  <br />
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
});

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

async function addTask(title, description, category) {
  await useTasks.addTask(title, description, category);
  fetchTasksGeneral();
}

async function deleteFather(taskId) {
  await useTasks.deleteTask(taskId);
  fetchTasksGeneral();
}

async function completeFather(taskId) {
  await useTasks.completeTask(taskId);
  fetchTasksGeneral();
}
async function uncompleteFather(taskId) {
  await useTasks.uncompleteTask(taskId);
  fetchTasksGeneral();
}
async function editFather(title, description, id) {
  await useTasks.editTask(title, description, id);
  fetchTasksGeneral();
}
</script>

<style>
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

@media only screen and (min-width: 940px) {
  .responsive-task-lists {
    display: flex;
    flex-direction: column;
  }
}
</style>
