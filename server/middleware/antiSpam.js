const rateStore = new Map();

function getClientKey(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "unknown";
}

function publicFormRateLimit(req, res, next) {
  const key = `${getClientKey(req)}:${req.path}`;
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 8;
  const current = rateStore.get(key) || { count: 0, resetAt: now + windowMs };

  if (current.resetAt < now) {
    rateStore.set(key, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (current.count >= maxRequests) {
    return res.status(429).json({
      message: "Too many submissions. Please wait a few minutes before trying again."
    });
  }

  current.count += 1;
  rateStore.set(key, current);
  return next();
}

function publicFormAntiSpam(req, res, next) {
  if (req.body?.website) {
    return res.status(400).json({
      message: "Submission rejected."
    });
  }

  const formStartedAt = Number(req.body?.formStartedAt);
  if (formStartedAt && Date.now() - formStartedAt < 1200) {
    return res.status(400).json({
      message: "Please review the form and submit again."
    });
  }

  return next();
}

module.exports = {
  publicFormAntiSpam,
  publicFormRateLimit
};
