import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// export const useTaskStore2 = defineStore(("nombredelatienda") => {la logica como tal});
export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([]);

  async function fetchTasks() {
    const { data: supaTasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true }); //change true to mount in order
    tasks.value = supaTasks;
    return tasks.value;
  }
  // New code
  async function addTask(title, description, category) {
    console.log(useUserStore().user.id); // call user.js to point specific user uuid at supabase.
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
        category: category,
      },
    ]);
  }

  async function deleteTask(id) {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .match({ id: id });
  }

  async function completeTask(id) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: true })
      .match({ id: id });
  }
  async function uncompleteTask(id) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: false })
      .match({ id: id });
  }
  return {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    completeTask,
    uncompleteTask,
  };
});
