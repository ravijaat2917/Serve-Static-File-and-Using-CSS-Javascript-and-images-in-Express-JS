import express from 'express';
import {join} from 'path';
import web from './routes/web.js';
const app = express();

// Static files
app.use(express.static(join(process.cwd() ,'public')));
app.use('/css' , express.static(join(process.cwd(),'public/css'))); // if we want to import css folder only.

// Load routes
app.use('/',web);

// Use dot-file placed in public folder
const options = {
    dotfiles:'ignore', //allow , deny
    etag:false,
    extensions:['html','htm'],
    index:false,
    maxAge:'1d',
    redirect:false,
    setHeaders : function(res,path,stat){
        res.set('x-timestamp' , Date.now())
    }
}
app.use(express.static(join(process.cwd(),'public'), options));


app.listen(3000 , ()=>{
    console.log(`App is listening on port ${3000}`);
});