<template>
  <div>
    <h1>Sign Up</h1>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field label="E-mail" v-model="user.email" :rules="emailRules" required></v-text-field>
      <v-text-field label="Password" type="password" v-model="user.password" :rules="passwordRules" :counter="20" required></v-text-field>
  	  <v-text-field label="Repeat Password" type="password" v-model="user.passwordRepeat" :rules="repeatRules" :counter="20" required></v-text-field>
      <p v-if="submitData">{{submitData|json}}</p>
      <v-btn @click="doSignup" :disabled="!valid && loading" :loading="loading">Sign Up</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Signupform',
  data() {
    return {
        user: {
          email: "",
          password: "",
          passwordRepeat: ""
        },
        submitData: "",
        valid: true,
        loading: false,
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6 ) || 'Password must be more than 6 characters'
        ],
    	  repeatRules:[
      		v => !!v || 'Repeat Password is required',
      		v => (v&&v == this.user.password)||'Password Incorrect!'
    	  ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
    };
  },
  methods: {
    doSignup() {
      this.loading = true;
      let bodyFormData = {
        'email': this.user.email,
        'password': this.user.password
      };
      axios({
        method: 'post',
        url: '/signup',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'application/json' }}
      })
        .then(res => {
          this.loading = false;
          this.submitData = "Successfully Registered!";
          console.log(res);
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
          //console.log(err);
        });
    },
    clear () {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
    
</style>