<template>
  <div>
    <div id="banniere">
      <div><img id="ban" src="../assets/ban.jpg" /></div>
      <div><h1 class="tittleban">FEED</h1></div>
    </div>
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
#banniere {
  display: flex;
  flex-direction: column;
}
#ban {
  display: flex;
  width: 100%;
  margin: 0px -10px 0px -10px;
  overflow: hidden;
}
.tittleban {
  display: flex;
  justify-content: center;
  color: white;
}
#container {
  display: flex;
  justify-content: space-around;
}
.allpost {
  flex: 2;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.newpost {
  flex: 1;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 1130px) {
  #container {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .allpost {
    width: 100%;
  }
  .newpost {
    width: 100%;
  }
}
</style>
