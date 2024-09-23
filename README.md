# Algobit

## Table of Contents
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Services](#running-the-services)

## Demo
https://github.com/user-attachments/assets/43a567a9-cbde-44c7-8931-40cd896e83c3

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
```
yarn install
```

### Environment Variables
Each microservice has its own .env file where environment-specific configurations, such as database connections and API keys, can be set.

#### Setup Instruction
Navigate to each microservice and shared package:
    
##### 1. copy the `.env.sample` file to `.env`

```
cp .env.sample .env
```
##### 2. Open the .env file and replace the placeholder values with actual configuration settings as per your environment.
##### 3. Save the .env file. The service will now use these settings when running.

## Generate Prisma client
```
yarn db:generate
```

## Seed data(optional)
```
yarn db:seed
```

## Running the Services
```
yarn dev
```
