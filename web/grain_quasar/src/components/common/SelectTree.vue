<template>
  <div class="select-tree">
    <collapsible-select v-model="selected" v-for="item in tree" :item="item" :key="item.ID"></collapsible-select>
  </div>
</template>

<script>
  export default {
    props: ['tree', 'value'],
    computed: {
      selected: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
  };
</script>
