module.exports = class Order {
  constructor(payload) {
    this.id = Math.random().toString(16).substr(2, 6);
    this.menuItem = payload.menuItem;
    this.orderStatus = false;
    this.paymentStatus = false;
  }
}
