var express = require("express"),
 	app = express(),
 	request = require("request"),
	ejsLint = require("ejs-lint"),
 	bodyParser = require("body-parser"),
 	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");

// requiring routes 
var commentRoutes 		= require("./routes/comments"),
 	indexRoutes 		= require("./routes/index"),
 	campgroundRoutes 	= require("./routes/campgrounds");
	
app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true});
// mongoose.connect('mongodb+srv://adx:yinks2018@cluster0-kwc0k.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true	
// });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Late night NY",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started!");
});