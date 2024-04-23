// eslint-disable-next-line
const fs = require('fs');

// Generate the client settings file based on build context
function generateClientSettingsFile() {
  const baseUrl = process.env.API_BASE_URL
    ? process.env.API_BASE_URL
    : 'https://api.example.com/';

  const settings = {
    baseUrl: baseUrl,
  };

  fs.writeFileSync(
    'src/core/api/ApiClient/settings.json',
    JSON.stringify(settings),
  );
}

generateClientSettingsFile();
