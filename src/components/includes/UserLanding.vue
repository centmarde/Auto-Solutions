<template>
  <div class="container">
   <div class="row">
    <div class="col d-flex justify-content-center"> <button
      type="button"
      id="logout_button"
      class="btn btn-primary"
      @click="logout"
    >
      Logout
    </button>
    <!-- <button type="button" id="carmod_button" class="btn btn-primary" @click="doLogout">Logout</button>
      <button type="button" id="carparts_button" class="btn btn-primary" @click="doLogout">Logout</button>-->

    <button
      type="button"
      id="CarParts_button"
      class="btn btn-primary ms-5"
      @click="gotoCarParts"
    >
      CarParts
    </button>
    <button
      type="button"
      id="CarRepair_button"
      class="btn btn-primary ms-5"
      @click="goToCarRepair"
    >
      CarRepair
    </button>
    <button
      type="button"
      id="CarRepair_button"
      class="btn btn-primary ms-5"
      @click="gotoCarRental"
    >
      CarRental
    </button></div>
   </div>
  </div>
</template>

<script>
import { doLogout } from "../../lib/supaBase";

export default {
  methods: {
    goToCarRepair() {
      this.$router.push("/CarRepair");
    },

    gotoCarParts() {
      this.$router.push("/CarParts");
    },
    gotoCarRental() {
      this.$router.push("/CarRental");
    },

    async logout() {
      await doLogout();
    },
  },
};
</script>
