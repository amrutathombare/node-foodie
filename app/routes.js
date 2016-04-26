var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all todos in the database
        getFoods(res);
    });
    
    app.get('/api/total', function(req,res){
        Food.aggregate([
                            {
                                $group:{
                                    _id:null,
                                    total: {$sum: '$price'}
                                }}
                ], function(err, result){
                   // console.log("inside get total");
                    if (err) {
                                console.log(err);
                                return;
                                }
                    console.log(result[0].total);
                    sum= result[0].total;
                    grand_total= sum + (0.075* sum);
                    res.json(grand_total);
                });
 
    });
    // create todo and send back all todos after creation
    app.post('/api/foods', function (req, res) {
        console.log(req.body.food_name);
        console.log(req.body.price);
        // create a todo, information comes from AJAX request from Angular
        Food.create({
            food_name: req.body.food_name,
            price: req.body.price
            //done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFoods(res);
        });

    });

    // delete a todo
    app.delete('/api/foods/:food_name', function (req, res) {
        console.log();
        Food.remove({
            food_name: req.params.food_name
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};