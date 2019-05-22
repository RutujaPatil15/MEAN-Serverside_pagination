var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var paginate = require('mongojs-paginate');


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());


var db = mongojs('employee', ['personalData']);

app.get('/get_employee_personal_data',function(req,res){
    var limit=parseInt(req.query.count);
    var page=parseInt(req.query.page);
    var query;
    if(req.query.filter)
    {
      if(req.query.filter.full_name){
         var s2=".*"+decodeURI(req.query.filter.full_name)+".*";
         query=db.personalData.find({'full_name':{$regex : s2, '$options' : 'i'}}).sort({ '_id' : 1 });
      }
    }
    else
    {
      query=db.personalData.find({}).sort({ '_id' : 1 });
    }
    // Feed the query into paginate query function. Paging object with page and limit fields is required!
    paginate(query, { limit : limit, page : page }, function(err, result) {  
    res.json(result);
    });
});

app.listen('7000')
console.log('running on 7000');