import { useEffect, useRef } from "react";

interface IUseWebsocket {
    wsUrl: string
    onMessage: (values: any) => void
    onOpen?: () => void
  }
  
  export const useWebsocket = (props: IUseWebsocket) => {
    const wsRef = useRef<WebSocket>();
    
    useEffect(() => {
      if (!wsRef.current) {
  
        wsRef.current = new WebSocket(props?.wsUrl);
  
        wsRef.current.onopen = () => {
          if (typeof props?.onOpen === 'function') props?.onOpen();
        }
  
        wsRef.current.onmessage = (e) => {
          const data = JSON.parse(e?.data);
  
          props?.onMessage(data);
        }
      }
    }, [])
  
    const onSend = (payload = {}) => {
      try {
        console.log('onSend: ', payload);
        if (wsRef.current) wsRef.current.send(
          JSON.stringify(payload)
        )
      } catch (err) {
        console.log('onSend Error: ', err);
      }
    }
    
    return { wsRef, onSend }
  }