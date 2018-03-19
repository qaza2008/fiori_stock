sap.ui.define([], function() {
	"use strict";
	var data = function() {
		return [{
			id: "1",name:"zhangsan",age:"21",mail:"www@126.com",sex:"male"
		}, {
			id: "2",name:"lisi",age:"22",mail:"stock@google.com" ,sex:"femal"
		}];
	};
	return {getTable:data};
});