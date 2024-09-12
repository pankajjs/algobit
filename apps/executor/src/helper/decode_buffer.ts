import { DATA_LENGTH_BYTE_SIZE, STDERR_STREAM_TYPE, STDOUT_STREAM_TYPE, STREAM_HEADER_SIZE } from "./constants";
import { OutputStream } from "./types";

const getOutputStream = (buffer: Buffer): OutputStream => {
    // keeps track of position in buffer while parsing
    let offset = 0;

    // stores the accumulated stdout and stderr output as string
    let outputStream : OutputStream = {
        stdout: "",
        stderr: ""
    };

    while (offset < buffer.length){
        const streamType = buffer[offset];
        const lengthOfData = buffer.readUInt32BE(offset + DATA_LENGTH_BYTE_SIZE);

        offset += STREAM_HEADER_SIZE;

        if (streamType === STDOUT_STREAM_TYPE){
            outputStream.stdout += buffer.toString('utf-8', offset, offset + lengthOfData);
        }else if(streamType === STDERR_STREAM_TYPE){
            outputStream.stderr += buffer.toString('utf-8', offset, offset + lengthOfData);
        }


        offset += lengthOfData;
    }

    return outputStream;
}

export {
    getOutputStream
}