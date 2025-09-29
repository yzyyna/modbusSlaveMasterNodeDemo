// slave.js
const ModbusRTU = require('modbus-serial')

// 模拟保持寄存器（100个，2字节/个）
let holdingRegisters = Buffer.alloc(100 * 2)

const vector = {
  // 读取保持寄存器
  getHoldingRegister: function (addr) {
    const value = holdingRegisters.readUInt16BE(addr * 2)
    console.log(`📥 从站: 读取保持寄存器[${addr}] = ${value}`)
    return Promise.resolve(value)
  },
  // 写保持寄存器
  setRegister: function (addr, value) {
    holdingRegisters.writeUInt16BE(value, addr * 2)
    console.log(`📤 从站: 写保持寄存器[${addr}] = ${value}`)
    return Promise.resolve()
  },
  // 读取线圈
  getCoil: function (addr) {
    return Promise.resolve(addr % 2 === 0)
  },
  // 写线圈
  setCoil: function (addr, value) {
    console.log(`📤 从站: 写线圈[${addr}] = ${value}`)
    return Promise.resolve()
  }
}

// 启动 Modbus TCP 从站
const customPort = 1502 // 自定义端口，避免与其他服务冲突
const serverTCP = new ModbusRTU.ServerTCP(vector, {
  host: '127.0.0.1',
  port: customPort,
  debug: true,
  unitID: 1
})

console.log(`✅ Modbus TCP 从站已启动，监听 127.0.0.1:${customPort}`)

// 模拟寄存器0的值每2秒变化
setInterval(() => {
  const randomValue = Math.floor(Math.random() * 1000)
  holdingRegisters.writeUInt16BE(randomValue, 0)
  console.log('🔄 从站: 更新寄存器[0] =', randomValue)
}, 2000)
