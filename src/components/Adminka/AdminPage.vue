<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <button @click="edit_users" class="adm-btn">
          Редактирование пользователей
        </button>
      </div>
      <div class="col-lg-3">
        <button @click="edit_models" class="adm-btn">
          Редактирование моделей
        </button>
      </div>
      <div class="col-lg-3">
        <button @click="edit_info" class="adm-btn">
          Редактирование информации
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return;
  },
  methods: {
    edit_users() {
      this.$router.push("/edit-users");
      this.visible = false;
    },
    edit_models() {
      this.$router.push("/edit-models");
      this.visible = false;
    },
    edit_info() {
      this.$router.push("/edit-info");
      this.visible = false;
    },
  },
};
</script>
