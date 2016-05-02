define(
	[],  //depends on
	function(){
		TimeWidget = Widget.extend({
            template : "time",
			render   : function(data, callback) {
				callback({
					models: data,
					directives: {
						mytime : {
							text : function () { return this.d; }
						}
					}
				});
			}
		});
	}
);
