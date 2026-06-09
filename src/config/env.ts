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
  },

  testUsers: [
    {
      role: required('TEST_USER_1_ROLE'),
      status: required('TEST_USER_1_STATUS'),
      username: required('TEST_USER_1_USERNAME'),
      password: required('TEST_USER_1_PASSWORD')
    },
    {
      role: required('TEST_USER_2_ROLE'),
      status: required('TEST_USER_2_STATUS'),
      username: required('TEST_USER_2_USERNAME'),
      password: required('TEST_USER_2_PASSWORD')
    },
    {
      role: required('TEST_USER_3_ROLE'),
      status: required('TEST_USER_3_STATUS'),
      username: required('TEST_USER_3_USERNAME'),
      password: required('TEST_USER_3_PASSWORD')
    },
    {
      role: required('TEST_USER_4_ROLE'),
      status: required('TEST_USER_4_STATUS'),
      username: required('TEST_USER_4_USERNAME'),
      password: required('TEST_USER_4_PASSWORD')
    },
    {
      role: required('TEST_USER_5_ROLE'),
      status: required('TEST_USER_5_STATUS'),
      username: required('TEST_USER_5_USERNAME'),
      password: required('TEST_USER_5_PASSWORD')
    }
  ]
};
