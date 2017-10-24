const os = require('os')

//returns calculated average idle and non idle usage per cpu core
function cpuLoadPerCore() {
  const cpus = os.cpus()

  return cpus.map(cpu => {
    const times = cpu.times
    return {
      tick: Object.keys(times).filter(time => time !== 'idle').reduce((tick, time) => { tick+=times[time]; return tick }, 0),
      idle: times.idle,
    }
  })
}

module.exports = cpuLoadPerCore;