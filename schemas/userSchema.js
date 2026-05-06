const userSchema = `
CREATE TABLE IF NOT EXISTS myuserst(
    userId VARCHAR(255) UNIQUE NOT NULL,
    firstname varchar(60) not null,
    lastname varchar(60) not null,
    gender varchar(6) not null,
    email varchar(100) primary key not null,
    password varchar(255) not null,
    phone varchar(15) not null, 
    role Varchar(30) not null,
    termsagree Varchar(5) not null
)
`;

module.exports = userSchema;