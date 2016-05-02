define(
	[],  //depends on: for example: "basicWidget"
	function(){
		EmptyWidget = Widget.extend({
            template : "",
			render   : function(data, callback) {
				callback({
					models: data,
					directives: {
					}
				});
			}
		});
	}
);
