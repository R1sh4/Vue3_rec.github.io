<template>
  <div class="card card-bottom text-center">
    <h3 class="card-header">Рекомендации</h3>
    <div class="card-body">
      <div class="card-text card-body-type" v-if="info_fit">
        Ваш тип фигуры "{{ body_type }}"
      </div>
      <div class="row" v-if="info_fit">
        <div class="col-lg-6" v-if="info_fit">
          <div class="card-text card-text-fit" v-if="info_fit">Подойдет</div>
          <div class="card-text" v-if="info_fit" v-for="fit in info_fit">
            {{ fit }}
          </div>
        </div>
        <div class="col-lg-6" v-if="info_not_fit">
          <div class="card-text card-text-not-fit" v-if="info_not_fit">
            Не подойдет
          </div>
          <div
            class="card-text"
            v-if="info_not_fit"
            v-for="not_fit in info_not_fit"
          >
            {{ not_fit }}
          </div>
        </div>
      </div>
      <div class="card-text" v-else>
        Выделяют 5 основных типов фигуры: "Песочные часы", "Прямоугольник",
        "Треугольник", "Перевернутый треугольник", "Яблоко". Они зависят от
        строения скелета, распределения жировой массы и формы мышц. А также
        пропорциями между плечами, грудью, талией и бедрами. Вы можете быть
        совсем худой или плюшечкой, но тип фигуры все равно будет сохраняться
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["info_fit", "info_not_fit", "body_type"],
  data() {
    return {};
  },
};
</script>
