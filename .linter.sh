#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-25438-e36bf896/piggyhabit
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

