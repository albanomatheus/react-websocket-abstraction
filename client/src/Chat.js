import React, { useState, useEffect } from "react";
import useWebSocket from "./useWebSocket";
import WebSocket from "./WebSocket";

const SERVER_URL = "http://localhost:8080/";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const [historic, setHistoric] = useState([]);
  const [historic2, setHistoric2] = useState([]);

  const socket = useWebSocket({
    url: SERVER_URL,
    onConnection: () => console.log("[IO] Connection was estabilished!"),
    events: [
      {
        name: "chat.message",
        onReceive: data => {
          setHistoric(hist => [...hist, { msg: data.msg }]);
        }
      },
      {
        name: "chat2.message",
        onReceive: data => {
          setHistoric2(hist2 => [...hist2, { msg: data.msg2 }]);
        }
      }
    ]
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (msg.trim()) {
      socket.emit("chat.message", { msg });
      setMsg("");
    }
  };

  const handleSubmit2 = e => {
    e.preventDefault();

    if (msg2.trim()) {
      socket.emit("chat2.message", { msg2 });
      setMsg2("");
    }
  };

  return (
    <>
      <div style={{ float: "left", margin: "20px" }}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Digite a mensagem aqui"
            onChange={e => setMsg(e.target.value)}
            value={msg}
          />
        </form>
        {historic.map((data, idx) => (
          <p
            style={{
              background: "blue",
              padding: "5px",
              borderRadius: "5px",
              color: "white"
            }}
            key={idx}
          >
            {data.msg}
          </p>
        ))}
      </div>
      <div style={{ float: "right", margin: "20px" }}>
        <form onSubmit={handleSubmit2}>
          <input
            placeholder="Digite a mensagem aqui"
            onChange={e => setMsg2(e.target.value)}
            value={msg2}
          />
        </form>
        {historic2.map((data, idx) => (
          <p
            style={{
              background: "green",
              padding: "5px",
              borderRadius: "5px",
              color: "white"
            }}
            key={idx}
          >
            {data.msg}
          </p>
        ))}
      </div>
    </>
  );
};

const Chat2 = ({ socket }) => {
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const [historic, setHistoric] = useState([]);
  const [historic2, setHistoric2] = useState([]);

  useEffect(() => {
    socket.on("chat.message", data => {
      setHistoric(hist => [...hist, { msg: data.msg }]);
    });
    socket.on("chat2.message", data => {
      setHistoric2(hist2 => [...hist2, { msg: data.msg2 }]);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (msg.trim()) {
      socket.emit("chat.message", { msg });
      setMsg("");
    }
  };

  const handleSubmit2 = e => {
    e.preventDefault();

    if (msg2.trim()) {
      socket.emit("chat2.message", { msg2 });
      setMsg2("");
    }
  };

  return (
    <>
      <div style={{ float: "left", margin: "20px" }}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Digite a mensagem aqui"
            onChange={e => setMsg(e.target.value)}
            value={msg}
          />
        </form>
        {historic.map((data, idx) => (
          <p
            style={{
              background: "blue",
              padding: "5px",
              borderRadius: "5px",
              color: "white"
            }}
            key={idx}
          >
            {data.msg}
          </p>
        ))}
      </div>
      <div style={{ float: "right", margin: "20px" }}>
        <form onSubmit={handleSubmit2}>
          <input
            placeholder="Digite a mensagem aqui"
            onChange={e => setMsg2(e.target.value)}
            value={msg2}
          />
        </form>
        {historic2.map((data, idx) => (
          <p
            style={{
              background: "green",
              padding: "5px",
              borderRadius: "5px",
              color: "white"
            }}
            key={idx}
          >
            {data.msg}
          </p>
        ))}
      </div>
    </>
  );
};

const ChatWrapper = () => {
  const wsConfig = {
    url: SERVER_URL,
    onConnection: () => console.log("[IO] Connection was estabilished!")
  };

  return (
    <>
      <WebSocket wsConfig={wsConfig}>{({ socket }) => <Chat2 socket={socket} />}</WebSocket>
    </>
  );
};

export default ChatWrapper;
