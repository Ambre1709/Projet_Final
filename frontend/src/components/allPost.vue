<template>
  <div v-if="!loading" id="allPost">
    <h3 class="title">Liste des posts</h3>
    <cardPost
      :key="post.id"
      v-for="post of posts"
      :title="post.title"
      :content="post.content"
      :user="post.User"
      :id="post.id"
    />
  </div>
  <div v-else>
    chargement...
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";
import cardPost from "./cardPost";

export default {
  name: "allPosts",
  components: { cardPost },
  data() {
    return {
      posts: [],
      loading: false,
    };
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get("http://localhost:3000/api/post", {
          headers: { Authorization: "Bearer " + token },
        });
        this.posts = data;
      } catch (error) {
        if (error.status === 401) {
          this.$router.push("/login");
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped></style>
