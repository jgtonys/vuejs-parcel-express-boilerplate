<template>
  <v-card>
    <v-card-title>
        <span class="headline">User Login</span>
    </v-card-title>
    <v-card-text>
      <v-container fill-height fluid>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="E-mail" v-model="user.email" :rules="emailRules" required></v-text-field>
          <v-text-field label="Password" type="password" v-model="user.password" :rules="passwordRules" :counter="20" required></v-text-field>
          <v-btn small @click="doLogin" :disabled="!valid && loading" :loading="loading">Login</v-btn>
          <v-btn small @click="cancel">Cancel</v-btn>
          <v-btn small depressed outline @click="goRegister">Sign up</v-btn>
        </v-form>
        <p v-if="submitData">{{submitData|json}}</p>
      </v-container>
    </v-card-text>
  </v-card>
</template>


<script>
import axios from 'axios';
import Signupform from './Signup.vue';

export default {
  name: 'Loginform',
  components: {
    'registerForm': Signupform
  },
  data() {
    return {
        user: {
            email: "",
            password: "",
        },
        submitData: "",
        loading: false,
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6 ) || 'Password must be more than 6 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
    };
  },
  methods: {
    doLogin() {
      this.loading = true;
      this.submitData = "verifying email...";
      let bodyFormData = {
        'email': this.user.email,
        'password': this.user.password
      };
      axios({
        method: 'post',
        url: '/signin',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'application/json' }}
      })
        .then(res => {
          this.loading = false;
          this.submitData = "Successfully Login!";
          console.log(res.data);
          this.$session.set('user', res.data.data.email);
          this.$session.set('userToken', res.data.token);
          this.$store.commit('login',this.$session);
          this.$router.replace('/');
        })
        .catch(err => {
          this.loading = false;
          this.submitData = err.response.data.message;
          //this.clear();
        });
    },
    cancel() {
      this.$refs.form.reset();
      this.$store.commit('setLoginDialog',false);
    },
    goRegister() {
      this.cancel();
      this.$router.replace('/signup');
    }
  }
};
</script>
