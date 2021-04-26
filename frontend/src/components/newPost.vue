<template>
  <div>
    <h4>Nouveau message</h4>
    <form method="post" @submit.prevent="buttonNewPost">
      <div>
        <label for="title">Titre :</label>
        <input
          type="title"
          id="title"
          placeholder="ici votre titre"
          v-model="title"
        />
      </div>
      <div>
        <label for="content">Description :</label>
        <textarea
          type="text"
          id="content"
          placeholder="Votre message..."
          v-model="content"
        />
      </div>
      <div>
        <label for="File" class="file">(Image facultative)</label>
        <input type="file" id="file" ref="file" @change="selectFile()" />
      </div>
      <button type="submit" @click.prevent="buttonNewPost">Envoyer</button>
    </form>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";

export default {
  name: "newPost",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: "",
      title: "",
      content: "",
      file: null,
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    buttonNewPost() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      //avec image
      if (this.file !== null) {
        data.append("userId", this.userId);
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("image", this.file, this.file.name);
        //sans image
      } else {
        data.append("userId", this.userId);
        data.append("title", this.title);
        data.append("content", this.content);
      }
      axios
        .post("http://localhost:3000/api/post/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été envoyé !");
          window.location.reload();
        })
        .catch(console.error());
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.input {
  width: 500px;
  margin-bottom: 15px;
}
.button {
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background: linear-gradient(80deg, #d1515a 10%, #ff8989 90%);
  margin-top: 40px;
  margin-bottom: 60px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.button:hover {
  border-radius: 10px 0 10px 0;
}
</style>
