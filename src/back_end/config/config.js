const env = process.env.NODE_ENV;

if (env === 'test' || env === 'development') {
  const config = require('./config.json');
  let envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}