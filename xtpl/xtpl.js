var fs = require('fs');
var xtpl = require('xtpl');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	//var str = fs.readFileSync(__dirname + '/tpl_escaped.html', 'utf8');
	var tpl = __dirname + '/tpl_escaped.html';
	tplData = data;
	xtpl.render(tpl,data,{cache:true,catchError:false}, function(error,content){
          compiled = function(data){
              xtpl.render(__dirname + '/tpl_escaped.html',data, {cache:true,catchError:false},function(error,content){});
          }
          done();
    });
};

module.exports.prepareUnescaped = function (data, done) {
	//var str = fs.readFileSync(__dirname + '/tpl_unescaped.html', 'utf8');

	tplData = data;
    xtpl.render(__dirname + '/tpl_escaped.html',data,{cache:true,catchError:false}, function(error,content){
          compiled = function(data){
              xtpl.render(__dirname + '/tpl_unescaped.html',data,{cache:true,catchError:false}, function(error,content){});
          }
          done();
    });
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};