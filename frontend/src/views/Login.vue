<template>
  <main id="app">
    <h1>Bienvenue sur le réseau Social Groupomania</h1>
    <div class="container">
    <form class="px-4 py-3 signin">
      <div class="form-group">
        <label class="text" for="email">Adresse Email</label>
        <input type="email" class="form-control" v-model="email" id="email" placeholder="email@example.com" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez ajouter un email valide</span>
      </div>
      <div class="form-group">
        <label class="text" for="password">Mot de passe</label>
        <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.password.required && $v.password.$dirty )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres </span>
        <span class="error" v-if="(!$v.password.valid && !$v.password.minLength )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres </span>
      </div>
      <button type="submit" class="btn btn-danger signup" v-on:click="loginUser()">
        Se connecter
      </button><br>
      <span id="notfound" class="error"> </span>
    </form>
    
    <p class="encouragement">
      Vous n'êtes pas inscrit? Rejoignez nous !
    </p>
    <router-link class="btn btn-danger register" to="/Signup">S'INSCRIRE</router-link>
    </div>
    <Footer />
  </main>
</template>
<script>

import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
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
    loginUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const user = {
          email: email,
          password: password,
        };

        axios
          .post(this.$localhost + "api/auth/login", user, {
            header: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/Home");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Utilisateur non trouvé, veuillez vérifier vos identifiants";
          });
      } else {
        document.getElementById("notfound").innerHTML =
          "Utilisateur non trouvé, veuillez vérifier vos identifiants";
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
.text{
  font-family: Roboto;
  font-size: 20px;
  color: rgb(7, 6, 6);
  font-weight: 400;
}
.signin {
  width: 50%;
  margin: 70px auto auto auto;
}
.signup {
  margin-bottom: 40px;
}
.register{
  margin-bottom: 20px;
}
.separation {
  margin-bottom: 50px;
  padding-bottom: 3em;
}
.encouragement {
  padding: 0 !important;
  color: rgb(7, 6, 6);
  font-family: Roboto;
  font-weight: 500;
}
.error {
  color: red;
}
@media (max-width: 1024px) {
  .signin {
    width: 100%;
    margin: 0;
  }
}
@media (max-width: 1024px) {
  h1 {
    font-size: 20px !important;
  }
}
</style>