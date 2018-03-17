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
    if (err) { } 
    else { }
  });
}

function decrypt(file) {
 var file2b = fs.readFileSync('./tmp/'+ file);
 var bytes  = CryptoJS.AES.decrypt(file2b.toString(), '12334');
 return bytes.toString(CryptoJS.enc.Utf8)
}

app.post("/encrypt", upload.single('enc'), function (req, res, next) {  
  var org = req.file.originalname;
  var file = req.file.filename;
  setTimeout(function () {
    console.log("wow");
    encrypt(file, org);
  }, 3000);
  res.redirect('/')
});

var data;
var org;

app.post("/decrypt", upload.single('dec'), function (req, res, next) {  
  var file = req.file.filename;
  org = req.file.originalname;
  setTimeout(function () {
    console.log("decrypted");
    data = decrypt(file)
    res.redirect('/download')  
  }, 3000);
});

app.use("/download",function(req,res){
  res.render('dl', {clickhandler : "createFileFromHex("+"'"+data+"'"+","+"'"+ org.slice(0,-6)+"')"})
})

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.get('/token',function(req,res){
  res.render('upload.ejs');
})

app.get('/',function (req, res) {
  res.render("main")
 });

app.get('/store',function (req, res) {
  res.render("store")
});

app.get('/access',function (req, res) {
  res.render("access")
});

app.get('/up',function (req, res) {
  res.render("upload")
});

app.get('/transfer',function (req, res) {
  res.render("transfer")
});

app.listen(3000,function () {
 console.log("HINT started on port 3000");
});