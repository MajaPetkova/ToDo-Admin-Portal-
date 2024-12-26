import { useOffsetPagination, useWindowScroll } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPaginatedUsers } from '../../../api/usersAPI';

const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

export function usePaginatedUsers() {
  const router = useRouter();
  const route = useRoute();

  const { y } = useWindowScroll();
  function scrollToTop() {
    y.value = 0;
  }

  const isLoading = ref(true);
  const users = ref([]);
  const total = ref(0);

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
    onPageChange: () => loadUsers(false),
    onPageSizeChange: () => loadUsers(false),
  });

  const trackPaginationInUrl = (qParams) => {
    router.push({ ...route, query: {
      ...(route.query ?? {}),
      ...qParams,
    } });
  };
  async function loadUsers(initialLoad) {
    const page = initialLoad ? (Number(route.query.page) ?? FIRST_PAGE) : currentPage.value;
    const size = initialLoad ? (Number(route.query.size) ?? PAGE_SIZE) : currentPageSize.value;
    // console.log('local', currentPage.value, currentPageSize.value);
    const qParams = { skip: (page - 1) * size, limit: size };

    scrollToTop();
    trackPaginationInUrl({ page, size });
    const res = await getPaginatedUsers(qParams);
    // console.log(res);
    users.value = res.users;
    total.value = res.total;
    isLoading.value = false;
  }
  loadUsers(true);
  return { isLoading, users, currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, loadUsers };
}
