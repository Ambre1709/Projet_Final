<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <p>Publié par {{ user.firstname }} {{ user.lastname }}</p>
    <router-link :to="`/post/${id}`">Commentaires ...</router-link>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
export default {
  props: ["title", "content", "user", "id"],
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.card {
  border: 1px solid black;
}
</style>
