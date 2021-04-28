<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <p>Publié par {{ user.firstname }} {{ user.lastname }}</p>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
export default {
  props: ["title", "content", "user"],
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.card {
  border: 1px solid black;
}
</style>
