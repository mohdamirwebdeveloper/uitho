import http.server
import socketserver
import urllib.parse
import json # Import the json library for potential future use or stricter JSON handling

# Use a different port number
PORT = 8080

class FakeEspServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL to separate path from query parameters
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        # query = parsed_url.query # Not strictly needed for this request simulation

        # Set default headers, including CORS
        self.send_header('Access-Control-Allow-Origin', '*') # Allow requests from any origin
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') # Allow common methods
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type') # Allow common headers

        if path == "/run":
            # Simulate the response for the /run command
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()

            response_message = "success"
            self.wfile.write(bytes(response_message, "utf8"))
            print(f"Received GET request for /run. Responded with 'success'.")

        elif path == "/attack.json":
            # Simulate the response for fetching attack status
            # As per the request, we'll return the "target selected" like data
            # Data format: [deauth_status, beacon_status, probe_status, total_packets]
            # Each status: [attack_running (bool), packets_sent (int), specific_data1 (int), specific_data2 (int)]

            # Simulating the "target selected" response data
            # [[true,1,26,25], [false,8,0,0], [false,8,0,0], 26]
            # Note: The last element '26' might represent total deauth packets sent or similar.
            # Let's use the structure provided for "target selected".
            attack_status_data = [[True, 1, 26, 25], [False, 8, 0, 0], [False, 8, 0, 0], 26]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            # Convert Python list to JSON string
            response_json = json.dumps(attack_status_data)

            self.wfile.write(bytes(response_json, "utf8"))
            print(f"Received GET request for /attack.json. Responded with: {response_json}")

        else:
            # For any other path, return a 404 Not Found
            self.send_response(404)
            self.end_headers()
            self.wfile.write(bytes("Not found", "utf8"))
            print(f"Received GET request for {path}. Responded with 404.")

    # Add do_OPTIONS method to handle CORS preflight requests
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        self.end_headers()
        print(f"Received OPTIONS request for {self.path}. Responded with 200 for CORS preflight.")


# Set up the server
# Binding to '127.0.0.1' means it's only accessible from your local machine.
# Change to '0.0.0.0' if you need it accessible from other devices on your network.
server_address = ("127.0.0.1", PORT)
with socketserver.TCPServer(server_address, FakeEspServerHandler) as httpd:
    print(f"Serving fake ESP backend at http://{server_address[0]}:{server_address[1]}")
    print("Press Ctrl+C to stop")

    # Activate the server; this will keep running until interrupted
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")