#!/bin/bash
for f in $(find -name "*.js")
do 
	echo $f
	acorn --silent $f
done 
