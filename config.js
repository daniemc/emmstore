const configKeys = {
    development: {
        apiBase: 'http://localhost/api',
    },
    testing: {
        apiBase: 'http://store-env.eba-p8bqhvfv.us-east-1.elasticbeanstalk.com/api',
    },
    production: {
        apiBase: '',
    },
}

export { configKeys }