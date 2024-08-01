# Admin Service - Algobit

The Admin Service is a part of the Algobit project, responsible for managing problem related functionalities.



## Table of Contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Running the Service](#running-the-service)


## Prerequisites
Before running the service, ensure you have the following software installed and running locally:

    1. MongoDB: Used as the primary database for storing data.

## Installation

To install the dependencies for the Admin Service, navigate to the service directory and run:

```bash
cd apps/admin && npm install
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
cd apps/admin && npm run dev
```