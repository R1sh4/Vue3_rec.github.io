<script>
import axios from "axios";
export default {
  name: "modal",
  data() {
    return {
      err: "",
      email: "",
      password: "",
      bust: "",
      waistline: "",
      femur: "",
      formBorderColor: {
        emailBC: "gray",
        passBC: "gray",
        bustBC: "gray",
        waistBC: "gray",
        femurBC: "gray",
      },
    };
  },
  methods: {
    clear_color() {
      for (var element in this.formBorderColor) {
        this.formBorderColor[element] = "gray";
      }
      this.err = "";
    },
    check_null() {
      if (
        this.email &&
        this.password &&
        this.bust &&
        this.waistline &&
        this.femur
      ) {
        return true;
      }
      if (!this.email) {
        this.formBorderColor.emailBC = "red";
      }
      if (!this.password) {
        this.formBorderColor.passBC = "red";
      }
      if (!this.bust) {
        this.formBorderColor.bustBC = "red";
      }
      if (!this.waistline) {
        this.formBorderColor.waistBC = "red";
      }
      if (!this.femur) {
        this.formBorderColor.femurBC = "red";
      }
      this.err = "Заполните поля";
    },
    check_form() {
      this.clear_color();
      let flag = true;
      this.password.length;
      if (this.check_null()) {
        const regem = /^[a-zA-Z]\w*@[a-zA-Z]\w*\.[a-zA-Z]+$/;
        if (!regem.test(this.email)) {
          flag = false;
          this.formBorderColor.emailBC = "red";
          this.err = "Некорректный email";
        }
        if (this.password.length < 5) {
          flag = false;
          this.formBorderColor.passBC = "red";
          this.err = "Слишком короткий пароль";
        }
        if (!(this.bust >= 76 && this.bust <= 125)) {
          flag = false;
          this.formBorderColor.bustBC = "red";
          this.err = "Объем груди должен быть от 76 до 125";
        }

        if (!(this.waistline >= 60 && this.waistline <= 108)) {
          flag = false;
          this.formBorderColor.waistBC = "red";
          this.err = "Объем талии должен быть от 60 до 108";
        }

        if (!(this.femur >= 84 && this.femur <= 126)) {
          flag = false;
          this.formBorderColor.femurBC = "red";
          this.err = "Объем бедер должен быть от 84 до 126";
        }
        return flag;
      }
    },
    accept() {
      if (this.check_form()) {
        const postBody = {
          email: this.email,
          password: this.password,
          flag_admin: 0,
          bust: this.bust,
          waistline: this.waistline,
          femur: this.femur,
        };
        axios
          .post("add_user.php", postBody)

          .then((response) => {
            if (!response.data.err) this.close_add();
            else this.err = response.data.err;
            console.log(this.err);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    close_add(id) {
      this.$emit("close_add");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Зарегистрируйтесь
          <button type="button" class="btn-close" @click="close"></button>
        </slot>
      </header>
      <section class="modal-body">
        <div class="row align-items-center form-reg">
          <div class="err">{{ err }}</div>
          <div class="col-lg-12 m-b-1">
            <p class="text-center text-data m-b-1">Почта email</p>
            <input
              type="email"
              :style="{ borderColor: formBorderColor.emailBC }"
              v-model="email"
              placeholder="Почта e@mail.ru"
            />
          </div>
          <div class="col-lg-12 m-1">
            <p class="text-center text-data m-1">Пароль</p>
            <input
              type="password"
              :style="{ borderColor: formBorderColor.passBC }"
              v-model="password"
              placeholder="Не менее 5ти символов"
            />
          </div>
          <div class="col-lg-12 m-1">
            <p class="text-center text-data m-1">Обхват груди, см</p>
            <input
              type="number"
              :style="{ borderColor: formBorderColor.bustBC }"
              v-model="bust"
              placeholder="От 76 до 125"
            />
          </div>
          <div class="col-lg-12 m-1">
            <p class="text-center text-data m-1">Обхват талии, см</p>
            <input
              type="number"
              :style="{ borderColor: formBorderColor.waistBC }"
              v-model="waistline"
              placeholder="От 60 до 108"
            />
          </div>
          <div class="col-lg-12">
            <p class="text-center text-data">Обхват бедер, см</p>
            <input
              type="number"
              :style="{ borderColor: formBorderColor.femurBC }"
              v-model="femur"
              placeholder="От 84 до 126"
            />
          </div>
        </div>
      </section>
      <footer class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="close">
          Отмена
        </button>
        <button type="button" class="btn btn-success" @click="accept">
          Подтвердить
        </button>
      </footer>
    </div>
  </div>
</template>
