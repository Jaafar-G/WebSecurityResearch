const handleQuit = (req,res,db) => {
          console.log('quit endpoint');

          let moment = req.timestamp;
          let timeFormat = moment.tz("America/Chicago").format();
          let date = timeFormat.split(/T/, 1)
          let time = timeFormat.substring(timeFormat.lastIndexOf("T") + 1, timeFormat.length);
          db("users")
          .where({visit_id : req.body.visitID})
          .update({
                  end_time_stamp: timeFormat,
                  end_time: time,
                  end_date: date
          })
          .then(res.json('exit'))
}
module.exports = {
          handleQuit: handleQuit
}