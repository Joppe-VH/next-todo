const env = (name: string, defaultValue?: string) => {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
};

export const DATABASE_URL = env("DATABASE_URL");
