const mockElMessage = jest.fn((options) => options);
mockElMessage.success = jest.fn();
mockElMessage.warning = jest.fn();
mockElMessage.info = jest.fn();
mockElMessage.error = jest.fn();

module.exports = {
  ElMessage: mockElMessage,
  default: {
    install: jest.fn()
  }
};
