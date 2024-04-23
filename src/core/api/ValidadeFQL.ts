import fetch from 'core/api/fetch';

const validateFQL = async (
  expression: string,
  provider?: string,
  namespace?: string,
  url?: string,
) => {
  const data = fetch.post(
    url ?? `datasources/${provider}/${namespace}/fql-validation`,
    { expression },
  );
  const isValid: boolean = await data.then(({ data }) => data.isValid);
  return isValid;
};

export default validateFQL;
