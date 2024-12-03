const MenuItemsModel = require('../Model/MenuitemsModel');
const { mongodbError } = require('../Routes/debugger');

module.exports.getMenuItemsByRestID = async (request,response) => {
    let { rest_id } = request.params;
    try {
    let result = await MenuItemsModel.find({ restaurantId:rest_id });
    response.send({
        status: true,
        menu_items: result,
    });
} catch (error) {
    response.status(500).send({
        status:false,
        message: "Invalid Id is passed",
        error: error.message,
    })
}
};

