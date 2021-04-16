<template>
  <!-- ICI ajouter de quoi afficher le Nom et prénom du profil -->
  <div>
    <form method="post" @submit.prevent="updateProfile">
      <div>
        <label for="lastName">Nom :</label>
        <input
          required
          v-model="lastName"
          type="text"
          name="lastName"
          id="lastName-input"
          placeholder="Dupont"
        />
      </div>
      <div>
        <label for="firstName">Prénom :</label>
        <input
          required
          v-model="firstName"
          type="text"
          name="firstName"
          id="firstName-input"
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
      //   token: "",
      //   userId: "",
      message: "",
      //   dataProfile: [],
      //   messagesProfile: [],
      email: "",
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    // loadProfile() {
    //   let token = localStorage.getItem("token");
    //   let userId = localStorage.getItem("id");
    //   axios
    //     .get("http://localhost:3000/api/auth/profile/" + userId, {
    //       headers: { Authorization: "Bearer " + token },
    //     })
    //     .then((res) => {
    //       this.dataProfile = res.data;
    //     })
    //     .catch((error) => {
    //       console.log({ error });
    //     });
    // },
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
      // pourquoi du locale storage et pk utiliser token et id?
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
      axios
        .put("http://localhost:3000/api/auth/profile/" + userId, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre profil a bien été mis à jour !");
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
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
  //   mounted() {
  //     this.loadProfile();
  //     this.loadMessagesProfile();
  //   },
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
