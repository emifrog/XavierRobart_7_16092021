<template>
  <main id="app">
    <h1>Bienvenue sur le réseau Social Groupomania</h1>
    <div class="container">
    <form class="px-4 py-3 signin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" v-model="email" id="email" placeholder="email@example.com" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez ajouter un email valide</span>
      </div>
      <div class="form-group">
        <label for="username">Nom et Prénom</label>
        <input type="text" class="form-control" id="username" v-model="username" name="username" placeholder="Gladys Castagné" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.username.required && $v.username.$dirty)">Veuillez ajouter votre prenom et nom de famille </span>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.password.required && $v.password.$dirty )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres </span>
        <span class="error" v-if="(!$v.password.valid && !$v.password.minLength )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces,et 1 chiffres </span>

      </div>
      <button type="submit" class="btn btn-danger signup" @click="createUser()">
        S'incrire
      </button>
      <span id="notfound" class="error"> </span>
    </form>
    <div class="dropdown-divider separation"></div>
    <p class="encouragement">
      Vous êtes déja inscrit? Connectez nous !
    </p>
    <router-link class="btn btn-danger register" to="/">Se connecter</router-link>
  </div>
    <Footer />
  </main>
</template>
<script>
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Signup",
  components: {
    Footer,
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    username: {
      required,
    },
    password: {
      required,
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return containsUppercase && containsLowercase && containsNumber;
      },
      minLength: minLength(8),
      maxLength: maxLength(19),
    },
  },
  methods: {
    /**
     * Permet de poster les donnees saisie par utilisateur
     */
    createUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const username = document.querySelector("#username").value;
        let users = {
          email: email,
          password: password,
          username: username,
        };
        // Verifie que utilisateur a bien remplie tout les champs
        if (users.email == "" || users.password == "" || users.username == "") {
          users = {
            userVerification: false,
          };
        } // Permet d'envoyer les information pour la creation d'un profil
        axios
          .post(this.$localhost + "api/auth/signup", users)
          .then((res) => {
            console.log(res);
            this.$router.push("/Login");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Une erreur est survenue, veuillez réessayer ultérieurement";
          });
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
.container{
  background-color: rgb(252,132,100);
  border-radius: 10px;
}
.encouragement {
  padding: 0 !important;
  color: rgb(7, 6, 6);
  font-family: Roboto;
  font-weight: 500;
}
.register{
  margin-bottom: 20px;
}
h1{
  margin-bottom: 30px;
}
.error {
  color: red;
}
</style>