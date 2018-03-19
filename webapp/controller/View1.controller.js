sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"stock_take_fiori/mock/mock",
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/FilterOperator"
], function(Controller, mock, Filter, JSONModel, FilterOperator) {
	"use strict";

	return Controller.extend("stock_take_fiori.controller.View1", {
		onInit: function() {

			this.ageModel = new JSONModel();
			this.ageData = [{
				index: 0,
				age: "All"
			}];
			this.getView().byId("age_id").setModel(this.ageModel, "ageModel");
			this.tableModel = new JSONModel();

			this.getView().byId("items_table").setModel(this.tableModel, "tableModel");
			this.getTableModel();
		},
		getTableModel: function() {
			var tableData = mock.getTable();
			this.setModel(this.tableModel, tableData);
			var that = this;
			tableData.map(function(item) {
				that.setAge(item.age);
			});
			this.setModel(this.ageModel,this.ageData);
		},
		setModel: function(model, data) {
			model.setData(data);
		},
		liveSearch: function(e) {
			var sQuery = e.getSource().getValue();
			var binding = this.getView().byId("items_table").getBinding("items");
			if (sQuery && sQuery.length > 0) {
				var filer_name = new Filter("name", FilterOperator.Contains, sQuery),
					filter_age = new Filter("age", FilterOperator.Contains, sQuery),
					filter_mail = new Filter('mail', FilterOperator.Contains, sQuery),
					filter_sex = new Filter("sex", FilterOperator.Contains, sQuery),
					filter_tel = new Filter("tel", FilterOperator.Contains, sQuery);
				var filterList = new Filter([filer_name, filter_age, filter_mail, filter_sex, filter_tel]);
				binding.filter(filterList);
			} else {
				binding.filter([]);
			}
		},
		setAge: function(age) {
			for (var i = 0; i < this.ageData.length; i++) {
				if (this.ageData[i].age === age) {
					return;
				}

			}
			this.ageData.push({
				index: this.ageData.length,
				age:age
			});
		},
		onSelectChange:function(e){
		   var selectedkey = 	e.getSource().getSelectedKey(),
		   age = this.getView().byId("age_id").getModel("ageModel").getData()[selectedkey].age,
		   filter = new Filter("age",FilterOperator.EQ,age),
		   binding = this.getView().byId("items_table").getBinding("items");
		   
		   if(selectedkey === this.currentKey){
		   	binding.filter([]);
		   	this.currentKey = 0;
		   }else {
		   	binding.filter(filter);
		   	this.currentKey = selectedkey;
		
		   }
		}

	});
});