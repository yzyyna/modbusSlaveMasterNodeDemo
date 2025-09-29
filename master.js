// master.js
const ModbusRTU = require('modbus-serial')
const client = new ModbusRTU()

async function run() {
  try {
    await client.connectTCP('127.0.0.1', { port: 1502 })
    client.setID(1)
    console.log('✅ 主站已连接到从站')

    setInterval(async () => {
      try {
        // 读取保持寄存器0
        const data = await client.readHoldingRegisters(0, 1)
        console.log('📥 主站: 读取寄存器[0] =', data.data[0])

        // 写保持寄存器1
        const value = Math.floor(Math.random() * 100)
        await client.writeRegister(1, value)
        console.log('📤 主站: 写寄存器[1] =', value)
      } catch (err) {
        console.error('读写错误:', err.message)
      }
    }, 3000)
  } catch (err) {
    console.error('连接失败:', err.message)
  }
}

run()
