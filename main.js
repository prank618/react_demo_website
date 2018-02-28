"use strict";
import express from 'express';
import neo4j from "neo4j-driver";
import bodyParser from 'body-parser';
import fs from 'fs';
const uuidV4 = require('uuid/v4');
const uuidV1 = require('uuid/v1');
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'hhedof77j',
  api_key: '923166853384518',
  api_secret: '6EILmDxdWbbYmAqyjlERO9_fyz4'
});
var app=express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/favicon.ico', express.static('/public/favicon.ico'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',(req,res) => {
	res.sendFile(__dirname+'/public/renderHtml.html')
})

app.get('/admin',(req,res)=>{
	res.sendFile(__dirname+'/public/admin.html')
})

app.get('/testneo4j',(req,res)=>{
	let driverX = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
		let sessionX = driverX.session();
		sessionX
			.run(`match (ee:Gallery) return ee as all`)
			.then( function(resultX){
				let ar=resultX.records[0]
				console.log(ar);
				res.setHeader("Content-Type", "application/json");
				res.write(JSON.stringify({ob:ar}));
				res.end();
				driverX.close();
				sessionX.close();
			}).catch((e)=>{
				console.log(e);
			})
})

app.post('/postMyGalleryImagePratibha',(req,res)=>{
  let uui=uuidV1();
	let xmas=req.body.val;
	var axr=[];
	for(let k of Object.keys(xmas)) {
		axr.push(xmas[k]);
	}
	var all= fs.createWriteStream(__dirname+`/public/uploads/${uui}.jpg`);
    var buffer = new Buffer(axr);
    console.log(buffer.byteLength)
    let sz=parseInt((buffer.byteLength)/1024);
    all.write(buffer);
	   all.end();
     let mxc=__dirname+`/public/uploads/${uui}.jpg`;
       cloudinary.uploader.upload(mxc, function(result) {
        let tempSaver=result.url;
        let ns=JSON.stringify({name:result.url,size:`${sz} kib`});
        let driverX = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
        let sessionX = driverX.session();
        sessionX
          .run(`create (ee:Gallery{image:"${tempSaver}"}) return collect(ee.image) as all`)
          .then( function(resultX){
            let ar=resultX.records[0].get("all")
            console.log(ar);
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ob:ar}));
            res.end();
            fs.unlinkSync(mxc);
            driverX.close();
            sessionX.close();
          }).catch((e)=>{
            console.log(e);
          })
       },{ public_id: uui });
})


app.post('/postMyClientImagePratibha',(req,res)=>{
  let uui=uuidV1();
	let xmas=req.body.val;
	var axr=[];
	for(let k of Object.keys(xmas)) {
		axr.push(xmas[k]);
	}
	var all= fs.createWriteStream(__dirname+`/public/uploads/${uui}.jpg`);
    var buffer = new Buffer(axr);
    console.log(buffer.byteLength)
    let sz=parseInt((buffer.byteLength)/1024);
    all.write(buffer);
	   all.end();
     let mxc=__dirname+`/public/uploads/${uui}.jpg`;
       cloudinary.uploader.upload(mxc, function(result) {
        let tempSaver=result.url;
        let ns=JSON.stringify({name:result.url,size:`${sz} kib`});
        let driverX = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
        let sessionX = driverX.session();
        sessionX
          .run(`create (ee:Client{image:"${tempSaver}"}) return collect(ee.image) as all`)
          .then( function(resultX){
            let ar=resultX.records[0].get("all")
            console.log(ar);
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ob:ar}));
            res.end();
            fs.unlinkSync(mxc);
            driverX.close();
            sessionX.close();
          }).catch((e)=>{
            console.log(e);
          })
       },{ public_id: uui });
})



app.get('/resetMyGalleryPratibha',(req,res)=>{
  let driverX = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  let sessionX = driverX.session();
  sessionX
    .run(`match (ee:Gallery) delete ee`)
    .then( function(resultX){
      let ar=resultX.records[0]
      console.log(ar);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ob:ar}));
      res.end();
      driverX.close();
      sessionX.close();
    }).catch((e)=>{
      console.log(e);
    })
})

app.get('/saveMyAllDataRegardingProfilePratibhaPlease',(req,res)=>{
  let data=JSON.parse(req.query.data);
  let NatureOfBusiness=data.NatureOfBusiness;
  let chairmain=data.chairmain;
  let keyCustomer=data.keyCustomer;
  let regAddress=data.regAddress;
  let industry=data.industry;
  let noOfEmployee=data.noOfEmployee;
  let yearOfStablished=data.yearOfStablished;
  let banker=data.banker;
  let pan=data.pan;
  let regAuthority=data.regAuthority;
  let regNo=data.regNo;
  let centralSalestaxNo=data.centralSalestaxNo;
  let vatNo=data.vatNo;
  let exciseRegNo=data.exciseRegNo;
  let gstNo=data.gstNo;

  let driverZ = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  let sessionZ = driverZ.session();
  sessionZ
    .run(`match (ee:ProfileData) delete ee`)
    .then( function(resultZ){
      


      let driverX = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
      let sessionX = driverX.session();
      sessionX
        .run(`merge (ee:ProfileData{NatureOfBusiness:"${NatureOfBusiness}",chairmain:"${chairmain}",keyCustomer:"${keyCustomer}",regAddress:"${regAddress}",industry:"${industry}",noOfEmployee:"${noOfEmployee}",yearOfStablished:"${yearOfStablished}",banker:"${banker}",pan:"${pan}",regAuthority:"${regAuthority}",regNo:"${regNo}",centralSalestaxNo:"${centralSalestaxNo}",vatNo:"${vatNo}",exciseRegNo:"${exciseRegNo}",gstNo:"${gstNo}"}) return ee`)
        .then( function(resultX){
          let ar=resultX.records[0]
          console.log(ar);
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify({ob:ar}));
          res.end();
          driverX.close();
          sessionX.close();
        }).catch((e)=>{
          console.log(e);
        })



      driverZ.close();
      sessionZ.close();
    }).catch((e)=>{
      console.log(e);
    })


  
})


app.get('/getMyProfileRelatedDataPratibhaPlease',(req,res)=>{
  let driverX = neo4j.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", neo4j.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  let sessionX = driverX.session();
  sessionX
    .run(`match (ee:ProfileData) return collect([ee.NatureOfBusiness,ee.chairmain,ee.keyCustomer,ee.regAddress,ee.industry,ee.noOfEmployee,ee.yearOfStablished,ee.banker,ee.pan,ee.regAuthority,ee.regNo,ee.centralSalestaxNo,ee.vatNo,ee.exciseRegNo,ee.gstNo]) as all`)
    .then( function(resultX){
      let ar=resultX.records[0].get('all')
      console.log(ar);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ob:ar}));
      res.end();
      driverX.close();
      sessionX.close();
    }).catch((e)=>{
      console.log(e);
    })
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
