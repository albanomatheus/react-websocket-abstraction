import React from "react";
import useWebSocket from "./useWebSocket";

const WebSocket = props => {
	const socket = useWebSocket(props.wsConfig);
	return <props.children socket={socket} />;
};

export default WebSocket;
