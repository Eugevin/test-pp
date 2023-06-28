import { defineStore } from "pinia";

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

interface State {
  posts: Post[],
  postsRemote: Post[],
  postsLocal: Post[],
  currentPagination: number,
  totalPagination: number,
  input: string,
  dragging: boolean
}

export const usePostsStore = defineStore('posts', {
  state: (): State => ({
    posts: [],
    postsRemote: [],
    postsLocal: [],
    currentPagination: 0,
    totalPagination: 0,
    input: '',
    dragging: false
  }),
  getters: {
    findElement: (state) => {
      return (id: number) => state.posts.find(el => el.id === id);
    }
  },
  actions: {
    setPostsRemote(i: number): void {
      this.currentPagination = i;
      this.postsRemote = this.posts.slice(i * 10, i * 10 + 10);
    },
    removePostsLocal(id: number): void {
      const targetIndex = this.postsLocal.findIndex(el => el.id === id);

      if (targetIndex !== -1) {
        const newValue = [...this.postsLocal];
        newValue.splice(targetIndex, 1);

        this.postsLocal = newValue;
      }
    },
    movePostsLocal(i: number, to: number): void {
      const newValue = [...this.postsLocal];
      const targetI = newValue.findIndex(el => el.id === i);
      const targetTo = newValue.findIndex(el => el.id === to);

      [newValue[targetI], newValue[targetTo]] = [newValue[targetTo], newValue[targetI]];

      this.postsLocal = newValue;

      this.dragging = false;
    },
    addPostsLocal(id: number): void {
      const targetEl = this.posts.find(el => el.id === id);
      const sameEl = this.postsLocal.find(el => el.id === id);

      if (targetEl && !sameEl) {
        // ! REFACTOR ! I DONT REALLY KNOW, IS IT POSSIBLE TO STORE SET OBJECT, BUT SET OBJECT MUST BE HERE INSTEAD OF ARRAY
        // this.postsLocal = !this.postsLocal.size ? new Set<Post>().add(targetEl) : new Set<Post>(this.postsLocal).add(targetEl);

        const newValue = [...this.postsLocal];
        newValue.push(targetEl);

        this.postsLocal = newValue;
      }

      this.dragging = false;
    },
    restore(state: { posts: State }): void {
      const { posts, postsRemote, postsLocal, currentPagination, totalPagination, input } = state.posts;

      this.posts = posts;
      this.postsRemote = postsRemote;
      this.postsLocal = postsLocal;
      this.currentPagination = currentPagination;
      this.totalPagination = totalPagination;
      this.input = input;
    }
  }
})