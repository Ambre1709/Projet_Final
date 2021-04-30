<template>
  <div>
    <nav id="nav">
      <router-link to="/feed">Accueil</router-link>
      <a to="/login" v-on:click="Logout()"> Déconnexion</a>
    </nav>
    <div id="container">
      <!-- Email, Nom et prénom du profil -->
      <div v-if="dataProfile">
        <p>E-mail :{{ " " + dataProfile.email }}</p>
        <p>
          Prénom et Nom :
          {{ dataProfile.firstname + " " + dataProfile.lastname }}
        </p>
      </div>
      <div v-else>
        chargement...
      </div>
      <!-- modification Nom et prénom du profil -->
      <form method="post" @submit.prevent="updateProfile">
        <div>
          <label for="lastname">Nom :</label>
          <input
            required
            v-model="lastname"
            type="text"
            name="lastName"
            id="lastname-input"
            placeholder="Dupont"
          />
        </div>
        <div>
          <label for="firstname">Prénom :</label>
          <input
            required
            v-model="firstname"
            type="text"
            name="firstname"
            id="firstname-input"
            placeholder="Charles"
          />
        </div>

        <button type="submit" @click.prevent="updateProfile">Modifier</button>
        <p v-if="message">{{ message }}</p>
      </form>
      <!-- Supprimer le profil -->
      <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
        Supprimer mon compte
      </button>

      <!-- ICI ajouter de quoi afficher les posts du profil -->
      <h3>Mes Posts</h3>
      <div class="les-Posts">
        <div class="mes-Post" v-for="myPost in postProfile" :key="myPost.id">
          <h3>{{ myPost.title }}</h3>
          <img
            :src="myPost.image"
            :alt="myPost.image"
            v-if="myPost.image != null"
          /><br />
          <p>{{ myPost.content }}</p>
          <!-- <deletePost :id="myPost.id" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";

export default {
  data() {
    return {
      token: "",
      userId: "",
      message: "",
      dataProfile: null,
      postProfile: [],
      email: "",
      firstname: "",
      lastname: "",
    };
  },
  methods: {
    loadProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.dataProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    allPostsProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId + "/posts", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.postProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    updateProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
      };
      axios
        .put("http://localhost:3000/api/auth/profile/" + userId, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          alert("Votre profil a bien été mis à jour !");
          this.dataProfile = res.data.user;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    deleteProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .delete("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre compte est supprimé !");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    /*appeler les fonctions quand l'html sera pret*/
    this.loadProfile();
    this.allPostsProfile();
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
#container {
  display: flex;
  flex-direction: column;
}
.deletebtn {
  width: 150px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background-color: rgb(216, 41, 41);
  margin-top: 40px;
  margin-bottom: 60px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.deletebtn:hover {
  border-radius: 10px 0 10px 0;
}
button {
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 5px 0px black;
}
.error {
  font-size: 1.2em;
  color: rgb(216, 41, 41);
  margin-top: 20px;
}
form {
  background-color: #d9d9d9;
  padding-top: 20px;
}
label {
  margin-right: 10px;
  margin-bottom: 10px;
}
input {
  margin-bottom: 10px;
}
</style>
