import app from './app.js';

const { PORT } = process.env;

const startApp = () => {
	app.listen(PORT, 
	console.log(`server running on port ${PORT}`)
	);
};

startApp();





/*
{
  "username":"dgggs",
  "email" : "eadmgian@gmail.com",
  "password" : "adgah"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NGQ5ODI1MTU5NTk4OGM0NzY4ZjkxIn0sImlhdCI6MTY4MjIzMzczMCwiZXhwIjoxNjgyNTkzNzMwfQ.KSX3KiA2Rw4c9rdtxFJwQZPMon3hUPNI0rZ2Kr2RqPk

*/