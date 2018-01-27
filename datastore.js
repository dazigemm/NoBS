//to create unique IDs
const uuidv1 = require('uuid/v1');

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'no-bull-shit';

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
});

function createUser(username, userpassword){
  // The kind for the new entity
  const kind = 'User';
  // The name/ID for the new entity
  const name = uuidv1();
  // The Cloud Datastore key for the new entity
  const userKey = datastore.key([kind, name]);

  // Prepares the new entity
  const user = {
    key: userKey,
    data: {
      name: username,
      password: userpassword
    },
  };

  // Saves the entity
  datastore
    .save(user)
    .then(() => {
      console.log(`Saved ${user.key.name}: ${user.data.name}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function newBathroom(address){
  // The kind for the new entity
  const kind = 'Bathroom';
  // The name/ID for the new entity
  const name = uuidv1();
  // The Cloud Datastore key for the new entity
  const userKey = datastore.key([kind, name]);

  // Prepares the new entity
  const user = {
    key: userKey,
    data: {
      name: username,
      password: userpassword
    },
  };

  // Saves the entity
  datastore
    .save(user)
    .then(() => {
      console.log(`Saved ${user.key.name}: ${user.data.name}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function displayAllData(){
  var data = {};
  const query = datastore.createQuery('User');

  query.run(function(err, users, info) {
    // entities = An array of records.
    var users = [];
    // Access the Key object for an entity.
    console.log(users[0][datastore.KEY]);
    for (user in users){
      users.push(user);
    }
    data.push(users);
  });
  console.log(data);
  return data;
}

module.exports = {
  createUser: createUser,
  newBathroom: newBathroom,
  displayAllData: displayAllData
}
