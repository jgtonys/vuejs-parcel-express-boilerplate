<template>
  <div id="test">
  <v-card>
    <v-card-title>
      Database
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="alldata"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.password }}</td>
        <td>{{ props.item.createdAt }}</td>
        <td>{{ props.item.updatedAt }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item.id)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteUser(props.item.id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="refreshDB">Reset</v-btn>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="E-mail" v-model="editedItem.email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Password" v-model="editedItem.password" type="password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="createUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Test',
  data() {
    return {
        dialog: false,
        search: '',
        user: {
            email: "",
            password: "",
        },
        alldata : [] ,
        editedItem: {
          email: "",
          password: ""
        },
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'E-mail', value: 'name', sortable: false},
          { text: 'Password', value: 'name', sortable: false },
          { text: 'createdAt', value: 'name', sortable: false },
          { text: 'updatedAt', value: 'name', sortable: false },
          { text: 'Actions', value: 'name', sortable: false }
        ],
    };
  },
  created() {
      this.refreshDB();
  },
  mounted() {
    //console.log('login Component ready.');
  },
  methods: {
    createUser() {
        let bodyFormData = {'email': this.editedItem.email,'password': this.editedItem.password};
        axios({
            method: 'post',
            url: '/signup',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then(res => {
          //console.log(res);
          alert("successfully created!");
          this.refreshDB();
        })
        .catch(err => {
          console.log(err);
        });
        this.close();
    },
    refreshDB() {
        axios({
            method: 'get',
            url: '/getall'
        })
        .then(res => {
            this.alldata = res.data;
            console.log(res.data);
        })
        .catch(err => {
          console.log(err.response.data.message);
          this.submitData = err.response.data.message;
          //console.log(err);
        });
    },
    deleteUser(id) {
        let bodyFormData = {'id': id };
        axios({
            method: 'post',
            url: '/deleteUser',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then(res => {
          console.log(res);
          alert("successfully deleted!");
          this.refreshDB();
        })
        .catch(err => {
          console.log(err);
        });
    },
    close () {
        this.dialog = false;
    }
  }/*,
  computed: {
    filteredData() {
      return this.alldata.filter((data) => {
        return data.email.match(this.search);
      });
    }
  }*/
};
</script>

<style lang="css" scoped>
  #test {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }


</style>
