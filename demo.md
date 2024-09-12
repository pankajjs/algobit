# Demo: Testing WebSocket and Submission Flow

This document outlines how to test the WebSocket connection and the submission flow using the provided demo setup.

## Overview

The demo involves:
1. Loading the `demo.html` file to establish a WebSocket connection with the WebSocket Service.
2. Displaying the user ID in the browser.
3. Seeding the database with problems data.
4. Making a GET request to retrieve the `problemId`.
5. Making a POST request to the Submission Service using the displayed user ID and retrieved `problemId` with other parameter.

## Testing Steps

1. **Start the WebSocket Service** on your local machine. Ensure it's running on `http://localhost:3004` or change it as per your requirement in `script.js` file.

2. **Open `demo.html`** in your web browser. This file will establish a WebSocket connection to the WebSocket Service and display the user ID in the browser.

   - The `user ID` will be displayed in the `<div id="user"></div>` section of the page.

3. **Seed the Database**
To ensure the problemId is available:

Run the Seed Script:

Navigate to the admin service directory and run the seed script to populate the database with problems data.
```
cd apps/admin
npm run seed
```
4. **Verify Seed Operation**: The seed script should insert data into the database. Check the console output for confirmation that the data has been seeded successfully.

5. **Retrieve problemId**
To obtain a valid problemId:

Make a GET Request to the Problems Endpoint. This endpoint should return details about available problems.

Example GET Request Using curl:
```
curl -X GET 'Admin_service_uri/api/v1/problems'
```

This will return two problems.
```
{
  "success": true,
  "message": "Successfully fetched all problems",
  "data": [
    {
      "testCases": [
        {
          "input": "5\n3",
          "output": "8"
        },
        {
          "input": "0\n2",
          "output": "2"
        }
      ],
      "id": "66aa18c3cd0531556a66a770",
      "title": "sum",
      "description": "d1",
      "difficulty": "easy",
      "editorial": null,
      "createdAt": "2024-07-31T10:58:11.873Z",
      "updatedAt": "2024-07-31T10:58:11.873Z"
    },
    {
      "testCases": [
        {
          "input": "2\n3",
          "output": "2"
        },
        {
          "input": "3\n1",
          "output": "0"
        }
      ],
      "id": "66aa18c3cd0531556a66a771",
      "title": "modulo",
      "description": "d2",
      "difficulty": "medium",
      "editorial": null,
      "createdAt": "2024-07-31T10:58:11.873Z",
      "updatedAt": "2024-07-31T10:58:11.873Z"
    }
  ],
  "error": {}
}
```

5. **Make a POST Request**

To test the submission flow:

#### Prepare the POST Request:
Use a tool like Postman, curl, or write a simple script to make the POST request.

**Post endpoint:**
```
Submission_service_uri/api/v1/submissions/
```

#### Request Body:
The request body should be in JSON format, including the userId received from the WebSocket connection and problemId.
Example JSON body:
#### Request body for sum problem
``` 
{
   "userId": "1",
   "problemId": "66aa18c3cd0531556a66a770",
   "code":"import sys\n\ndef process_input():\n    x = int(input())\n    y = int(input())\n    result = x + y\n    print(result)\n\nwhile True:\n    try:\n        process_input()\n    except EOFError:\n        break",
   "language": "python"
} 
```
Use the userId received from websocket and problemId for sum problem.
#### Request body for modulo problem
```
{
   "userId": "1",
   "problemId": "66aa18c3cd0531556a66a770",
   "code":"import sys\n\ndef process_input():\n    x = int(input())\n    y = int(input())\n    result = x % y\n    print(result)\n\nwhile True:\n    try:\n        process_input()\n    except EOFError:\n        break",
   "language": "python"
} 
```
Use the userId received from websocket and problemId for modulo problem.

6. **Verify the Response**: Check the response from the Submission Service to ensure it was received and processed correctly.

7. **Check the Response Display**: If the Submission Service sends a response back to the WebSocket service, it should be displayed in the <div id="submission"></div> section of the demo.html page.