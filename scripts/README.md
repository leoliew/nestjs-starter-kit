
# nodejs script 

## Requirements

- copy `.envrc.template` to `.envrc`
- edit `.envrc` to set your config

## mongodb enterprise csfle

### create a kms provider by google

- copy you google cloud service account key file to `script/csfle/private-key.json`
- run `node script/csfle/make-kms-provider.js`

> ⚠️ warning: make kms provider, and will delete all this database's data
