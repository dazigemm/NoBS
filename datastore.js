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

function testCreateUser(){
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
      name: 'test1',
      password: 'test1'
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

module.exports = {
  testCreateUser: testCreateUser
}
