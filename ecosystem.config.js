module.exports = {
    apps: [
        {
            name: 'cybrilla',
            exec_mode: 'fork',
            ignore_watch: ["node_modules"],
            instances: '1', // Or a number of instances
            env: {
                NODE_ENV: 'development'
            },
            script: "npm",
            args: "start",
        },
    ]
};
