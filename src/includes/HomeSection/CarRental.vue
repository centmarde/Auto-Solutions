<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"><h1>this is Car Rental</h1></div>
        <button
          type="button"
          id="Goback_button"
          class="btn btn-primary ms-5"
          @click="GoBack"
        >
         Home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    GoBack() {
      this.$router.push("/UserLanding");
    },
  },
};
</script>
