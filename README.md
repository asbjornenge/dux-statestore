# Dux StateStore

>Part of the ref. implementation of the [Dux](https://github.com/asbjornenge/dux) architecture.

A StateStore for [Dux](https://github.com/asbjornenge/dux).  

This StateStore uses a [Firebase](https://www.firebase.com/) to store it's state. So if you are just [getting started](https://github.com/asbjornenge/dux-quickstart) with Dux, create a free firebase for your deployment. You will need the **url** and the **secret** of your firebase. Mare sure to secure your firebase (see below).

## RUN

    docker run -d asbjornenge/dux-statestore
        --firebase-url my-dux-test.firebaseio.com   // Firebase url                 (required || FIREBASE_URL env)
        --firebase-secret <secret>                  // Firebase secret              (required || FIREBASE_SECRET env)
        --dispatcher-host dux-dispatcher.dux.wtf    // Dispatcher hostname          (required || DISPATCHER_HOST env)
        --dispatcher-port 8000                      // Dispatcher port              (required || DISPATCHER_PORT env)
        --firebase-path                             // Root state location          (default /)
        --retry-timeout                             // Connection timeout           (default 500) 
        --retry-interval                            // Connection retry interval    (default 5000)
        --color                                     // Color output

## Secure your firebase

At least at first, make sure your firebase security settings look like this:

    {
        "rules": {
            ".read": false,
            ".write": false
        }
    }

Since our StateStore is using the firebase secret, it will still be able to read & write to the firebase. More information about firebase securty [here](https://www.firebase.com/docs/web/guide/understanding-security.html).

enjoy
