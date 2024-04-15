const { foodproduct, sequelize, foodCart } = require("./ORM");

class UpdateCartService {
  async updateCart(p_id, qty, u_id) {
      sequelize.sync();
      let cart = await getCart(u_id);
      let price = await foodproduct.findOne({ where: { id: p_id } });

      let result;

      if (cart.length !==0 ) {
        for (const element of cart) {
          if (element.dataValues.p_id == p_id) {
            result = await foodCart.update(
              {
                quantity: parseInt(qty),
                total_price: parseInt(qty) * price.dataValues.Price,
              },
              { where: { p_id: p_id, u_id: u_id } }
            );
            break;
          }
        }
        if (result !== undefined) {
          return result[0];
        } else {
          throw new Error("No product avaliable in the cart");
        }
      } else {
        throw new Error(`No cart found for user id ${u_id}`);
      }
  }
}

async function getCart(id) {
  sequelize.sync();
  let result = await foodCart.findAll({
    where: { u_id: id },
  });
  return result;
}

module.exports = { UpdateCartService };