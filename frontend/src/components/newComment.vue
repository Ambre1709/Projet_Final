<template>
  <div>
    <form method="post" @submit.prevent="buttonNewComment">
      <div>
        <label for="comment"></label>
        <hr />
        <input
          type="text"
          id="comment"
          placeholder="Ici votre commentaire"
          v-model="comment"
        />
      </div>
      <button type="submit">Envoyer</button>
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
    id: { type: Number },
  },
  data() {
    return {
      comment: "",
      error: "",
    };
  },
  methods: {
    async buttonNewComment() {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/post/" + this.id + "/comment/",
          {
            comment: this.comment,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        console.log(data);
        this.$emit("refresh");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
input {
  margin-bottom: 15px;
  margin-top: 15px;
  width: 500px;
  max-width: 94%;
  border-style: solid;
  border-color: #31bcc6;
  background-color: white;
}
button {
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background: #31bcc6;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
button:hover {
  border-radius: 10px 0 10px 0;
}
hr {
  border: 2px solid #d6dfe2;
  margin-top: 30px;
  margin-bottom: 10px;
}
/* .error {
  font-size: 11px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  padding: 10px;
} */
</style>
