module.exports = class Menu {
  constructor(payload) {
    this.id = Math.random().toString(16).substr(2, 6);
    this.name = payload.name;
    this.price = Number(payload.price);
  }
}
