<template>
  <div>
    <h1>FEED</h1>
    <div id="container">
      <div class="allpost">
        <allPost />
      </div>
      <div class="newpost">
        <newPost />
      </div>
    </div>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import allPost from "./allPost";
import newPost from "./newPost";
export default {
  name: "feed",
  components: {
    allPost,
    newPost,
  },
  data() {
    return {
      token: "",
      allPost: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
#container {
  display: flex;
  justify-content: space-around;
}
.allpost {
  flex: 2;
}
.newpost {
  flex: 1;
}

@media screen and (max-width: 1130px) {
  #container {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
