#!/bin/bash

# Check if build output at dist is uptodate or not

# Check files updated in working dir
git status dist -s

# Raise error if more than 1 files changed in working dir
if [[ ! -z $(git status dist -s) ]]; then
    echo "Build at dist is outdated. Update build, push and try again."
    exit 1
fi
