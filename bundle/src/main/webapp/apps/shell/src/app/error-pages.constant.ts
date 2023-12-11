export const RX_ERROR_PAGES = {
  accessDenied: {
    path: 'access-denied',
    data: {
      errorTitle: 'You are not authorized to access Innovation Studio',
      errorMessage: `<p>You do not have permission to access Innovation Studio with your current account privileges.</p>
                     <p>Contact the System Administrator if you believe you should be able to access Innovation Studio.</p>`,
      showSignInLink: true
    }
  },
  unexpectedError: {
    path: 'unsupported-environment',
    data: {
      errorTitle: 'Error: Unexpected Application Error',
      errorMessage: `<p>An unexpected application error has occurred.</p>
                     <p>Contact your system administrator if this problem persists.</p>`
    }
  }
};
