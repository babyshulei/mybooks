#!/bin/bash

#build gitbooks

target=${1%/}

case "$target" in
    all)
	gitbook build ./computer/ /home/$USER/webroot/gitbooks/computer/
	gitbook build ./front-end/ /home/$USER/webroot/gitbooks/front-end/
    gitbook build ./http/ /home/$USER/webroot/gitbooks/http/
	gitbook build ./javascript/ /home/$USER/webroot/gitbooks/javascript/
	gitbook build ./language/ /home/$USER/webroot/gitbooks/language/
	gitbook build ./programming/ /home/$USER/webroot/gitbooks/programming/
	gitbook build ./reading/ /home/$USER/webroot/gitbooks/reading/
	gitbook build ./vue/ /home/$USER/webroot/gitbooks/vue/
    ;;
    *)
    gitbook build ./$target/ /home/$USER/webroot/gitbooks/$target/
    ;;
esac
