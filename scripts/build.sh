#!/bin/bash
set -e

echo 'Running Build Steps'
npm install
npm run lint
npm run test:coverage
