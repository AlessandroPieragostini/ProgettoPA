

/** Enum for user roles which can be:
 *  - administrators
 *  - users
 *  - systems connected to the API
 */

export const UserRole = {
    USER:   'utente',
    OP:  'operatore',
  };
  
export const StatusCode = {
    ok: 200,
    created: 201,
    accepted: 202,
    nonAuthoritativeInformation: 203,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
}
  