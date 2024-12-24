<script setup>
import { ref } from 'vue';
import { getPaginatedUsers } from '../../api/usersAPI';
import UsersTable from './components/usersTable.vue';

const isLoading = ref(true);
const users = ref([]);

async function loadData() {
  const res = await getPaginatedUsers();
  // console.log(res);
  users.value = res.users;
  isLoading.value = false;
}

loadData();
</script>

<template>
  <h1>Users</h1>
  <UsersTable :is-loading="isLoading" :users="users" />
</template>
