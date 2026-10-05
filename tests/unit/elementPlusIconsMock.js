module.exports = new Proxy({}, {
  get: () => ({
    name: 'MockIcon',
    render() {
      return null;
    }
  })
});
