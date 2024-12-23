<script setup>
import { ref } from 'vue';
import { getAllTodos } from '../api/todos';
import TodoCart from '../components/TodoCart.vue';

const isLoading = ref(true);
const allTodos = ref([]);

async function loadData() {
  allTodos.value = await getAllTodos();
  isLoading.value = false;
}

loadData();
</script>

<template>
  <h1>Home</h1>

  <progress v-if="isLoading" />
  <TodoCart v-else-if="allTodos.length > 0" :items="allTodos" />
</template>
