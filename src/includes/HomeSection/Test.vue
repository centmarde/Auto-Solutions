<template>
    <div>
      <input v-model="make" placeholder="Car Make"/>
      <input v-model="model" placeholder="Car Model"/>
      <button @click="fetchCompletion">Get Completion</button>
      <div v-if="completion">
        <p>{{ completion }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getChatCompletion } from '@/api/generate-car-details';
  
  export default {
    data() {
      return {
        make: '',
        model: '',
        fieldsToFill: ['Mileage', 'Engine', 'Horsepower', 'Torque', 'TopSpeed', 'Transmission'],
        completion: null
      };
    },
    methods: {
      async fetchCompletion() {
        this.completion = await getChatCompletion(this.make, this.model, this.fieldsToFill);
      }
    }
  };
  </script>
  