#!/bin/bash

repo=$1
source_tag_sha=$2
major_version=$3
token=$4

curl -s \
    -X PATCH -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${token}" \
    https://api.github.com/repos/${repo}/git/refs/tags/${major_version} \
    -d '{"sha": "'$source_tag_sha'", "force":true}'
