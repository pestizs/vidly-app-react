import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn: "https://c4af242f231cb0684a3c1b58676d7c3d@o4506314714120192.ingest.sentry.io/4506314723688448",
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
