# Response Reference

## HTTP Status Codes

| Status Code | Meaning |
|-------------| ------- |
| 400         | Bad Request -- Your request is invalid. Double-check your JSON-RPC body. |
| 401         | Unauthorized -- You must authenticate your request with an API key. |
| 403         | Forbidden -- You've hit your capacity limit, or your request was rejected by your app's **whitelist settings.** |
| 429         | Too Many Requests -- You've exceeded your concurrent requests capacity or per second capacity. Check out the page for solutions. |
| 500         | Internal Server Error -- We're unable to process your request right now. Get in touch with us if you see this. |


## Custom Error Codes

| Code | Possible Return Message      | Description                                                 |
| ---- | ---------------------------- | ----------------------------------------------------------- |
| 0    | SUCCESS                      | Indicates that the server successfully processed the request. |
| -1   | ERROR                        | Indicates an error occurred during the processing.           |
| -2   | NOT_FOUND                    | Indicates that the requested resource was not found.         |
| -3   | UNAUTHORIZED                 | Should be used when some action is not authorized.           |
| -4   | FORBIDDEN                    | Indicates that the requested action is forbidden.            |
| -5   | BAD_REQUEST                  | Indicates that the request was malformed or invalid.         |
| -6   | SERVICE_UNAVAILABLE          | Indicates that the service is currently unavailable.         |

## Example 

```json
{
  "code": 0,
  "message": "find Data success!",
  "data": [{
    "name": "tom",
    "age": 18
  }]
}
```


