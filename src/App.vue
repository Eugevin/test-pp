<script setup lang="ts">
import RemotePosts from './components/RemotePosts.vue';
import LocalPosts from './components/LocalPosts.vue';
</script>

<template>
  <main>
    <RemotePosts />
    <LocalPosts />
  </main>
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

main {
  display: flex;
  min-height: 100vh;
}
</style>
