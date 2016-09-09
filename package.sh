#!/bin/sh
rm -rf bin/
mkdir -p bin/
zip -r bin/chrome-steam-context-menu *.* -x .git \*.md \*.sh
