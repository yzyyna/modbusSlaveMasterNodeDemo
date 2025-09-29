// slave.js
const ModbusRTU = require('modbus-serial')
const serverTCP = new ModbusRTU.ServerTCP(
  {
    holding: Buffer.alloc(10000), // 模拟保持寄存器
    input: Buffer.alloc(10000), // 模拟输入寄存器
    coils: Buffer.alloc(10000), // 模拟线圈
    discrete: Buffer.alloc(10000) // 模拟离散输入
  },
  {
    host: '127.0.0.1',
    port: 502,
    debug: true,
    unitID: 1
  }
)

console.log('✅ Modbus TCP 从站已启动，监听 127.0.0.1:502')

// 初始化寄存器数据
setInterval(() => {
  // 模拟寄存器数据变化
  serverTCP.holding.writeUInt16BE(Math.floor(Math.random() * 1000), 0)
}, 2000)
