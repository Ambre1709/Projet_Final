<template>
  <div>
    <div id="nav"><router-link to="/feed">Retour</router-link></div>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
    <div v-else>
      chargement...
    </div>
    <!-- <p>{{ post.file }}</p> -->
    <!-- <p>Publié par {{ user.firstname }} {{ user.lastname }}</p> -->
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";

export default {
  name: "onePost",
  data() {
    return {
      post: null,
      //loading: false,
    };
  },

  methods: {
    async fetchPost() {
      //this.loading = true;
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/post/" + this.$route.params.id,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        this.post = data;
      } catch (error) {
        if (error.status === 401) {
          this.$router.push("/login");
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    console.log("test");
    this.fetchPost();
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped></style>
