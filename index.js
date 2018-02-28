"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _neo4jDriver = require("neo4j-driver");

var _neo4jDriver2 = _interopRequireDefault(_neo4jDriver);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidV4 = require('uuid/v4');
var uuidV1 = require('uuid/v1');
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'hhedof77j',
  api_key: '923166853384518',
  api_secret: '6EILmDxdWbbYmAqyjlERO9_fyz4'
});
var app = (0, _express2.default)();
app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static(__dirname + '/public'));
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use('/favicon.ico', _express2.default.static('/public/favicon.ico'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/renderHtml.html');
});

app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/public/admin.html');
});

app.get('/testneo4j', function (req, res) {
  var driverX = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  var sessionX = driverX.session();
  sessionX.run("match (ee:Gallery) return ee as all").then(function (resultX) {
    var ar = resultX.records[0];
    console.log(ar);
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ ob: ar }));
    res.end();
    driverX.close();
    sessionX.close();
  }).catch(function (e) {
    console.log(e);
  });
});

app.post('/postMyGalleryImagePratibha', function (req, res) {
  var uui = uuidV1();
  var xmas = req.body.val;
  var axr = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(xmas)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      axr.push(xmas[k]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var all = _fs2.default.createWriteStream(__dirname + ("/public/uploads/" + uui + ".jpg"));
  var buffer = new Buffer(axr);
  console.log(buffer.byteLength);
  var sz = parseInt(buffer.byteLength / 1024);
  all.write(buffer);
  all.end();
  var mxc = __dirname + ("/public/uploads/" + uui + ".jpg");
  cloudinary.uploader.upload(mxc, function (result) {
    var tempSaver = result.url;
    var ns = JSON.stringify({ name: result.url, size: sz + " kib" });
    var driverX = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
    var sessionX = driverX.session();
    sessionX.run("create (ee:Gallery{image:\"" + tempSaver + "\"}) return collect(ee.image) as all").then(function (resultX) {
      var ar = resultX.records[0].get("all");
      console.log(ar);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ ob: ar }));
      res.end();
      _fs2.default.unlinkSync(mxc);
      driverX.close();
      sessionX.close();
    }).catch(function (e) {
      console.log(e);
    });
  }, { public_id: uui });
});

app.post('/postMyClientImagePratibha', function (req, res) {
  var uui = uuidV1();
  var xmas = req.body.val;
  var axr = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(xmas)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var k = _step2.value;

      axr.push(xmas[k]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var all = _fs2.default.createWriteStream(__dirname + ("/public/uploads/" + uui + ".jpg"));
  var buffer = new Buffer(axr);
  console.log(buffer.byteLength);
  var sz = parseInt(buffer.byteLength / 1024);
  all.write(buffer);
  all.end();
  var mxc = __dirname + ("/public/uploads/" + uui + ".jpg");
  cloudinary.uploader.upload(mxc, function (result) {
    var tempSaver = result.url;
    var ns = JSON.stringify({ name: result.url, size: sz + " kib" });
    var driverX = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
    var sessionX = driverX.session();
    sessionX.run("create (ee:Client{image:\"" + tempSaver + "\"}) return collect(ee.image) as all").then(function (resultX) {
      var ar = resultX.records[0].get("all");
      console.log(ar);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ ob: ar }));
      res.end();
      _fs2.default.unlinkSync(mxc);
      driverX.close();
      sessionX.close();
    }).catch(function (e) {
      console.log(e);
    });
  }, { public_id: uui });
});

app.get('/resetMyGalleryPratibha', function (req, res) {
  var driverX = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  var sessionX = driverX.session();
  sessionX.run("match (ee:Gallery) delete ee").then(function (resultX) {
    var ar = resultX.records[0];
    console.log(ar);
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ ob: ar }));
    res.end();
    driverX.close();
    sessionX.close();
  }).catch(function (e) {
    console.log(e);
  });
});

app.get('/saveMyAllDataRegardingProfilePratibhaPlease', function (req, res) {
  var data = JSON.parse(req.query.data);
  var NatureOfBusiness = data.NatureOfBusiness;
  var chairmain = data.chairmain;
  var keyCustomer = data.keyCustomer;
  var regAddress = data.regAddress;
  var industry = data.industry;
  var noOfEmployee = data.noOfEmployee;
  var yearOfStablished = data.yearOfStablished;
  var banker = data.banker;
  var pan = data.pan;
  var regAuthority = data.regAuthority;
  var regNo = data.regNo;
  var centralSalestaxNo = data.centralSalestaxNo;
  var vatNo = data.vatNo;
  var exciseRegNo = data.exciseRegNo;
  var gstNo = data.gstNo;

  var driverZ = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  var sessionZ = driverZ.session();
  sessionZ.run("match (ee:ProfileData) delete ee").then(function (resultZ) {

    var driverX = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
    var sessionX = driverX.session();
    sessionX.run("merge (ee:ProfileData{NatureOfBusiness:\"" + NatureOfBusiness + "\",chairmain:\"" + chairmain + "\",keyCustomer:\"" + keyCustomer + "\",regAddress:\"" + regAddress + "\",industry:\"" + industry + "\",noOfEmployee:\"" + noOfEmployee + "\",yearOfStablished:\"" + yearOfStablished + "\",banker:\"" + banker + "\",pan:\"" + pan + "\",regAuthority:\"" + regAuthority + "\",regNo:\"" + regNo + "\",centralSalestaxNo:\"" + centralSalestaxNo + "\",vatNo:\"" + vatNo + "\",exciseRegNo:\"" + exciseRegNo + "\",gstNo:\"" + gstNo + "\"}) return ee").then(function (resultX) {
      var ar = resultX.records[0];
      console.log(ar);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ ob: ar }));
      res.end();
      driverX.close();
      sessionX.close();
    }).catch(function (e) {
      console.log(e);
    });

    driverZ.close();
    sessionZ.close();
  }).catch(function (e) {
    console.log(e);
  });
});

app.get('/getMyProfileRelatedDataPratibhaPlease', function (req, res) {
  var driverX = _neo4jDriver2.default.driver("bolt://hobby-pnemeeonlgkmgbkegkangkal.dbs.graphenedb.com:24786", _neo4jDriver2.default.auth.basic("rita", "b.teVsCnBVx6VR.QUkLXbeYsY99Rz9N"));
  var sessionX = driverX.session();
  sessionX.run("match (ee:ProfileData) return collect([ee.NatureOfBusiness,ee.chairmain,ee.keyCustomer,ee.regAddress,ee.industry,ee.noOfEmployee,ee.yearOfStablished,ee.banker,ee.pan,ee.regAuthority,ee.regNo,ee.centralSalestaxNo,ee.vatNo,ee.exciseRegNo,ee.gstNo]) as all").then(function (resultX) {
    var ar = resultX.records[0].get('all');
    console.log(ar);
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ ob: ar }));
    res.end();
    driverX.close();
    sessionX.close();
  }).catch(function (e) {
    console.log(e);
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
