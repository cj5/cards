<template>
  <div
    :class="`modal-filter${modalShow ? ' show' : ''}`"
    role="dialog"
  >
    <div class="modal-wrap">
      <div class="modal">
        <a class="icon-close" @click="close" @keydown.enter="close">
          <span>&times;</span>
        </a>
        <div class="tac fz-md">
          <p v-html="modalCopy"></p>
          <button class="btn mt-2" @click="close" @keydown.enter="close">{{ modalBtnCopy }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    computed: {
      modalShow() {
        return this.$store.state.modalShow
      },
      modalCopy() {
        return this.$store.state.modalCopy
      },
      modalBtnCopy() {
        return this.$store.state.modalBtnCopy
      }
    },
    methods: {
      close() {
        this.$store.commit('setModalShow', false)
      },
    },
  }
</script>