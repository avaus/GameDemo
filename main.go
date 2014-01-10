// conn.go -- A GameDemo Websocket connection handler
//
// (c) Copyright 2013 avaus, Gary Burd
//
// MIT Licensed, see the LICENSE and CREDITS files for details.
package main

import (
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":8080", "http service address")

func main() {
	flag.Parse()
	go s.run()
	http.HandleFunc("/ws", wsHandler)
	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}