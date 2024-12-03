// const { response } = require('express');
const RestaurantModel = require('../Model/RestaurantModel');
const MenuItemsModel = require('../Model/MenuitemsModel');
module.exports.getRestaurantListByLocID = async (request,response) => {
    let { loc_id } = request.params;
    let result = await RestaurantModel.find(
        { location_id: loc_id},
        { locality: 1, name: 1, city: 1, image: 1}
    );
    if (result.length === 0) {
        response.send({
            status:false,
            restaurants: "restaurant is not available for given location",
    });
} else {
    response.send({
    status:true,
    restaurants:result,
    });
}
};

module.exports.getRestaurantDetailsByID = async (request,response) => {
    let { id } = request.params;
    try {
    let result = await RestaurantModel.findById(id); // find({ _id: id}), findOne({_id : id})
    response.send({
        status:true,
        restaurants:result,
    });
} catch (error) {
    response.status(500).send({
        status:false,
        message: "Invalid Id is passed",
        error: error.message,
    })
}
};

// module.exports.filter =  async (request, response) => {

// //Filter
//  //Mealtype (mandatory)
//  //Location
//  //cuisines
//  //cost-for-two (500 (low_cost) to 1000 (high_cost))
//  //sort (ASC / dESC)
//  //page (1,2,3,4,5) (pre-page -2 restaurant)

//  let {mealtype, location, l_cost, h_cost, sort , cuisine } = request.body;

//  sort = sort ? sort : 1;

//  //high to low (DESC) and low to heigh  (ASC)
//  const filterData = {};
// //  const l_cost = 900;
// //  const h_cost = 1000;

//  if(mealtype !== undefined) filterData["mealtype_id"] = mealtype;
//  if(location !== undefined) filterData["location_id"] = location;
//  if(l_cost !== undefined && h_cost !== undefined) 
//     filterData['min_price'] = { $gt : l_cost, $lt: h_cost };
//  if(cuisine !== undefined) filterDate["cuisine"] = {$in : cuisine};



//  console.log(filterData);

// try{
//     let result = await RestaurantModel.find(filterData,{
//         name:1,
//         city:1,
//         locality:1,
//         location_id:5,
//         min_price:1,
//         image:1,
//         cuisine:1,
//     }).sort({
//         min_price: sort,
//     });
    
//  //high to low (DESC) -1
//   // low to heigh  (ASC) 1
//     if (result.length === 0) {
//         response.send({
//             status:false,
//             restaurants: "restaurant is not available ",
//     });
// } else {
//     response.send({
//     status:true,
//     restaurants:result,
//     });
// }

// } catch(error) {
//     mongoDbError(error.message);
//     response.status(500).send({
//         status: false,
//         message:"Invalid id is passed",
//     });
// }
// };
module.exports.filter = async (request, response) => {
    let { mealtype, location, l_cost, h_cost, sort, cuisine } = request.body;

    sort = sort ? sort : 1;

    // High to low (DESC) and low to high (ASC)
    const filterData = {};

    if (mealtype !== undefined) filterData["mealtype_id"] = mealtype;
    if (location !== undefined) filterData["location_id"] = location;
    if (l_cost !== undefined && h_cost !== undefined) 
        filterData['min_price'] = { $gt: l_cost, $lt: h_cost };
    if (cuisine !== undefined) filterData["cuisine"] = { $in: cuisine };  // Fixed typo

    console.log(filterData);

    try {
        let result = await RestaurantModel.find(filterData, {
            name: 1,
            city: 1,
            locality: 1,
            location_id: 1,
            min_price: 1,
            image: 1,
            cuisine_id:1,
            cuisine: 1,
        }).sort({
            min_price: sort,
        });

        if (result.length === 0) {
            response.send({
                status: false,
                restaurants: "restaurant is not available",
            });
        } else {
            response.send({
                status: true,
                restaurants: result,
            });
        }

    } catch (error) {
        console.error(error.message);
        response.status(500).send({
            status: false,
            message: "An error occurred while filtering restaurants.",
            error: error.message,
        });
    }
};


module.exports.getMenuItems = async (request,response) => {
    let {_id} = request.params;
    try{
    let result= await MenuItemsModel.find({restaurant:_id});
    response.status(200).send({
        status: true,
       menu_items: result,
    })
} catch (error) {
    console.error(error.message);
    response.status(500).send({
        status: false,
        message: "An error occurred while filtering restaurants.",
       
    });
}
};
module.exports.searchRestaurant = async (request, response) => {
    let { restaurant,
        loc_id} = request.body; // Use request.body to access POST data
    // console.log(restaurant, loc_id); // Log to check if the data is received correctly
    let result = await RestaurantModel.find({
        name: { $regex: restaurant + ".*" , $options: "i"},
        location_id: Number(
            loc_id),
});
 response.send({
        status: true,
        message: "it working",
        restaurant,
        loc_id,
        result,
      
    });
};





