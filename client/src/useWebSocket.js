import { useEffect, useMemo } from "react";
import io from "socket.io-client";

const useWebSocket = ({ url, onConnection = () => {}, events = [] }) => {
	const socket = useMemo(() => io(url, onConnection), [url]);

	useEffect(() => {
		socket.on("connect", onConnection);
		return () => socket.off("connect");
	}, [socket]);

	useEffect(() => {
		events.forEach(e => {
			socket.on(e.name, e.onReceive);
		});

		return () => {
			events.forEach(e => {
				socket.off(e.name);
			});
		};
	}, [events]);

	return socket;
};

export default useWebSocket;
