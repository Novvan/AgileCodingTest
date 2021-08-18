<template>
  <div class="home">
    <div class="backgroundLogo">
      <img src="../assets/logo.png" />
    </div>
    <div class="loginContainer">
      <h1>Login</h1>
      <router-link to="/images" class="loginButton"
        >Enter to see the images</router-link
      >
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from "vue";

import { API_KEY, ENDPOINT_URL } from "../constants/constants";
import { authRequest } from "../utils/AxiosUtils";

export default {
  name: "Home",
  components: {},

  setup() {
    onBeforeMount(() => {
      let authConfig = {
        method: "post",
        url: ENDPOINT_URL + "/auth",
        data: {
          apiKey: API_KEY,
        },
      };

      authRequest(authConfig);
    });
  },
};
</script>

<style scoped>
.home {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.backgroundLogo {
  position: absolute;
  left: 5vw;
  top: 3.5vh;
}

.loginContainer {
  height: 50vh;
  width: 50vh;
  border: 1.5px solid whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 #e67d2265, 0 6px 20px 0 #e67e2265;
}

.loginButton {
  width: max-content;
  padding: 15px 25px;
  background-color: #e67e22;
  border: 1px solid #e67e22;
  border-radius: 10px;
  color: white;
  text-decoration: none;
}
</style>
