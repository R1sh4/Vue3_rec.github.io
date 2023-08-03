<template>
  <div class="dropdown">
    <a
      class="dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-offset="-90,7"
    >
      Войти
    </a>
    <form class="dropdown-menu">
      <div class="mb-4 auth-top">Авторизуйтесь</div>
      <div class="mb-3">
        <input
          type="text"
          v-model="email"
          @input="$emit('update:user_email', $event.target.value)"
          class="auth-input"
          placeholder="Почта e@mail.ru"
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          v-model="password"
          class="auth-input"
          placeholder="Пароль"
        />
      </div>
      <div class="mb-1">Нет учетной записи?</div>
      <div class="mb-1">
        <a class="reg" href="#" @click="showModal">Зарегистрируйтесь</a>
      </div>

      <button @click="log_in" class="btn btn-primary">Войти</button>
    </form>
  </div>
  <Modal
    v-show="isModalVisible"
    @close="closeModal"
    @close_add="closeModalAdd"
  />
</template>

<script>
import axios from "axios";
import Modal from "./Modal.vue";
export default {
  props: ["user_email", "user_password"],
  components: {
    Modal,
  },
  data() {
    return {
      email: this.user_email,
      password: this.user_password,
      isModalVisible: false,
    };
  },
  watch: {
    user_email() {
      this.email = this.user_email;
    },
    user_password() {
      this.password = this.user_password;
    },
  },
  methods: {
    log_in() {
      const postBody = {
        email: this.email,
        password: this.password,
      };
      console.log(postBody);
      axios
        .post("auth.php", postBody)

        .then((response) => {
          console.log(response);
          if (response.data.authorized == 1) {
            this.$emit("get_user");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //this.$router.push("/adminka");
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModalAdd() {
      this.$emit("get_user");
      this.isModalVisible = false;
    },
  },
};
</script>
