<script setup>
import UsersTable from './components/usersTable.vue';
import { usePaginatedUsers } from './composables/usePaginatedUsers';

const { isLoading, users, currentPage, pageCount, isFirstPage, isLastPage, prev, next } = usePaginatedUsers();
</script>

<template>
  <article class="usersPage">
    <h1>All Users</h1>
    <UsersTable :is-loading="isLoading" :users="users" />
    <div class="pagination">
      <button :disabled="isFirstPage" @click="prev">
        Prev
      </button>
      <button v-for="page in pageCount" :key="`page-${page}`" :disabled="currentPage === page" @click="currentPage = page">
        {{ page }}
      </button>

      <button :disabled="isLastPage" @click="next">
        Next
      </button>
    </div>
  </article>
</template>

<style>
.usersPage{
max-width: calc(1200px + 2 * 1rem);
margin:1rem auto;
padding: 1rem;
display: grid;
gap:1rem;
font-size: small;
}
.pagination{
  display: flex;
  flex-wrap: wrap;
  gap:0.25rem
}
</style>
