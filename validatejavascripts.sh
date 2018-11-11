#!/bin/bash
for f in $(find -name "*.js")
do 
	if [[ "$f" == *"node_modules"* ]]; then   #eg if [[ $str == *"in"* ]]
		continue
	fi
	echo $f
	acorn --silent $f
	
	./node_modules/.bin/eslint $f.js
	
done 
