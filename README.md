# fritter
experiments with apis from different stacks
# Server
```
cd server
npm install
```
## Docker
```
docker-compose -f "docker-compose.yaml" up -d
```

## Sequelize config
### .sequelizerc
The sequelize configuration is in the `/server/.sequelizerc` file:
```javascript
// .sequelizerc

const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.js'),
  'models-path': path.resolve('models', 'database'),
  'seeders-path': path.resolve('models', 'seeders'),
  'migrations-path': path.resolve('database', 'migrations')
};
```
Migration storage and migration storage path are defined in file: `database.js`
```javascript
...
// Use a different storage type. Default: sequelize
    migrationStorage: "json",
    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: "database/migrations-sequelize-meta.json",
...
```
`database/migrations-sequelize-meta.json` is ignore in .gitignore

## Sequelize migrations
[Sequealize migrations](https://sequelize.org/master/manual/migrations.html)


## Test
### jest
```
npm install --save-dev jest
```
### SupertTest
A library for testing Node.js HTTP servers. It enables us to programmatically send HTTP requests such as GET, POST, PATCH, PUT, DELETE to HTTP servers and get results.

[SuperTest npm](https://www.npmjs.com/package/supertest)

```
npm install --save-dev supertest
``




