const express = require('express');
const router = express.Router();
const location = require('../Controller/LocationController');
const restaurant = require('../Controller/RestaurantController');
const mealtype = require('../Controller/MealtypeController');
const menuitems = require('../Controller/MenuitemsController');
const order = require('../Controller/OrdersController');
const Payment = require('../Controller/PaymentController');

router.get('/',(request,response) => {
    response.send('Hello this is express JS')
});

router.get('/about',(request,response) => {
    response.send('Hello this is express JS about page')
});

router.get('/contact',(request,response) => {
    response.send('Hello this is express JS contact page')
})


// 1st api i.e welcome api
router.get("/api", location.welcome);
// location api
router.get("/api/get-location-list", location.getLocationList);

// restaurant  api
router.get("/api/get-restaurant-list-loc-id/:loc_id",restaurant.getRestaurantListByLocID);
router.post("/api/search-restaurant", restaurant.searchRestaurant);



router.get("/api/get-restaurant-details-by-id/:id",restaurant.getRestaurantDetailsByID);

// router.get('/get-menu-items/:rest_id',)

// Filter
router.post('/api/filter', restaurant.filter);

// mealtype api 
router.get("/api/get-meal-types-list",mealtype.getMealTypeList);

// menu items
router.get("/api/get-menu-items-list-by-rest-id/:rest_id",menuitems.getMenuItemsByRestID);


router.get("/api/get-menu-items/:rest_id", restaurant.getMenuItems);

// orders
router.post('/api/save-orders', order.saveNewOrder);

//Payments
router.post('/api/gen-orders-id',Payment.genOrderId);


module.exports = router;