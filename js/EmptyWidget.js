define(
	[],  //depends on: for example: "basicWidget"
	function(){
		EmptyWidget = Widget.extend({
            template : "",
			directives : function(data) {
				return {};
			}
		});
	}
);
