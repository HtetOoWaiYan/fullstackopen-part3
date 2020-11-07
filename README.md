Exercise submissions for [Part 3](https://fullstackopen.com/en/part3) of [Full Stack Open 2020](https://fullstackopen.com) course. 

I already have [a repository](https://github.com/HtetOoWaiYan/full-stack-open) for all the exercises.

The reason I created a separate one for Part 3 is because [it is recommenced to do so](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6), as the exercises include the deployment of the app to [Heroku](https://www.heroku.com) and the source code is preferred to be at the root directory.

Deployed URL - [https://fullstackopen20-part3.herokuapp.com](https://fullstackopen20-part3.herokuapp.com)

## How to use 

Run: **`npm i`** to install the dependencies.

Create **`.env`** file, add your PORT and [MongoDB Connection String](https://www.mongodb.com/cloud/atlas) like:
```
PORT=YOUR_PORT_NUMBER
MONGODB_URI='YOUR_MONGODB_CONNECTION_STRING'
```

(A guide to setup MongoDB Atlas can be found [here](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db).)

Run the app in the development mode: **`npm run dev`**
<br/>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser. 

API can be access with the URL [http://localhost:3001/api/persons](http://localhost:3001/api/persons)

(Replace 3001 with your PORT number.)