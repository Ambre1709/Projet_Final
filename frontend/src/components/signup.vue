<template>
  <div class="container_signup">
    <h2>Bienvenue sur votre réseau social d'entreprise</h2>
    <h3>Merci de remplir le formulaire d'inscription</h3>
      
      <form class="signup"  @submit.prevent="signup">

        <label for="firstName">Prénom :</label>
        <input required v-model="firstName" type="text" name="firstName" id="firstName-input" placeholder="Charles"/>

        <label for="lastName">Nom :</label>
        <input required v-model="lastName" type="text" name="lastName" id="lastName-input" placeholder="Dupont"/>

        <label for="email">Email :</label>
        <input required v-model="email" type="email" name="email" id="email-input" placeholder="utilisateur@domaine.fr"/>

        <label for="password">Mot de passe :</label>
        <input required v-model="password" type="password" name="password" id="password-input"/>

        <button type="submit" @click.prevent="buttonSignup"> S'inscrire </button>
        <p v-if="message">{{ message }}</p>

      </form>

        <div class="container_login">
          <p>Vous avez déjà un compte? <router-link to="/login">login</router-link>.</p>
        </div>

  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from 'axios'

export default {
  name: "signup",
 data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message:''
    }
  },
 methods: {
    async buttonSignup() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      await axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        //  'data' of undefined
        .catch((error) => {
          this.message = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.container_signup{
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px #FED7D6;
  margin-top: 50px;
  width: 95%;
}
.signup{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup input{
  width: 500px;
  margin-bottom: 15px;
}
.signup button{
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
.signup button:hover{
  border-radius: 10px 0 10px 0;
}
.container_login{
  margin-top: 20px;
  box-shadow: 0px 0px 10px 0px #FED7D6;
}
</style>
