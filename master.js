// master.js
const ModbusRTU = require('modbus-serial')
const client = new ModbusRTU()

async function run() {
  try {
    await client.connectTCP('127.0.0.1', { port: 502 })
    client.setID(1)
    console.log('✅ 已连接到 Modbus 从站')

    // 循环读写
    setInterval(async () => {
      try {
        // 读取保持寄存器（地址0开始，长度1）
        const data = await client.readHoldingRegisters(0, 1)
        console.log('📥 读取保持寄存器[0]:', data.data)

        // 写保持寄存器（地址1，写入随机值）
        const value = Math.floor(Math.random() * 100)
        await client.writeRegister(1, value)
        console.log('📤 写保持寄存器[1]:', value)
      } catch (err) {
        console.error('读写错误:', err.message)
      }
    }, 3000)
  } catch (err) {
    console.error('连接失败:', err.message)
  }
}

run()
