// contains info of stdin and stderr
export const STREAM_HEADER_SIZE: number = 8

export const STDOUT_STREAM_TYPE: number = 1;
export const STDERR_STREAM_TYPE: number = 2;
export const DATA_LENGTH_BYTE_SIZE: number = 4;

export const PYTHON_IMAGE: string = 'python:3.8-slim';
export const JAVA_IMAGE: string = "openjdk:8-jdk-slim";

export const SUBMISSION_REQUEST_QUEUE: string = "SubmissionRequestQueue";
export const SUBMISSION_REQUEST_JOB: string = "SubmissionRequestJob";

export const SUBMISSION_RESPONSE_QUEUE: string = "SubmissionResponseQueue";
export const SUBMISSION_RESPONSE_JOB: string = "SubmissionResponseJob";
export const PYTHON_TIME_LIMIT: number = 2;
export const TIME_LIMIT_SECOND: number = 1000;
export const JAVA_TIME_LIMIT: number = 2; 
