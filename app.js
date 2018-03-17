var express     =   require('express');
var app         =   express();
var fs = require('fs');
var CryptoJS = require("crypto-js");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

function encrypt(file){

  var toBeEnc = fs.readFileSync(file).toString("hex");

  var encrypted = CryptoJS.AES.encrypt(toBeEnc, '12334');

  fs.appendFile('./files/'+file+'.Krypt', encrypted, function (err) {
    if (err) {
                // append failed
              } else {
                // done
              }
            });
}


app.post("/uploads", upload.single('avatar'), function (req, res) {  
  res.redirect('/')
});


app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.get('/token',function(req,res){
    res.render('upload.html');
})

app.get('/',function (req, res) {

  res.render("main")
    // console.log(coa);
    // //Encrypt
    
    
  //  // Decrypt
  //  var file2b = fs.readFileSync('./files/test.Krypt');
  //  var bytes  = CryptoJS.AES.decrypt(file2b.toString(), '12334');
  //  console.log(bytes.toString(CryptoJS.enc.Utf8));
  //  if(coa===bytes.toString(CryptoJS.enc.Utf8)){
  //   console.log("hurray!!!");
  //   fs.appendFile('./files/COA.txt',coa, function (err) {
  //     if (err) {
  //               // append failed
  //             } else {
  //               // done
  //             }
  //           })
  //   res.render("index",{clickhandler : "createFileFromHex("+"'"+ coa +"'"+", 'rikki.png')"});
  // }

   // var coa = fs.readFileSync('./files/COA.png').toString("hex");
   // console.log(coa);
   // //Encrypt
   //  var encrypted = CryptoJS.AES.encrypt(coa, '12334');
   // // Decrypt
   //  var bytes  = CryptoJS.AES.decrypt(encrypted.toString(), '12334');
   //  console.log(bytes.toString(CryptoJS.enc.Utf8));
   //  if(coa===bytes.toString(CryptoJS.enc.Utf8)){
   //      console.log("hurray!!!");
   //      fs.appendFile('./files/COA.txt',coa, function (err) {
   //          if (err) {
   //              // append failed
   //          } else {
   //              // done
   //          }
   //      })
   //  }
   //  if(coa===bytes.toString())
   //  res.render("index",{clickhandler : "createFileFromHex("+"'"+coa+"'"+", 'rikki.png')"});


 });

app.listen(3000,function () {
 console.log("HINT started on port 3000");
});
