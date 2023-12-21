export const appConfig = {
    matchConfig: {
        minDurationMinutes: 1,
        maxDurationMinutes: 90
    },
    sentry: {
        dsn: process.env.EXPO_PUBLIC_SENTRY_DSN
    },
}