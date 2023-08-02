
# nodejs script 

## mongodb enterprise csfle

### create a kms provider by google

- copy you google cloud service account key file to `script/csfle/private-key.json`
- edit `script/csfle/make-kms-provider.js` to set your config
  - mongodb connection string
  - mongodb database name
  - kms provider name
- run `node script/csfle/make-kms-provider.js`

> ⚠️ warning: make kms provider, and will delete all this database's data
