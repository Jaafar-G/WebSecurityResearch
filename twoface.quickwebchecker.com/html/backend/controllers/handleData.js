const handleData = (req,res,db) => {
          //simplified varialbes
          let keyb = req.body.keyBoardData;
          let mouse = req.body.mouseData;
          let click = req.body.clickCoord;
          //write to the database only if the array sent by the front end is non empty
          //loop throught the array items and grab the items necessary to put in the
          //database.
          //keyboard data collection
          getKeyboardData(keyb,db);
          getMouseMovementData(mouse,db);
          getClickData(click,db);
          res.send('data');
      }
      const getKeyboardData =(keyb,db) =>{
      	if(keyb.length > 0){
      		try{
      			for(let i = 0; i < keyb.length; i++){
      				db.insert({
      					key_pressed: keyb[i].key,
      					dwelltime: keyb[i].dwellTime,
      					flighttime: keyb[i].flightTime,
      					user_visit_id: keyb[i].user_id,
      					page_id: keyb[i].page_id
      				}).into('keyboardevents')
      				.then()
      			}
      		}
      		catch(err){
      			console.log(err);
      		}
      	}
      }
      const getMouseMovementData =(mouse,db) =>{
      	if(mouse.length > 0){
      		try{
      			for(let i = 0; i < mouse.length; i++){
      				db.insert({
      					x: mouse[i].x,
      					y: mouse[i].y,
      					height: mouse[i].height,
      					width: mouse[i].width,
      					time_at_point: mouse[i].time,
      					user_visit_id: mouse[i].user_id,
      					page_id: mouse[i].page_id
      				}).into('mouseevents')
      				.then()
      			}
      		}
      		catch(err){
      			console.log(err);
      		}
      	}
      }
      const getClickData = (click, db) =>{
      	if(click.length > 0){
      		try{
      			for(let i = 0; i < click.length; i++){
      				db.insert({
      					x: click[i].x,
      					y: click[i].y,
      					height: click[i].height,
      					width: click[i].width,
      					user_visit_id: click[i].user_id,
      					page_id: click[i].page_id
      				}).into('clickevents')
      				.then()
      			}
      		}
      		catch(err){
      			console.log(err);
      		}
      	}
      }
      module.exports = {
      	handleData : handleData
      }