<template>
  <div>
    <div v-if="post">
      <div class="le-post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
        <!-- pour poster un commentaire -->
        <new-comment @refresh="fetchComments" :id="post.id"></new-comment>
      </div>
      <!-- Début des commentaires -->
      <div class="card" :key="comment.id" v-for="comment of comments">
        <p>
          {{ comment.comment }}
        </p>
        <p class="commDe">
          Publié par {{ comment.User.firstName }} {{ comment.User.lastName }}
        </p>
        <div v-if="comment.User.id === me">
          <button @click.prevent="deleteComment(comment.id)">Supprimer</button>
        </div>
        <!-- Fin des commentaires -->
      </div>
    </div>
    <div v-else>
      chargement...
    </div>
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
<style scoped>
.le-post {
  margin: 30px 20px 30px 20px;
  padding: 1px 0px 30px 0px;
  background-color: #d2fafa;
  border-radius: 10px;
}
.card {
  margin: 10px 20px 0px 20px;
  padding: 1px 30px 30px 30px;
  background-color: white;
  border-radius: 10px;
}
button {
  cursor: pointer;
  border: unset;
  font-size: 1em;
  background: rgb(216, 41, 41);
  margin-top: 10px;
  color: white;
}
.commDe {
  font-style: italic;
}
</style>
