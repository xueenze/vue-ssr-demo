module.exports = {
    apps: [
      {
        name: 'vue ssr server', // 应用名称
        script: './server.js', // 启动文件地址
        cwd: './', // 当前工作路径
        watch: [
          // 监控变化的目录，一旦变化，自动重启
          'src',
          'build',
        ],
        ignore_watch: [
          // 忽视这些目录的变化
          'node_modules',
          'logs',
          'public',
        ],
        env_production: {
            "PORT": 8889,
            "NODE_ENV": "production"
        },
        node_args: '--harmony', // node的启动模式
        out_file: './logs/out.log', // 普通日志路径
        error_file: './logs/err.log', // 错误日志路径
        merge_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
      },
    ],
  };
  