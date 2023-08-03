<script setup>
import Size from "./Size.vue";
import Info from "./Info.vue";
import { model } from "../script.js";
import Choise from "./Choise.vue";
import LogIn from "./LogIn.vue";
import InputData from "./InputData.vue";
</script>
<template>
  <div class="row row-top">
    <div class="col-lg-4">
      <div v-if="user.flag_admin">
        <router-link tag="button" to="/adminka">Админка</router-link>
      </div>
    </div>
    <div class="col-lg-4 offset-lg-3">
      <LogIn
        :user_email="user.email"
        :user_password="user.password"
        v-on:get_user="check_user"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-lg-4">
      <Size :size_top="size_top" :size_bottom="size_bottom" />
      <Info
        :body_type="body_type"
        :info_fit="info.fit"
        :info_not_fit="info.not_fit"
      />
    </div>
    <div class="col-lg-3">
      <div id="model">
        <img class="model" src="" hidden />
      </div>
    </div>
    <div class="col-lg-4">
      <InputData
        v-on:infopost="infoset"
        :user_bust="user.bust"
        :user_waistline="user.waist"
        :user_femur="user.femur"
      />
      <Choise
        ref="choise"
        v-on:change_model="change_model"
        :body_type_id="body_type_id"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        flag_admin: "",
        bust: "",
        waist: "",
        femur: "",
      },
      body_type: "",
      body_type_id: 0,
      info: {},
      size_top: {},
      size_bottom: {},
      src: "",
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.check_user();
      model(document.getElementById("model"), "../src/mh1.glb");
    });
  },
  methods: {
    check_user() {
      axios
        .post("session.php")

        .then((response) => {
          if (response.data.authorized == 1) {
            this.user.email = response.data.email;
            this.user.password = response.data.password;
            this.user.flag_admin = response.data.flag_admin;
            this.user.bust = response.data.bust;
            this.user.waist = response.data.waistline;
            this.user.femur = response.data.femur;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    infoset(data) {
      this.body_type_id = data.id;
      switch (data.body_type) {
        case "apple":
          this.body_type = "Яблоко";
          break;
        case "hourglass":
          this.body_type = "Песочные часы";
          break;
        case "pear":
          this.body_type = "Треугольник";
          break;
        case "rectangle":
          this.body_type = "Прямоугольник";
          break;
        case "triangle":
          this.body_type = "Перевернутый треугольник";
          break;
        default:
          break;
      }

      this.info = {
        fit: data.fit.split(";"),
        not_fit: data.not_fit.split(";"),
      };
      this.img_src = data.src;
      this.size_top = {
        size_ru_top: data.size_ru_top,
        standard_top: data.standard_top,
        size_eu_top: data.size_eu_top,
        size_usa_top: data.size_usa_top,
      };
      this.size_bottom = {
        size_ru_bottom: data.size_ru_bottom,
        standard_bottom: data.standard_bottom,
        size_eu_bottom: data.size_eu_bottom,
        size_usa_bottom: data.size_usa_bottom,
      };
      this.$refs.choise.dress_click();
    },
    change_model(data) {
      this.src = data.src;
      model(document.getElementById("model"), this.src);
    },
  },
  components: {
    LogIn,
    Size,
    Info,
    Choise,
    InputData,
  },
};
</script>
