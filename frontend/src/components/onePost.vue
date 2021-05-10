<template>
  <div>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
    <div v-else>
      chargement...
    </div>

    <!-- <p>{{ post.file }}</p> -->
    <!-- <p>Publié par {{ user.firstname }} {{ user.lastname }}</p> -->
    <!-- <div>
      <deleteComment :idComm="comment.id" />
    </div> -->
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";
// import deleteComment from "./deleteComment";
// import newComment from "./newComment";

export default {
  name: "onePost",
  components: {
    // deleteComment,
    // newComment,
  },
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
    this.fetchPost();
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped></style>
