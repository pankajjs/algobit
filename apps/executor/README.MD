# Executor Service - Algobit

The Executor Service is a part of the Algobit project, responsible for executing code submissions in a secure and isolated environment, returning results and logs.


## Table of Contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Running the Service](#running-the-service)


## Prerequisites
Before running the service, ensure you have the following software installed and running locally:

    1. Redis: Utilized for caching and message brokering.
    2. MongoDB: Used as the primary database for storing data.

## Installation

To install the dependencies for the Executor Service, navigate to the service directory and run:

```bash
cd apps/executor && npm install
```
## Environment Variables

### Setup Instructions
##### 1. copy the `.env.sample` file to `.env`

```
cp .env.sample .env
```
##### 2. Open the .env file and replace the placeholder values with actual configuration settings as per your environment.
##### 3. Save the .env file. The service will now use these settings when running.

## Running the service
```
cd apps/executor && npm run dev
```
