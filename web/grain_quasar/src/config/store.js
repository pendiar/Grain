export default {
  data() {
    return {
      states: {
      },
    };
  },
  methods: {
    setStates(name, value) {
      if (this.states[name]) {
        this.states[name] = value;
      } else {
        this.$set(this.states, name, value);
      }
    },
  },
};
