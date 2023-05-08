module.exports = {
  apps : [{
    name   : "futbolecuador",
    script : "./index.js",
    instances: 5,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    env: {
      NODE_ENV: "production",
    },
  }]
}
