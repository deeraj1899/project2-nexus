const User=require("../model/user");
const bcrypt = require('bcryptjs');

const signupRoute=(async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username: username,
            password: hashedPassword
        });
        
        await user.save();
        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

const loginRoute=(async (req, res) => {
    try {
       
        const {username,password}=req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid username ');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        res.redirect(`/home?username=${user.username}`);
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

const getHomePage=((req,res)=>{
    const { username } = req.query;
    res.render("home.ejs",{username});
});

const getLoginPage=((req, res) => {
    res.render('login.ejs');
  });


module.exports={signupRoute,loginRoute,getHomePage,getLoginPage};