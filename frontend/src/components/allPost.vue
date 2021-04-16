<template>
  <div>
    <div id="allPost">
      <!-- <div id="post-card" v-for="post in allPost" :key="post.id"> -->
      <h1 class="title">{{ post.title }}</h1>
      <div class="content">
        <!-- <img:src="post.image" :alt="post.image" v-if="post.image != null"/><br /> -->
        {{ post.content }}
      </div>
      <!-- <div class="createdAt">
          <i>{{ moment(post.createdAt).fromNow() }}</i>
          <i>{{ post.User.name }} {{ post.User.firstname }}</i>
        </div> -->
      <!-- <div>
          <router-link class="one-post" :to="'/onePost/' + post.id">Voir les commentaires</router-link>
        </div> -->
      <!-- <div class="adminDelete" v-if="isAdmin == true">
          <deletePost :id="post.id" />
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script></script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped></style>
