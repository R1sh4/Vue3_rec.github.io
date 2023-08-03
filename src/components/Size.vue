<template>
  <div class="card card-top text-center">
    <h3 class="card-header">Ваш размер</h3>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Верх</th>
            <th v-for="title in title_size" :key="title.title">
              {{ title.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>=></td>
            <td v-for="size_top in size_top">
              {{ size_top }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th>Низ</th>
            <th v-for="title in title_size" :key="title.title">
              {{ title.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>=></td>
            <td v-for="size_bottom in size_bottom">
              {{ size_bottom }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["size_top", "size_bottom"],
  data() {
    return {
      title_size: [
        { title: "RU" },
        { title: "Standart" },
        { title: "EU" },
        { title: "USA" },
      ],
    };
  },
};
</script>
