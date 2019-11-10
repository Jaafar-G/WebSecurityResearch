const handleIP = (req, res, commandLine,db) =>{
          let moment = req.timestamp;
          let timeFormat = moment.tz("America/Chicago").format();
          let date = timeFormat.split(/T/, 1)
          let time = timeFormat.substring(timeFormat.lastIndexOf("T") + 1, timeFormat.length);
          let ip = req.body.ip;
          let cmd = `whois -h whois.cymru.com " -f -p ${ip}" `;
          let cmd_output;
          let cp = commandLine(cmd, function(err,data){
              if(err){
                  console.log(err);
              }
              cmd_output = Buffer.from(data).toString('utf8');
                    let text = cmd_output;
                    let extract= text.split('|');
                    let bgp = extract[2].replace(/ /g, '');
                    let asnName = extract[3].replace(/ /g, '');
                    insertdb(req,res,db,ip,time,date,timeFormat,bgp,asnName);
          })            
          cp.on('close', function(){
          //      cmd_output is already populated above. console.log here or leave it
          })
}
const insertdb = (req,res,db,ip,time,date,timeFormat,bgp,asnName) => {
          db.insert({
                    header_info: req.headers,
                    ip_info: ip,
                    start_time_stamp: timeFormat,
                    start_time: time,
                    start_date: date,
                    asn_prefix: bgp,
                    as_name: asnName,  
            })
            .returning('visit_id')
            .into('users')
            .then((visit_id) => {
                        res.json(visit_id);
                    }
            ).catch(err =>{ 
                    res.status(400).json('unable to write');
            })
}
module.exports = {
          handleIP: handleIP
}
