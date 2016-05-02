#!/bin/bash
js_dir="../js"
src_dir="../src"

DEBUG=$1;

echo "Compressing UI.js..."
java -jar $src_dir/yuicompressor-2.4.8.jar -o $js_dir/UI.min.js $src_dir/UI.src.js
echo "Compressing Widget.js..."
java -jar $src_dir/yuicompressor-2.4.8.jar -o $js_dir/Widget.min.js $src_dir/Widget.src.js

widget_bundle=$js_dir/widgets.ui.js
echo "Creating bundle ($widget_bundle)"
cat $src_dir/header.js > $widget_bundle
echo "" >> $widget_bundle
if [[ $DEBUG != "" ]]; then
	cat $src_dir/UI.src.js >> $widget_bundle 
else
	cat $js_dir/UI.min.js >> $widget_bundle 
fi
echo "" >> $widget_bundle
if [[ $DEBUG != "" ]]; then
	cat $src_dir/Widget.src.js >> $widget_bundle 
else
	cat $js_dir/Widget.min.js >> $widget_bundle
fi
rm $js_dir/UI.min.js
rm $js_dir/Widget.min.js

depend_bundle=$js_dir/widgets.ui.depend.js
if [[ ! -f $depend_bundle ]]; then
echo "Creating dependencies bundle ($depend_bundle)..."
	cat $js_dir/transparency.min.js > $depend_bundle
	cat $js_dir/chic.min.js >> $depend_bundle
	cat $js_dir/require.js >> $depend_bundle
fi

echo "Creating ZIP bundle"
zip ../widgets.ui.bundle.zip $depend_bundle $widget_bundle $js_dir/widgets.ui.config.js

echo "Done."
