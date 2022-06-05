export default class CustomFSError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomFSError';
  }
}