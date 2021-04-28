<template>
  <div>
    <nav id="nav">
      <router-link to="/feed">Accueil</router-link>
    </nav>
    <div v-if="dataProfile">
      <p>E-mail:{{ dataProfile.email }}</p>
      <p>
        Prénom et Nom: {{ dataProfile.firstname + " " + dataProfile.lastname }}
      </p>
    </div>
    <div v-else>
      chargement...
    </div>
    <!-- ICI ajouter de quoi afficher le Nom et prénom du profil -->
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

    <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
      Supprimer mon compte
    </button>

    <!-- ICI ajouter de quoi afficher les posts du profil -->
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
      //   messagesProfile: [],
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
    // loadMessagesProfile() {
    //   let token = localStorage.getItem("token");
    //   let userId = localStorage.getItem("id");
    //   axios
    //     .get("http://localhost:3000/api/auth/profile/" + userId + "/messages", {
    //       headers: { Authorization: "Bearer " + token },
    //     })
    //     .then((res) => {
    //       this.messagesProfile = res.data;
    //     })
    //     .catch((error) => {
    //       console.log({ error });
    //     });
    // },
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
          // document.location.reload();
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
    // this.loadMessagesProfile();
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#form input {
  width: 500px;
}
#form button {
  margin-top: 50px;
  margin-bottom: 100px;
}

.deletebtn {
  background-color: rgb(216, 41, 41);
  margin-top: 20px;
  margin-bottom: 20px;
}

.error {
  font-size: 1.2em;
  color: rgb(216, 41, 41);
  margin-top: 20px;
}
</style>
