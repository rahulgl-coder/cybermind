
const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

router.post('/addjob', async (req, res) => {
  const  jobData  = req.body
  // console.log(req.body);
  
  const { data, error } = await supabase.from('jobs').insert(jobData)
   console.log(error);
  if (error) return res.status(400).json({ error })
   
    
  res.json({ data })
})


router.get('/getjobs', async (req, res) => {
  const { data, error } = await supabase.from('jobs').select('*');

  if (error) return res.status(400).json({ error });
  res.json({ data });
});

module.exports = router
