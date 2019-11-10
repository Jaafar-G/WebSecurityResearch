const handleUrl = (req,res,db) =>{
          db.insert({
                  page_url: req.body.urlInfo,
                  user_visit_id: req.body.visitID,
          })
          .returning('id')
          .into('pageurl')
          .then((id) => {
                          res.json(id);
                  }
          ).catch(err => res.status(400).json('unable to write'))  
}
module.exports = {
          handleUrl: handleUrl
}