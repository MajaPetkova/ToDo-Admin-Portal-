import { useOffsetPagination } from '@vueuse/core';
import { ref } from 'vue';
import { getPaginatedUsers } from '../../../api/usersAPI';

const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

export function usePaginatedUsers() {
  const isLoading = ref(true);
  const users = ref([]);
  const total = ref(0);

  //   const pageMeta = ref({
  //     limit: 10,
  //     skip: 0,
  //     total: 0,
  //   });

  const {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next,
  } = useOffsetPagination({
    total,
    page: FIRST_PAGE,
    pageSize: PAGE_SIZE,
    onPageChange: loadUsers,
    onPageSizeChange: loadUsers,
  });
  async function loadUsers() {
    // console.log('local', currentPage.value, currentPageSize.value);
    const qParams = { skip: (currentPage.value - 1) * currentPageSize.value, limit: currentPageSize.value };
    const res = await getPaginatedUsers(qParams);
    // console.log(res);
    users.value = res.users;
    total.value = res.total;
    isLoading.value = false;
  }
  loadUsers();
  return { isLoading, users, currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, loadUsers };
}
