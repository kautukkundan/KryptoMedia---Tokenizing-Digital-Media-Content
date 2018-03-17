var express     =   require('express');
var app         =   express();
var fs = require('fs');
var CryptoJS = require("crypto-js");




app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");


app.get('/',function (req, res) {
   var coa = fs.readFileSync('./files/COA.png').toString("hex");
   console.log(coa);
   //Encrypt
    var encrypted = CryptoJS.AES.encrypt(coa, '12334');
   // Decrypt
    var bytes  = CryptoJS.AES.decrypt(encrypted.toString(), '12334');
    console.log(bytes.toString(CryptoJS.enc.Utf8));
    if(coa===bytes.toString(CryptoJS.enc.Utf8)){
        console.log("hurray!!!");
        fs.appendFile('./files/COA.txt',coa, function (err) {
            if (err) {
                // append failed
            } else {
                // done
            }
        })
    }
    res.render("index",{clickhandler : "createFileFromHex("+"'"+coa+"'"+", 'rikki.png')"});


});

app.listen(3000,function () {
   console.log("HINT started on port 3000");
});
