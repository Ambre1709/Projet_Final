<template>
  <div>
    <form method="post" @submit.prevent="buttonNewComment">
      <div>
        <label for="comment"></label>
        <input type="text" id="comment" placeholder="Ici votre commentaire" v-model="comment"/>
      </div>
      <button type="submit" @click.prevent="buttonNewComment">Envoyer</button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";

export default {
  name: "newComment",
  props: {
    id: Number,
  },
  data() {
    return {
      comment: "",
      error: "",
    };
  },
  methods: {
    buttonNewComment() {
      const data = {
        comment: this.comment,
      };
    //   let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/messages/" + this.id + "/comment/",
          data,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.push("/oneMessage/" + this.id);
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.input{
  width: 500px;
}
.button{
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.5);
  background: linear-gradient(80deg,#D1515A 10%,#ff8989 90%);
  margin-top: 40px;
  margin-bottom: 60px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.button:hover{
  border-radius: 10px 0 10px 0;
}
/* .error {
  font-size: 11px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  padding: 10px;
} */
</style>