#!/bin/bash
# publish the npm package, read the version form package.json and create a new tag in origin
# the script also try to validate the new package version must greate than the latest published version
set -e

. ./scripts/semver.sh

PACKAGE_VERSION=$(node -p "require('./package.json').version")
LATEST_VERSION=$(git describe --match [0-9]* --tags --abbrev=) || true
LATEST_VERSION=${LATEST_VERSION:=0.0.1}

$(semverGT ${PACKAGE_VERSION} ${LATEST_VERSION})
RESULT=$?

if [[ ${RESULT} > 0 ]]; then
  echo -e "PACKAGE_VERSION: ${PACKAGE_VERSION}, LATEST_VERSION: ${LATEST_VERSION}"
  echo -e "Invalid package.json version, package version must greater than the latest version"
  exit 1
fi

git tag ${PACKAGE_VERSION}
git push origin ${PACKAGE_VERSION}
echo "set new version tag ${PACKAGE_VERSION}"