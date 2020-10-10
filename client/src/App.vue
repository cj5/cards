<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      message: 'Static test',
    };
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/users')
      .then((res) => {
        this.message = res.data;
        console.log(res);
      })
      .catch((err) => {
        this.message = err;
        console.log(err);
      });
  },
};
</script>

<style lang='scss'>
@import './styles/app';
</style>
