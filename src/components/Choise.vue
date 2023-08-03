<template>
  <div class="card card-bottom card-list">
    <h3 class="card-header">Виды одежды</h3>
    <div class="card-body">
      <div class="list-group list-group-flush">
        <a
          href="#"
          @click="dress_click"
          class="list-group-item list-group-item-action list-group-item-light"
          v-bind:class="{ active: active.dressisActive }"
          >Платье</a
        >
        <li class="list-group-item item-title">Верх</li>
        <a
          href="#"
          @click="top_click"
          value="short"
          active="shortisActive"
          class="list-group-item list-group-item-action list-group-item-light"
          v-bind:class="{ active: active.shortisActive }"
          >Короткий рукав</a
        >
        <a
          href="#"
          @click="top_click"
          value="long"
          active="longisActive"
          class="list-group-item list-group-item-action list-group-item-light"
          v-bind:class="{ active: active.longisActive }"
          >Длинный рукав</a
        >
        <li class="list-group-item item-title">Низ</li>
        <a
          href="#"
          @click="bot_click"
          value="trousers"
          active="trousersisActive"
          class="list-group-item list-group-item-action list-group-item-light"
          v-bind:class="{ active: active.trousersisActive }"
          >Штаны</a
        >
        <a
          href="#"
          @click="bot_click"
          value="skirt"
          active="skirtisActive"
          class="list-group-item list-group-item-action list-group-item-light"
          v-bind:class="{ active: active.skirtisActive }"
          >Юбка</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["body_type_id"],
  data() {
    return {
      clothes_type: "dress",
      outerwear: "",
      underwear: "",
      active: {
        dressisActive: true,
        shortisActive: false,
        longisActive: false,
        trousersisActive: false,
        skirtisActive: false,
      },
    };
  },
  methods: {
    clear_active() {
      for (var element in this.active) {
        this.active[element] = false;
      }
    },
    image_src: function () {
      if (this.body_type_id != 0) {
        const postBody = {
          body_type_id: this.body_type_id,
          clothes_type: this.clothes_type,
          outerwear: this.outerwear,
          underwear: this.underwear,
        };
        axios
          .post("model_path.php", postBody)

          .then((response) => {
            this.$emit("change_model", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    dress_click() {
      this.clear_active();
      this.active.dressisActive = true;
      this.clothes_type = "dress";
      this.outerwear = "";
      this.underwear = "";
      this.image_src();
    },
    top_click(e) {
      this.clothes_type = "combination";
      this.outerwear = e.target.attributes[3].value;

      switch (true) {
        case this.active.trousersisActive:
          this.clear_active();
          this.active.trousersisActive = true;
          this.underwear = "trousers";
          break;
        case this.active.skirtisActive:
          this.clear_active();
          this.active.skirtisActive = true;
          this.underwear = "skirt";
          break;
        default:
          this.clear_active();
          this.active.trousersisActive = true;
          this.underwear = "trousers";
          break;
      }
      for (var key in this.active) {
        if (key == e.target.attributes[1].value) this.active[key] = true;
      }
      this.image_src();
    },
    bot_click(e) {
      this.clothes_type = "combination";
      this.underwear = e.target.attributes[3].value;

      switch (true) {
        case this.active.shortisActive:
          this.clear_active();
          this.active.shortisActive = true;
          this.outerwear = "short";
          break;
        case this.active.longisActive:
          this.clear_active();
          this.active.longisActive = true;
          this.outerwear = "long";
          break;
        default:
          this.clear_active();
          this.active.shortisActive = true;
          this.outerwear = "short";
          break;
      }
      for (var key in this.active) {
        if (key == e.target.attributes[1].value) this.active[key] = true;
      }
      this.image_src();
    },
  },
};
</script>
