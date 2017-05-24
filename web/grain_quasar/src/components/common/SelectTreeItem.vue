<template>
    <div class="q-collapsible">
        <label class="item item-link non-selectable item-collapsible">
            <div class="item-primary">
                <span class="q-checkbox cursor-pointer"><input type="checkbox" v-model="checked" :value="item.Number"><div></div></span>
            </div>
            <div class="item-content has-secondary">
                <div>{{item.Name || item.Number}}</div>
            </div>
            <i class="item-secondary" @click.stop.prevent="toggle" v-if="item.children&&item.children.length">keyboard_arrow_down</i>
        </label>
        <transition name="toggleSlide">
            <div v-show="show">
                <div class="q-collapsible-sub-item">
                    <select-tree-item v-model="checked" v-for="childitem in item.children" :item="childitem" :key="item.ID"></select-tree-item>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'select-tree-item',
        props: ['item', 'value'],
        computed: {
            checked: {
                get: function () {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('input', newValue);
                },
            }
        },
        data() {
            return {
                show: false,
            };
        },
        methods: {
            toggle() {
                this.show = !this.show;
            },
        },
    };
</script>

<style lang="less" scoped>
    .toggleSlide-enter-active, .toggleSlide-leave-active {
        transition: height .5s;
        overflow: hidden;
    }
    .toggleSlide-enter, .toggleSlide-leave-active {
        height: 0;
    }
    .is-mobile .item>.item-primary {
        margin: 4px 0;
    }
    .is-mobile .item>.item-primary~.item-content{
        margin-left: 48px;
    }
</style>
