# Algobit

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Services](#running-the-services)
- [Demo](#demo)

## Project Structure

The repository is organized as follows:
```
algobit/
│
├── admin/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── executor/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── submission/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── ws/
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── shared/   (optional - for shared resources)
```

Each microservice is located in its own directory under the apps folder and includes its source code, dependencies (package.json), and a README file with specific details about the service.


## Getting Started

To get started with Algobit, fork the repository and clone it to your local machine:

```bash
git clone https://github.com/yourusername/algobit.git
cd algobit
```

## Prerequisites
Before running the microservices, ensure you have the following software installed and running locally:

    1. MongoDB: Used as the primary database for storing data.
    2. Redis: Utilized for caching and message brokering.
    3. Docker: Recommended for containerizing and running the microservices and other dependencies consistently across different environments.

## Installation
Each microservice requires its dependencies to be installed. Navigate to each microservice's directory and install the dependencies using npm:

```
cd apps/admin && npm install
```

### Environment Variables
Each microservice has its own .env file where environment-specific configurations, such as database connections and API keys, can be set.

#### Setup Instruction
Navigate to each microservice:
    
##### 1. copy the `.env.sample` file to `.env`

```
cp .env.sample .env
```
##### 2. Open the .env file and replace the placeholder values with actual configuration settings as per your environment.
##### 3. Save the .env file. The service will now use these settings when running.

## Running the Services
To run a microservice, navigate to its directory and start the service:
```
cd apps/admin && npm run dev
```
# Demo
For detailed instructions on testing the WebSocket connection and submission flow, refer to the [demo.md](demo.md) file.
