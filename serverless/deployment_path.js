module.exports = (serverless) => {
  const specialStages = ['preview'];

  const stage = serverless.service.provider.stage;

  return specialStages.includes(stage) ? `-${stage}` : '';
};
