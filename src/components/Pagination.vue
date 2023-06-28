<script setup lang="ts">
import { usePostsStore } from '../stores/posts';

const emit = defineEmits(['change']);

const store = usePostsStore();

function paginationHandler(i: number): void {
  emit('change');
  store.setPostsRemote(i);
}
</script>

<template>
  <div class="pagination">
    <div @click="paginationHandler(i)"
      :class="`pagination__item ${store.currentPagination === i ? 'pagination__item_active' : ''}`"
      v-for="el, i in store.totalPagination" :key="i">{{ el }}</div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 20rem;

  &__item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    flex: 1 1 auto;
    padding: 1rem;
    background: #ffffff;
    transition: var(--transition);

    &_active {
      background: #c9c9c9;
    }

    &:hover:not(.pagination__item_active) {
      background-color: #c9c9c920;
    }
  }
}
</style>