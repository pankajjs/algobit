# WebSocket Service - Algobit

The WebSocket Service is a part of the Algobit project, responsible for providing real-time communication capabilities using WebSockets, enabling live updates and notifications.

## Table of Contents
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Running the Service](#running-the-service)


## Prerequisites
Before running the service, ensure you have the following software installed and running locally:

    1. Redis: Utilized for caching and message brokering.

## Installation

To install the dependencies for the WebSocket Service, navigate to the service directory and run:

```bash
cd apps/ws && npm install
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
cd apps/ws && npm run dev
```
