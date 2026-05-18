function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: required('BASE_URL'),
  apiUrl: required('API_URL'),

  admin: {
    user: required('ADMIN_USER'),
    password: required('ADMIN_PASSWORD')
  }
};
