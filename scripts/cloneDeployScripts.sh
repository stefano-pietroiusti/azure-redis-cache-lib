#!/bin/bash
set -e
env=$1

echo "clone deployment scripts"
git clone git@bitbucket.org:accordogroup/deployment.scripts.git deployment

cd deployment
npm install --production
