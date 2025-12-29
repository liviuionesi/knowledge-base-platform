#!/bin/bash

# Add all open issues to Project 7
PROJECT_NUMBER=7
OWNER="pehlivanu"

echo "Fetching open issues..."
ISSUES=$(gh issue list --state open --json url --jq '.[].url')

if [ -z "$ISSUES" ]; then
    echo "No open issues found."
    exit 0
fi

echo "Adding issues to Project $PROJECT_NUMBER..."

for URL in $ISSUES; do
    echo "Adding $URL..."
    gh project item-add $PROJECT_NUMBER --owner $OWNER --url "$URL"
done

echo "Done!"
