const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const bcrypt = require("bcryptjs");
const {
    createTable,
    checkRecordExists,
    insertRecord,
} = require('../util/sqlFunctions');

 
const generateAccessToken = (userId)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d"});
};

const register = async (req,res) =>{
    const { firstname, lastname, gender, phone, role, email, password, confirmpassword, termsagree } = req.body;
    const checkpassword = password === confirmpassword;
    const userAlreadyExists = await checkRecordExists("myuserst", "email", email);
        if (userAlreadyExists) {
            console.log("user already exists error occured")
            res.status(409).json({message: "Email already exist!"});
        }
    if (!firstname || !lastname || !gender || !phone || !role || !email || !password || !termsagree || !confirmpassword || !checkpassword) {
        res.status(400).json({ error: "Incorrect input", message: (`Sign in information is incorrect`) })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = {
        userId: uuidv4(),
        firstname,
        lastname,
        gender,
        email,
        password: hashedPassword,
        phone,
        role,
        termsagree,
    };
    console.log("user: "+ user.email)
    try {
        await createTable(userSchema);
        const userAlreadyExists = await checkRecordExists("myuserst", "email", email);
        if (userAlreadyExists) {
            console.log("user already exists error occured")
            res.status(409).json({message: "Email already exist "});
        }
        else{
            console.log("records inserted", user);
            await insertRecord('myuserst', user);
            res.status(201).json({message: "User created successfully!"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
};
// you can get the user complete data by using existingUser
const login = async (req,res)=>{
    const {email, password} = req.body;
    console.log("Login : "+ email,password);
    if (!email || !password) {
        res.status(400).json({error: "Email or Password fields cannot be empty!"});
        return;
    }
    try {
        const existingUser = await checkRecordExists("myuserst", "email", email);
        if(existingUser){
            if(!existingUser.password){
                res.status(401).json({error: "Invalid credentials"})
            }
            console.log(password)
        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
    
        if (passwordMatch) {
            res.status(200).json({
                userId: existingUser.userId,
                userdata: existingUser,
                email: existingUser.email,
                access_token: generateAccessToken(existingUser.userId),
            });
        }
        else{
            res.status(401).json({error: "Invalid credentials"});
        }
    } else{
            res.status(401).json({error: "Invalid credentials"});
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};
module.exports = {
    register,
    login,
};