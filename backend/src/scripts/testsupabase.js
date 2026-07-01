require('dotenv').config()

const supabase = require('../config/supabase')

const test = async () => {
    const { data, error } = await supabase.from('users').select('*')
    console.log(data, error)
}

test()