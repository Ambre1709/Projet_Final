<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <div>
      <router-link :to="`/post/${id}`">
        <img :src="image" />
      </router-link>
    </div>
    <p class="commDe">Publié par {{ user.firstname }} {{ user.lastname }}</p>
    <router-link :to="`/post/${id}`">Commentaires ...</router-link>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
export default {
  props: ["title", "content", "user", "id", "image"],
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.card {
  margin-left: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
  padding: 1px 30px 30px 30px;
  background-color: white;
  border-radius: 10px;
}
.commDe {
  font-style: italic;
}
img {
  max-width: 60%;
}
@media screen and (max-width: 1130px) {
  img {
    max-width: 90%;
  }
}
</style>
