const FRUITYVICE_URL = process.env.FRUITYVICE_URL

if (!FRUITYVICE_URL) {
  throw new Error("FRUITYVICE_URL non configurata")
}

export const API = {
    fruityvice: {
      baseUrl: FRUITYVICE_URL,
    },
  };