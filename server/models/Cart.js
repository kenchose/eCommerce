module.exports = function Cart(oldCart) {
  this.items = oldCart.items || 0; //|| gives flexibility to assign a new or existing value
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //add item to existing cart
  this.add = function (item, id) {
    let storedItem = this.items[id];
    let storeit = this.item[id]
    console.log('storedItem', storedItem)
    console.log('this is item', storeit)
    //checks if item has already been added to cart and if not then create new producted added
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    //if item is already added then only need to update new qty and price
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalqty++;
    this.totalPrice += storedItem.item.price;
  };

  //create array of items in the cart
  this.generateArray = () => {
    let arr = [];
    for (let id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
