    const express = require("express"); 
    const app = express();

    const http = require("http");
    const socketIo = require("socket.io");

    const port = process.env.PORT || 4001;
    const index = require("./routes/index");
    
    //application calls the index route
    app.use(index); 

    const startLoad = require('./libs/cpuLoad')();
    let totalTicks;
    let totalIdles;
    let totalAvgCPULoad;
    let dateTime;
    let time;
    
    // start our server
    const server = http.createServer(app); 
    //include socket for real time data transfer
    const io = socketIo(server);

    io.on("connection", socket => {
      console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        1000
      );
      socket.on("disconnect", () => console.log("Client disconnected"));
    });

    const getApiAndEmit = async socket => {
        try {

            //gets date and time of calculation
            dateTime = new Date();
            time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
            time.toString();

            let endLoad = require('./libs/cpuLoad')();
            totalTicks = 0;
            totalIdles = 0;

            //calculates the Average Load Per Core
            const cpuLoad = {};
            endLoad.map((end, i) => {

                //calculates tick and idle
                let tick = (end.tick - startLoad[i].tick)
                let idle = (end.idle - startLoad[i].idle)

                //calaculates total ticks and idle
                totalTicks += tick
                totalIdles += idle

                //core count
                var core = 'core' + (i+1); 

                //returns Average Load of Core
                return(cpuLoad[core] = (((tick / (tick+idle)) * 100).toFixed(2)))
            })

            //calulates Average Load of overall CPU
            avgCPULoad = ((totalTicks / (totalTicks + totalIdles) * 100).toFixed(2));

            //add date and time
            cpuLoad['date'] = time;

            //add overall CPU Load
            cpuLoad['cpu'] = avgCPULoad;

            socket.emit("FromAPI", {cpuLoad: cpuLoad});

        } catch (error) {
            console.error(`Error: ${error.code}`);
        }
    };

server.listen(port, () => console.log(`Listening on port ${port}`));