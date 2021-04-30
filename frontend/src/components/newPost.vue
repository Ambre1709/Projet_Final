<template>
  <div>
    <form method="post" @submit.prevent="buttonNewPost">
      <h3>Nouveau message</h3>
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
button {
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
}
form {
  background-color: #d9d9d9;
  padding-top: 1px;
  margin-top: 40px;
  margin-bottom: 40px;
}
label {
  margin-right: 10px;
  margin-bottom: 10px;
}
input {
  margin-bottom: 10px;
}
</style>
