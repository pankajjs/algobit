"use client";

import { io } from "socket.io-client";

const WS_SERVICE_API = "http://localhost:5004";

export const socket = io(WS_SERVICE_API);
