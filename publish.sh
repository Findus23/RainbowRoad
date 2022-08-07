#!/bin/bash
rsync -rvzP ./dist/ lukas@lw1.at:/var/www/static/tmp/rainbowroad/ --fuzzy --delete-after -v
