import express from 'express';
import bodyParser from 'body-parser';
import routing from './controllers';
import cors from 'cors';
const app = express();
const port = 9090;

app.listen(port, ()=> {
    console.log("Server is running at 9090 port");
});

// app.use(express.static("public"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		extended: false,
		limit: '50mb',
	})
);

var whitelist = ['http://localhost:3000'];
var corsOptions = {
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true,
};

app.use('/',cors(corsOptions), routing)
