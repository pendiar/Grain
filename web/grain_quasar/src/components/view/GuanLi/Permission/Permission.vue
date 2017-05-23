<template>
  <div class="permission">
    <div class="layout-padding">
      <div class="list">
        <collapsible-toggle label="aaa" v-model="checked">
          <div class="item">
            <div class="item-content has-secondary">
              Events and reminders
            </div>
            <label class="item-secondary">
              <q-toggle v-model="checked"></q-toggle>
            </label>
          </div>
        </collapsible-toggle>
        <collapsible-toggle label="bbb" v-model="checked">
          <div class="item two-lines">
            <div class="item-content has-secondary">
              <div>Events and reminders</div>
              <div>Lorem ipsum...</div>
            </div>
            <label class="item-secondary">
              <q-toggle v-model="checked" class="purple"></q-toggle>
            </label>
          </div>
        </collapsible-toggle>
        <collapsible-toggle label="ccc" v-model="checked">
          <div class="item three-lines">
            <div class="item-content has-secondary">
              <div>Events and reminders</div>
              <div>Lorem ipsum...</div>
            </div>
            <label class="item-secondary">
              <q-toggle v-model="checked" class="red"></q-toggle>
            </label>
          </div>
        </collapsible-toggle>
      </div>
    </div>
  </div>
</template>

<script>
  import CollapsibleToggle from 'components/common/CollapsibleToggle.vue';
  export default {
    components: {
      CollapsibleToggle,
    },
    data() {
      return {
        checked: false
      };
    },
  };
</script>

<style lang="less">

</style>
