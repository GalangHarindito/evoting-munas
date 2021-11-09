export const routes = {
  LOGIN: () => { return `/login`; },
  REGISTER: () => { return `/sign-up`; },
  FORGOTPASSWORD: () => { return `/forgot-password`; },
  DASHBOARD: () => { return `/`; },
  PROFILE: () => { return `/profile`; },
  EDITPROFILE: () => { return `/profile?profileEdit=true`},
  EVOTING: () => { return `/e-voting` },
  DPT: () => { return `/dpt` },
  SUMMARY: () => { return `/summary-dpt` },
  SUMMARYVOTE: () => { return `/summary-vote` },
  CALONKETUA: () => { return `/caketum` },
  EVENTS: () => { return `/events` },
  BANTUAN: () => { return `/bantuan`},
  VOTECHECK: () => { return `/vote-check`}
}; 