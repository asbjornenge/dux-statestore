# Dux StateStore

>Part of the ref. implementation of the [Dux](https://github.com/asbjornenge/dux) architecture.

A StateStore for [Dux](https://github.com/asbjornenge/dux).  

This StateStore uses a [Firebase](https://www.firebase.com/) to store it's state. So if you are just getting started with dux, head over there and create a free firebase for your deployment. Mare sure to read the [security](#security) section below.

## RUN

    docker run -d asbjornenge/dux-statestore --firebase <url> --firebase-secret <secret>

## Bootstrapping

The StateStore can bootstrap a basic Dux configuration.

## Security

Coming...
