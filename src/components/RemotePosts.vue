<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { debounce } from 'debounce';
import { usePostsStore } from '../stores/posts';
import { API } from '../helpers/api';
import Pagination from './Pagination.vue';

const store = usePostsStore();
const localStore = localStorage.getItem('store');

let inputValue = '';
let rootEl = ref<HTMLElement>()

const searchPosts = debounce(async () => {
  const nameHeading = inputValue ?? '';

  const response = await fetch(API.MainLike + nameHeading);
  const data = await response.json();

  saveToStore(data);
  store.input = inputValue;

  // * JUST LITTLE BIT INCREASE THE TIMER FOR MORE VIRAL VISUAL EFFECT (NOT EVERYBODY TYPIN\G LIKE IM 😎)
}, 500);

onMounted(() => {
  if (!localStore) {
    getPosts();
    return;
  }

  const oldData = JSON.parse(localStore);

  store.restore(oldData);

  // ! REFACTOR ! RESTORE OLD DATA TO INPUT
  inputValue = oldData.posts.input;
});

async function getPosts(): Promise<void> {
  const response = await fetch(API.Main);
  const data = await response.json();

  saveToStore(data);
}

function saveToStore(data: any) {
  store.posts = data;
  store.postsRemote = data.slice(0, 10);
  store.totalPagination = Math.ceil(data.length / 10);
  store.currentPagination = 0;
}

// ! REFACTOR ! QUICK HACK TO MAKE BOTTOM ACTUALLY BOTTOM ALWAYS AFTER REFRESH
function slickToBottom(): void {
  setTimeout(() => rootEl.value ? rootEl.value.scrollTop = rootEl.value.scrollHeight : null);
}

// * DRAG & DROP

function dragStart($event: DragEvent, id: string) {
  store.dragging = true;

  if ($event.dataTransfer) {
    $event.dataTransfer.dropEffect = 'move';
    $event.dataTransfer.effectAllowed = 'move';
    $event.dataTransfer.setData('elID', id)
  }
}
</script>

<template>
  <div ref="rootEl" class="remote-posts">
    <h2 class="remote-posts__title">Remote posts</h2>
    <input v-model="inputValue" @input="searchPosts" class="remote-posts__search" type="text"
      placeholder="Search by name...">
    <div class="remote-posts__view">
      <div class="remote-post" draggable="true" @dragstart="dragStart($event, String(post.id))" v-for="post in store.postsRemote" :key="post.id">
        <div class="remote-post__id">UserID: {{ post.userId }}</div>
        <div class="remote-post__title">{{ post.title }}</div>
        <div class="remote-post__body">{{ post.body }}</div>
      </div>
    </div>
    <Pagination @change="slickToBottom" />
  </div>
</template>

<style scoped lang="scss">
.remote-posts {
  height: 100vh;
  overflow-y: scroll;
  padding: 1rem;
  background: #eeeeee;

  &__search {
    margin: 1rem 0;
  }

  &__view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .remote-post {
    padding: 1rem;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 20rem;

    &__id {
      font-style: italic;
    }

    &__title {
      font-weight: bold;
    }
  }
}
</style>