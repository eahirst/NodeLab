var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('utahweather.html', {root:'public'}); 
});
router.get('/getcity',function(req,res,next){
	console.log("In getcity route");


fs.readFile(__dirname + '/cities.dat.txt',function(err,data){
	if(err) throw err;
	var cities = data.toString().split("\n");
	var jsonresult = [];
	for(var i = 0; i < cities.length; i++){
		var myRe = new RegExp("^" + req.query.q);
		var result = cities[i].search(myRe);
		if(result != -1){
			jsonresult.push({city:cities[i]});
			console.log(cities[i]);
		}
	}
	console.log(jsonresult);
	res.status(200).json(jsonresult);	
})
});
module.exports = router;
