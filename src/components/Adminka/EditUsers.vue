<template>
  <div class="adm-users-edit">
    <div class="row justify-content-start my-2">
      <div class="col-lg-2">
        <button @click="adminka" class="btn">Назад</button>
      </div>
      <div class="col-lg-4 offset-lg-2">
        <h1>Администраторы</h1>
      </div>
      <div class="col-auto">
        <button @click="adminka" class="btn-add">Добавить</button>
      </div>
    </div>
    <div class="table-responsive user-tb">
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">email</th>
            <th scope="col">Пароль</th>
            <th scope="col">Редактирование</th>
            <th scope="col">Удаление</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in admins" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row justify-content-start my-2">
      <div class="col-lg-4 offset-lg-4">
        <h1>Пользователи</h1>
      </div>
      <div class="col-auto">
        <button @click="adminka" class="btn-add">Добавить</button>
      </div>
    </div>
    <div class="table-responsive user-tb">
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">email</th>
            <th scope="col">Пароль</th>
            <th scope="col">Обхват груди</th>
            <th scope="col">Обхват талии</th>
            <th scope="col">Обхват бедер</th>
            <th scope="col">Редактирование</th>
            <th scope="col">Удаление</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.bust }}</td>
            <td>{{ item.waistline }}</td>
            <td>{{ item.femur }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      users: {},
      admins: {},
    };
  },
  created() {
    axios
      .post("get_users.php")
      .then((response) => {
        this.admins = response.data.admins;
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    adminka() {
      this.$router.push("/adminka");
    },
  },
};
</script>
