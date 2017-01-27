var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 3001, headers: {
	"Access-Control-Allow-Origin": "*"
}});

console.log('Listening at port 3001.');
wss.on('connection', function(ws) {
	ws.on('message', function(msg) {
		console.log('received: %s', msg);
	});
	setTimeout(function() {
		ws.send(JSON.stringify({"view": "metrics", "url": "/metrics_updated.json"}))
	}, 10000)
	setTimeout(function() {
		ws.send(JSON.stringify({"view": "demography", "url": "/demography_updated.csv"}))
	}, 15000)
	setTimeout(function() {
		ws.send(JSON.stringify({"view": "issues", "url": "/issues_updated.json"}))
	}, 20000)
})