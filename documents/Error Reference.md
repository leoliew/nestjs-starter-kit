# Response Reference

## HTTP Status Codes

| Status Code | Meaning |
|-------------| ------- |
| 400         | Bad Request -- Your request is invalid. Double-check your JSON-RPC body. |
| 401         | Unauthorized -- You must authenticate your request with an API key. |
| 403         | Forbidden -- You've hit your **capacity limit**, or your request was rejected by your app's **whitelist settings.** |
| 429         | Too Many Requests -- You've exceeded your concurrent requests capacity or [Compute Units](https://docs.alchemy.com/reference/compute-units) per second capacity. Check out the [Throughput](https://docs.alchemy.com/reference/throughput) page for solutions. |
| 500         | Internal Server Error -- We're unable to process your request right now. Get in touch with us if you see this. |


### 

Example Response

    // Example 429 Error
    {
        "jsonrpc": "2.0",
        "error": {
            "code": 429,
            "message": "Your app has exceeded its compute units per second capacity. If you have retries enabled, you can safely ignore this message. If not, check out https://docs.alchemyapi.com/guides/rate-limits"
        },
        "id": 1
    }
    

For JSON-RPC specific errors, Alchemy returns a `200` with the JSON-RPC error in the JSON response.

### 

JSON-RPC Error Codes

Code

Possible Return Message

Description

429

Your app has exceeded its compute unit per second capacity.

Check out the [Throughput](https://docs.alchemy.com/reference/throughput) page for solutions.

\-32000

Server error

Reserved for implementation-defined server-errors. See hint below.

\-32001 to -32099

Parity errors

These errors are parity specific and thus relevant for when using the Kovan network, see the parity sectionbelow.

\-32600

Invalid Request

The JSON sent is not a valid Request object.

\-32601

Method not found

The method does not exist / is not available.

\-32602

Invalid parameter

Invalid method parameter(s).

\-32603

Internal error

Internal JSON-RPC error.

\-32700

Parse error

Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.

> ### 📘
> 
> **NOTE:**
> 
> \-32000 is used for many server errors. Here are a few common examples:
> 
> `"already known"`
> 
> *   This generally means the transaction already posted and is on the node in a pending state. Sometimes this error occurs when transactions fail at first but are retried when the node already knows of them
> 
> `"Unspecified origin not on whitelist"`
> 
> *   This error means whoever is making the request is not on the whitelist for using your API key.
> 
> `"filter not found"`
> 
> *   Filters expire after 5 minutes of inactivity so if it's not found the filter likely expired.
> 
> `"Request timed out. Client should retry."`
> 
> *   Gateway timeouts (usually from nodes). Clients should retry the request.
> 
> "`transaction underpriced`"
> 
> *   Transaction was sent with too low gas. Re-send the transaction with higher gas!

### 

Example Response

    {
        "jsonrpc":"2.0",
        "error":{
            "code":-32602,
            "message": "Invalid params: invalid length 63, expected a 0x-prefixed, padded, hex-encoded hash with length 64."
        },
        "id":1
    }
    

### 

Error Messages

*   `out of gas`: not enough gas for the transaction or call, contact us at support

### 

Kovan Error Codes

These errors should occur when using the Kovan network.

Code

Message

\-32000

UNSUPPORTED\_REQUEST

\-32001

NO\_WORK

\-32002

NO\_AUTHOR

\-32003

NO\_NEW\_WORK

\-32004

NO\_WORK\_REQUIRED

\-32009

UNKNOWN\_ERROR

\-32010

TRANSACTION\_ERROR

\-32015

EXECUTION\_ERROR

\-32016

EXCEPTION\_ERROR

\-32017

DATABASE\_ERROR

\-32020

ACCOUNT\_LOCKED

\-32021

PASSWORD\_INVALID

\-32023

ACCOUNT\_ERROR

\-32040

REQUEST\_REJECTED

\-32041

REQUEST\_REJECTED\_LIMIT

\-32042

REQUEST\_NOT\_FOUND

\-32055

ENCRYPTION\_ERROR

\-32058

ENCODING\_ERROR

\-32060

FETCH\_ERROR

\-32065

NO\_LIGHT\_PEERS

\-32070

DEPRECATED

### 

Custom Error Codes

Code

Possible Return Message

Description

1

Unauthorized

Should be used when some action is not authorized, e.g. sending from a locked account.

2

Action not allowed

Should be used when some action is not allowed, e.g. preventing an action, while another depending action is processing on, like sending again when a confirmation popup is shown to the user.

3

Execution error

Will contain a subset of custom errors in the data field. See below.

### 

Custom Error Fields

Custom error `3` can contain custom error(s) to further explain what went wrong.-
They will be contained in the `data` field of the RPC error message as follows:

> ### 📘
> 
> **NOTE:**
> 
> Custom Error Fields are defined at the contract level. Therefore, the types within the error field might vary by contract. Read more about this [here](https://blog.soliditylang.org/2021/04/21/custom-errors/).

    {
        code: 3,
        message: 'Execution error',
        data: [{
            code: 102,
            message: 'Innsufficient gas'
        },
        {
            code: 103,
            message: 'Gas limit exceeded'
        }]
    }
    

Code

Possible Return Message

Description

100

X doesn't exist

Should be used when something which should be there is not found. (Doesn’t apply to `eth_getTransactionBy_` and `eth_getBlock_`. They return a success with value `null)`

101

Requires ether

Should be used for actions which require something else (gas or value)

102

Gas too low

Should be used when the value of gas given is too low

103

Gas limit exceeded

Should be used when a limit is exceeded (for the gas limit in a block)

104

Rejected

Should be used when an action was rejected, e.g. because of its content (too long contract code, contains wrong characters, etc.)

105

Ether too low

Should be used when the value of Ether given is too low

[跳转到 Cubox 查看](https://cubox.pro/my/card?id=ff808081895ed28101896292cad87c61)