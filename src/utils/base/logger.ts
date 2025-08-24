// src/utils/base/logger.ts

// 空壳实现
class ProxyLogger {
  settings = { name: '' };
  log = () => {};
  silly = () => {};
  trace = () => {};
  debug = () => {};
  info = () => {};
  warn = () => {};
  error = console.error;
  fatal = console.error;
}

declare const __PROD__: boolean;

// 用一个 Promise 延迟实例化，生产环境永远不 resolve
export let logger: ProxyLogger | Awaited<ReturnType<typeof createRealLogger>>;

async function createRealLogger() {
  // 只有开发环境才会执行到这里
  const { Logger } = await import('tslog');
  // 0 = silly, 2 = debug, 4 = warn, 5 = error, 6 = fatal
  return new Logger({ minLevel: 2, type: 'pretty' });
}

if (__PROD__) {
  logger = new ProxyLogger();
} else {
  // 开发环境异步初始化
  createRealLogger().then((real) => {
    logger = real;
  });
}
