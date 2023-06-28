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

<style scoped lang="scss">
main {
  display: flex;
  min-height: 100vh;
}
</style>
