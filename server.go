// conn.go -- A GameDemo Websocket connection handler
//
// (c) Copyright 2013 avaus, Gary Burd
//
// MIT Licensed, see the LICENSE and CREDITS files for details.
package main

type server struct {
	// Registered connections.
	connections map[*connection]bool

	// Inbound messages from the connections.
	broadcast chan []byte

	// Register requests from the connections.
	register chan *connection

	// Unregister requests from connections.
	unregister chan *connection
}

var s = server {
	broadcast:   make(chan []byte),
	register:    make(chan *connection),
	unregister:  make(chan *connection),
	connections: make(map[*connection]bool),
}

func (s *server) run() {
	for {
		select {
		case c := <-s.register:
			s.connections[c] = true
		case c := <-s.unregister:
			delete(s.connections, c)
			close(c.send)
		case m := <-s.broadcast:
			for c := range s.connections {
				select {
				case c.send <- m:
				default:
					delete(s.connections, c)
					close(c.send)
					go c.ws.Close()
				}
			}
		}
	}
}