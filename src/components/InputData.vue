<template>
  <div class="card card-top">
    <h3 class="card-header">Введите данные</h3>
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-lg-12">
          <p class="text-center text-data">Обхват груди, см</p>
          <input type="number" v-model="bust" placeholder="От 76 до 125" />
        </div>
        <div class="col-lg-12">
          <p class="text-center text-data">Обхват талии, см</p>
          <input type="number" v-model="waistline" placeholder="От 60 до 108" />
        </div>
        <div class="col-lg-12">
          <p class="text-center text-data">Обхват бедер, см</p>
          <input type="number" v-model="femur" placeholder="От 84 до 126" />
        </div>
        <div class="col-lg-12">
          <button class="btn btn-primary" v-on:click="submit">
            Рассчитать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["user_bust", "user_waistline", "user_femur"],
  data() {
    return {
      bust: this.user_bust,
      waistline: this.user_waistline,
      femur: this.user_femur,
      info: "",
      errors: [],
    };
  },
  watch: {
    user_bust() {
      this.bust = this.user_bust;
    },
    user_waistline() {
      this.waistline = this.user_waistline;
    },
    user_femur() {
      this.femur = this.user_femur;
    },
  },
  created() {
    this.bust = this.userBust;
  },
  methods: {
    submit: function () {
      if (
        this.bust >= 76 &&
        this.bust <= 125 &&
        this.waistline >= 60 &&
        this.waistline <= 108 &&
        this.femur >= 84 &&
        this.femur <= 126
      ) {
        const postBody = {
          bust: this.bust,
          waistline: this.waistline,
          femur: this.femur,
        };
        axios
          .post("calculations.php", postBody)

          .then((response) => {
            this.$emit("infopost", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
