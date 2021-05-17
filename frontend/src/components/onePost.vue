<template>
  <div>
    <div v-if="post">
      <div class="le-post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
        <div>
          <!--à ajouter dans la "div v-if.... "":   v-if="post.User.id === me"-->
          <button @click.prevent="deletePost(post.id)">Supprimer</button>
        </div>
        <!-- pour poster un commentaire -->
        <new-comment @refresh="fetchComments" :id="post.id"></new-comment>
      </div>
      <!-- Début des commentaires -->
      <h2>Commentaires :</h2>
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
        "Confirmez vous supprimer le commentaire ?"
      );
      console.log({ isConfirm });
      if (!isConfirm) {
        return;
      }
      let token = localStorage.getItem("token");
      axios
        .delete(
          "http://localhost:3000/api/post/" +
            this.$route.params.id +
            "/comment" +
            //this.idComment,
            //récupérer l'id du com
            { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
          alert("Votre commentaire a bien été supprimé !");
          document.location.reload();
        })
        .catch((error) => {
          console.log({ error });
        });
      // delete comment id
      // this.fetchComments();
    },
    async deletePost(id) {
      console.log("delete post id: ", id);
      const isConfirm = await confirm("Confirmez vous supprimer le post ?");
      console.log({ isConfirm });
      if (!isConfirm) {
        return;
      }
      let token = localStorage.getItem("token");
      axios
        .delete("http://localhost:3000/api/post/" + this.$route.params.id, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre commentaire a bien été supprimé !");
          document.location.reload();
        })
        .catch((error) => {
          console.log({ error });
        });
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
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1em;
  box-shadow: 5px 5px 15px -3px rgb(0 0 0 / 50%);
  background: rgb(255, 61, 61);
  margin-top: 10px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.commDe {
  font-style: italic;
}
</style>
