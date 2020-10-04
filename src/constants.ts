export const enum PRIVILEGE_LEVELS {
  admin,
  moderator,
  user,
}

export const enum ERROR_CODES {
  NO_ACCESS_TOKEN_PROVIDED,
  UNAUTHORIZED_ACCESS,
  REQUIRES_ADMIN_ROLE,
  REQUIRES_MODERATOR_ROLE,
  REQUIRES_MODERATOR_OR_ADMIN_ROLE,
  USERNAME_TAKEN,
  EMAIL_TAKEN,
  ROLE_NOT_VALID,
  USER_CREATION_ERROR,
  FAILED_LOGIN,
}

export const enum RESPONSE_CODES {
  USER_CREATED_SUCCESSFULLY,
}
