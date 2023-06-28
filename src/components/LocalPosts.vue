<script setup lang="ts">
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';

const store = usePostsStore();

let viewEl = ref<HTMLElement>()

function drop(e: any) {
  if (e.dataTransfer && e.dataTransfer.getData('elID')) {
    store.addPostsLocal(+e.dataTransfer.getData('elID'));
  }

  if (e.dataTransfer && e.dataTransfer.getData('elIDInside')) {
    store.movePostsLocal(+e.dataTransfer.getData('elIDInside'), +e.toElement.dataset.id);
  }
}

function dragStart($event: DragEvent, id: string) {
  store.dragging = true;

  if ($event.dataTransfer) {
    $event.dataTransfer.dropEffect = 'move';
    $event.dataTransfer.effectAllowed = 'move';
    $event.dataTransfer.setData('elIDInside', id);
  }
}
</script>

<template>
  <div class="local-posts">
    <h1 class="local-posts__title">Local posts</h1>
    <div :class="`local-posts__view ${store.dragging ? 'local-posts__view_dragging' : ''}`" ref="viewEl" @drop.stop="drop"
      @dragover.prevent @dragenter.prevent>
      <TransitionGroup name="list">
        <div class="local-post" @dragstart="dragStart($event, String(post.id))" draggable="true" v-for="post in store.postsLocal" :data-id="post.id" :key="post.id">
          <div class="local-post__remove" @click="store.removePostsLocal(post.id)">Remove item</div>
          <div class="local-post__id">UserID: {{ post.userId }}</div>
          <div class="local-post__title">{{ post.title }}</div>
          <div class="local-post__body">{{ post.body }}</div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
// * FOR ANIMATION NEEDS
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.local-posts {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: #daf3f7;

  &__title {
    margin-bottom: 2rem;
  }

  &__view {
    min-height: 50vh;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    transition: var(--transition);

    &_dragging {
      background-color: #a3ecf8;

      // * YUP, I CAN HACK THE SYSTEM 🤡
      
      .local-post > div {
        pointer-events: none;
      }
    }
  }

  .local-post {
    padding: 1rem;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 20rem;

    &__remove {
      padding: 0.5rem;
      background: #e66262;
      cursor: pointer;
    }

    &__id {
      font-style: italic;
    }

    &__title {
      font-weight: bold;
    }
  }
}
</style>