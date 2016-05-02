define(
	[],  //depends on
	function(){
		HelloWidget = Widget.extend({
            template : "message",
			request  : "msg",// (if ommited, will use template value): what to request to server (GET param)
			render   : function(data, callback) {
					callback({
						models: data,
						directives: {
							mymsg : {
								text: function() {
									return this.m;
								}
							}
						}
					});
			}
		});
	}
);
