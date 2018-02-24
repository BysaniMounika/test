var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended  : true })); 
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'lkgukg',
database : 'bysu'
});
connection.connect();

app.get('/sections', function(req, res){
	console.log("Displaying Classes");
	connection.query('select * from section',function(err,results) {
		if(err) throw error;
		res.send(results);
	});

});

app.post('/section/add', function(req, res) {
	console.log("add class");
	console.log(req.body);
	var sql = "INSERT into section SET ?";
	connection.query(sql, req.body, function(err, results) {
		 if(err) console.log( err ); 
		res.send("success");
	});
});
app.post('/section/edit',function(req,res) {
	console.log("update class");
	console.log(req.body);
	var sql = "UPDATE `section` SET `class_name`=? where `class_id`=?";
	connection.query(sql, [req.body.class_name,req.body.class_id], function(err, results) {
		 if(err) console.log( err ); 
		res.send("success");
	});
});
app.post('/section/delete',function(req,res) {
	console.log("delete class");
	console.log(req.body);
	var sql = "DELETE FROM `student` WHERE `class_id`=?";
	connection.query(sql, req.body.class_id, function(err, results) {
		 if(err) console.log( err ); 
	});
	sql = "DELETE FROM `section` WHERE `class_id`=?";
	connection.query(sql, req.body.class_id, function(err, results) {
		 if(err) console.log( err ); 
		 res.send("success");
	});
});

app.post('/section/students', function(req, res){
	console.log("Displaying Students");
	console.log(req.body);
	connection.query("select * from `student` where `class_id`=?",req.body.class_id,function(err,results) {
		if(err) throw error;
		res.send(results);
	});

});
app.post('/section/student/add', function(req, res) {
	console.log("student add");
	console.log(req.body);
	var sql = "INSERT into student SET ?";
	connection.query(sql, req.body, function(err, results) {
		 if(err) console.log( err ); 
		res.send("success");
	});
});
app.post('/section/student/edit',function(req,res) {
	console.log("student edit");
	console.log(req.body);
	var sql = "UPDATE `student` SET `student_name`=?,`student_phn`=? where `student_id`=?";
	connection.query(sql, [req.body.student_name,req.body.student_phn,req.body.student_id], function(err, results) {
		 if(err) console.log( err ); 
		res.send("success");
	});
});
app.post('/section/student/delete',function(req,res) {
	console.log("student delete");
	console.log(req.body);
	var sql = "DELETE FROM `student` WHERE `student_id`=?";
	connection.query(sql, req.body.student_id, function(err, results) {
		 if(err) console.log( err ); 
		res.send("success");
	});
});
app.listen(3000);
