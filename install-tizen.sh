#!/bin/bash

appName=TestMobX
package=2ApfHGQTLk
projectDir=$(mktemp -d)

echo Creating tizen project in "$projectDir"...
cp -r {dist,samsung}/* $projectDir

pushd $projectDir || return
echo Packaging app...
tizen package -t wgt

echo Uninstall package...
tizen uninstall -p "${package}.${appName}" || :

echo Installing package...
tizen install -n "${appName}.wgt"
popd || return
