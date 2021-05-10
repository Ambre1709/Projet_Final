<template>
  <div>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <new-comment @refresh="fetchComments" :id="post.id"></new-comment>

      <div :key="comment.id" v-for="comment of comments">
        <!-- <pre>
          <code>{{ comment }}</code>          
        </pre> -->
        <p>
          {{ comment.comment }}
        </p>
        <p>de {{ comment.User.firstName }} {{ comment.User.lastName }}</p>
        <div v-if="comment.User.id === me">
          <button @click.prevent="deleteComment(comment.id)">Supprimer</button>
        </div>
      </div>
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
import config from "../config.json";
import newComment from "./newComment";

export default {
  name: "onePost",
  components: {
    newComment,
  },
  data() {
    return {
      post: null,
      comments: [],
      me: 0,
    };
  },

  methods: {
    async fetchPost() {
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
        console.log("error");
      }
      this.loading = false;
    },
    async fetchComments() {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          config.endpoint + "/api/post/" + this.$route.params.id + "/comments",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        this.comments = data;
      } catch (error) {
        if (error.status === 401) {
          this.$router.push("/login");
        }
      }
    },
    async deleteComment(id) {
      console.log("delete comment id: ", id);
      const isConfirm = await confirm(
        "êtes vous sure de supprimer le commentaire ?"
      );
      console.log({ isConfirm });
      if (!isConfirm) {
        return;
      }
      // delete comment id
      // this.fetchComments();
    },
  },
  mounted() {
    this.fetchPost();
    this.fetchComments();
    this.me = Number(localStorage.getItem("id"));
    // Number("11"); // 11
    // Number("tugudu"); // NaN
    // isNaN(Number("tugudu")) // true
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped></style>
