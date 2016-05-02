define(
	[],  //depends on
	function(){
		HelloWidget = Widget.extend({
            template : "message",
			request  : "msg",// (if ommited, will use template value): what to request to server (GET param)
			directives : function(data) {
				return	{
					mymsg : {
						text: function() {
							return this.m; // this.m is data.m
						}
					}
				};
			}
		});
	}
);
