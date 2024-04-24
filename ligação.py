import asyncio
import websockets

async def handle_websocket(websocket, path):
    async for message in websocket:
        # Quando receber uma mensagem do cliente WebSocket
        # Encaminhe-a para o Arduino via porta serial
        arduino_serial.write(message.encode())

async def start_server():
    async with websockets.serve(handle_websocket, "localhost", 8765):
        await asyncio.Future()  # Mantém o servidor em execução

# Inicialize o servidor WebSocket
asyncio.get_event_loop().run_until_complete(start_server())
asyncio.get_event_loop().run_forever()
