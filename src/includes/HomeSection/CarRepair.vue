<template>
  <div>
    <h1>this is CarRepair</h1>
    <button
      type="button"
      id="Goback_button"
      class="btn btn-primary ms-5"
      @click="GoBack"
    >
      Home
    </button>
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
