var express     =   require('express');
var app         =   express();
var fs = require('fs');
var CryptoJS = require("crypto-js");
var multer  = require('multer')
var upload = multer({ dest: 'tmp/' })

function encrypt(file, org){

  var toBeEnc = fs.readFileSync('./tmp/'+file).toString("hex");

  var encrypted = CryptoJS.AES.encrypt(toBeEnc, '12334');

  fs.appendFile('./safe/'+org+'.Krypt', encrypted, function (err) {
    if (err) {
                // append failed
              } else {
                // done
              }
            });
}

function decrypt(file) {
 var file2b = fs.readFileSync(file);
 var bytes  = CryptoJS.AES.decrypt(file2b.toString(), '12334');
 console.log(bytes.toString(CryptoJS.enc.Utf8));
}


app.post("/encrypt", upload.single('enc'), function (req, res, next) {  
  var org = req.file.originalname;
  var file = req.file.filename;
  setTimeout(function () {
    console.log("wow");
    decrypt(file, org);
  }, 5000);
  res.redirect('/')
});

app.post("/decrypt", upload.single('dec'), function (req, res, next) {  
  var org = req.file.originalname;
  var file = req.file.filename;
  
  res.redirect('/')
});




app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.get('/token',function(req,res){
  res.render('upload.ejs');
})

app.get('/',function (req, res) {

  res.render("main")
    // console.log(coa);
    // //Encrypt
    
    
  //  // Decrypt


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
