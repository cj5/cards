<template>
  <div
    :class="`modal-filter${modalShow ? ' show' : ''}`"
    role="dialog"
  >
    <div class="modal-wrap">
      <div class="modal">
        <a class="icon-close" @click="close">
          <span>&times;</span>
        </a>
        <!-- <slot></slot> -->
        <p v-html="modalCopy"></p>
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
      }
    },
    methods: {
      close() {
        this.$store.commit('setModalShow', false)
      },
    },
  }
</script>