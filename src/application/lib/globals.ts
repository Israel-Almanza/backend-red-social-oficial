export const Finalizado = {
  OK: true,
  FAIL: false,
} as const;

export const HttpCodes = {
  success: 200,
  userError: 400,
  forbidden: 403,
  unauthorizated: 401,
  created: 201,
  fatalError: 500,
} as const;