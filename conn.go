// conn.go -- A GameDemo Websocket connection handler
//
// (c) Copyright 2013 avaus, Gary Burd
//
// MIT Licensed, see the LICENSE and CREDITS files for details.
package main

import (
	"github.com/gorilla/websocket"
	"github.com/golang/glog"
	"net/http"
	"strings"
)

type connection struct {
	// The websocket connection.
	ws *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte
}

func (c *connection) reader() {
	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			break
		}
		msg := strings.Split(string(message), ";")
		mtype := msg[0]
		payload := msg[1]
		glog.Info(mtype, " ", payload)
		s.broadcast <- message
	}
	c.ws.Close()
}

func (c *connection) writer() {
	for message := range c.send {
		err := c.ws.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			break
		}
	}
	c.ws.Close()
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	ws, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(w, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		return
	}
	c := &connection{send: make(chan []byte, 256), ws: ws}
	s.register <- c
	defer func() { s.unregister <- c }()
	go c.writer()
	c.reader()
}
