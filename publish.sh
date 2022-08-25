#!/bin/bash
rsync -rvzP ./dist/ lukas@lw1.at:/var/www/rainbowroad/ --fuzzy --delete-after -v
