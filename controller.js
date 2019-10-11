const express = require('express')
const app = express()
var db = require("./database.js")
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.status(200).json({"message":"Server status Ok"});
    return;
});

app.get("/contact/:id", (req, res, next) => {
    var sql = "select * from contact where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        if(row !== undefined && row !== []){
            res.status(200).json({
                "message":"success",
                "data":row
            })
        }
        else{
            res.status(404).json({"error":"Contact not found"});
            return;
        }
    });                     
});

app.get("/contacts", (req, res, next) => {
    var sql = "select * from contact"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/contact/", (req, res, next) => {
    var errors=[]
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        birthCountry: req.body.birthCountry,
        notes: req.body.notes
    }

    if(data.name == null || data.name == ''  || data.name == undefined){
        res.status(400).json({"error": "Name required"})
        return;
    }

    var sql ='INSERT INTO contact (name, age, address, birthCountry, notes) VALUES (?,?,?,?,?)'
    var params =[data.name, data.age, data.address, data.birthCountry, data.notes]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/contact/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        birthCountry: req.body.birthCountry,
        notes: req.body.notes
    }
    db.run(
        `UPDATE contact set 
           name = COALESCE(?,name), 
           age = COALESCE(?,age), 
           address = COALESCE(?,address), 
           birthCountry = COALESCE(?,birthCountry),
           notes = COALESCE(?,notes) 
           WHERE id = ?`,
        [data.name, data.age, data.address, data.birthCountry, data.notes, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.status(200).json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/contact/:id", (req, res, next) => {
    db.run(
        'DELETE FROM contact WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.status(200).json({"message":"deleted", changes: this.changes})
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
