<script setup>
import UsersTable from './components/usersTable.vue';
import { usePaginatedUsers } from './composables/usePaginatedUsers';

const { isLoading, users, currentPage, pageCount, isFirstPage, isLastPage, prev, next } = usePaginatedUsers();
</script>

<template>
  <h1>Users</h1>
  <UsersTable :is-loading="isLoading" :users="users" />
  <button :disabled="isFirstPage" @click="prev">
    Prev
  </button>
  <button v-for="page in pageCount" :key="`page-${page}`" :disabled="currentPage === page" @click="currentPage = page">
    {{ page }}
  </button>

  <button :disabled="isLastPage" @click="next">
    Next
  </button>
</template>
