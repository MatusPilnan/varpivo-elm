#!/bin/bash
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i /local/openapi.json -g elm -o /local/api