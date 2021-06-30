import express from "express";
import  { createLogger, format, transports, } from "winston";
import exphbs from "express-handlebars";
import methodOverride from "method-override";
import browserSync  from "browser-sync";
import path from "path";
import axios from 'axios';
require('dotenv').config();

// init logger
const logger = createLogger({
	format: format.combine(
		format.splat(),
		format.simple()
	),
	transports: [new transports.Console(),],
});

// Get Port
const PORT = process.env.PORT || 3000;
const ENV = process.env.APP_ENV || "dev";


// init App
const app = express();

// init view engine
app.engine("handlebars", exphbs({defaultLayout: "main",}));
app.set("view engine", "handlebars");

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

// Method-Override
app.use(methodOverride("_method"));

// publish public folder
app.use(express.static(path.join(__dirname, "/public")));

// default route 
app.get("/", (req, res) => {
	res.render("homepage", {greeting: "Hello",});
});
app.get("/account", (req,res)=>{
	const config = {
		  headers: {
		'Authorization' :'Bearer ' + process.env.SB_BEARER
	  }
	}
	axios.get("https://api.sparebank1.no/open/personal/banking/accounts/"+process.env.SB_ACCOUNTID+"/transactions", config)
	  .then((result) => {
		res.send(result.data)
	 })
	  .catch((err) => {
	   console.log(err);   
	  })
	
	
});
app.listen(PORT, () => logger.log("info", "Webservice startet on Port: %d", PORT));

/** Test doku automation
 * @returns {int} 0 
*/
const testIt = () => 0;
testIt();

// init browser-sync
logger.log("info", "ENV ist: %s", ENV);
if (ENV==="dev"){
	const bs = browserSync.create();
	bs.init({
		port: PORT+1,
		proxy: {
			target: "localhost:" + PORT,
		},
	});
}
