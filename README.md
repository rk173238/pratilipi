Pre-requisite:-
1. Install Latest node from nodejs.org
2.npm i express
3.npm i cors


-------------------------------------------------------------------------
Use Instruction:-
Running the api at locahost.
1.Browse to the folder /pratilipi.
2.open cmd or git-bash 
3.type this command:-nodemon app.js OR node app.js

The above step should be able to run the app on http://localhost:3000.

Testing
1.start the new game with api http://localhost:3000/start
cmd console should show the matrix with new game initialization.


Testing the app in localhost:-
1.I have created a html page with few button open testlocalhost.html file in the browser...
2.to drop the ball, press any coloumn fro 0 to 6. 
3.page will show if it was valid/invalid or winning move

This App is also deployed on the server provided by heroku:-
Api Url is:-https://hackerearth-pratilipi.herokuapp.com/

To test this deployed api open testdeployment.html 


POST EXAMPLE:- IMPORTANT
$.post('http://localhost:3000/set',{col:1},{headers:{'token':'abc'}})
data param with post request must be object type with 1 key-value pair, and key is "col"
----------------------------------------------------------------------------------------------------------------------------


Deployement Url:-https://hackerearth-pratilipi.herokuapp.com/start

