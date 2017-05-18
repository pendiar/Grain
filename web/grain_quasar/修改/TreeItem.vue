<template>
  <li class="q-tree-item">
    <div
      :class="{'q-tree-expandable-item': isExpandable, 'q-tree-link': model.handler}"
    >
      <i v-if="model.icon">{{model.icon}}</i>
      <span class="q-tree-label" @click="handler">{{model.title}}</span>
      <span v-if="isExpandable" v-html="model.expanded ? contractHtml : expandHtml" @click="toggle"></span>
    </div>
    <q-transition name="slide">
      <ul v-show="isExpandable && model.expanded">
        <q-tree-item
          v-for="item in model.children"
          :key="item"
          :model="item"
          :contract-html="contractHtml"
          :expand-html="expandHtml"
        ></q-tree-item>
      </ul>
    </q-transition>
  </li>
</template>

<script>
export default {
  name: 'q-tree-item',
  props: ['model', 'contract-html', 'expand-html'],
  methods: {
    handler () {
      if (typeof this.model.handler === 'function') {
        this.model.handler(this.model)
        return
      }

      if (this.isExpandable) {
        this.model.expanded = !this.model.expanded
      }
    },
    toggle () {
      this.model.expanded = !this.model.expanded
    }
  },
  computed: {
    isExpandable () {
      return this.model.children && this.model.children.length
    }
  }
}
</script>
