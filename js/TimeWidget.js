define(
	[],  //depends on
	function(){
		TimeWidget = Widget.extend({
            template : "time",
			directives : function(data) {
				return {
					mytime : {
						text : function () { return this.d; } //this is corresponding to "data"
					}
				}
			}
		});
	}
);
