#!/bin/bash

#build gitbooks

target=${1%/}

case "$target" in
    es6)
        gitbook build ./es6/ /home/$USER/gitbooks/es6/
    ;;
    http)
        gitbook build ./http/ /home/$USER/gitbooks/http/
    ;;
    javascript)
	gitbook build ./javascript/ /home/$USER/gitbooks/javascript/
    ;;
    computer)
	gitbook build ./computer/ /home/$USER/gitbooks/computer/
    ;;
    reading)
	gitbook build ./reading/ /home/$USER/gitbooks/reading/
    ;;
    vue)
	gitbook build ./vue/ /home/$USER/gitbooks/vue/
    ;;
    all)
	gitbook build ./es6/ /home/$USER/gitbooks/es6/
	gitbook build ./http/ /home/$USER/gitbooks/http/
	gitbook build ./javascript/ /home/$USER/gitbooks/javascript/
	gitbook build ./computer/ /home/$USER/gitbooks/computer/
	gitbook build ./reading/ /home/$USER/gitbooks/reading/
	gitbook build ./vue/ /home/$USER/gitbooks/vue/
    ;;
esac
