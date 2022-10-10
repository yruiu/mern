const express=require('express');
const config=require('config');
const path=require('path')
const moongoose=require('mongoose')
const app=express();
const PORT=config.get('port') || 5010;
const routs=require('./routes/auth.routes')
const link=require('./routes/link.routes')
app.use(express.json({extended: true}))
app.use('/api/auth',routs );
app.use('/api/link',link );
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV==="production"){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start(){
    try {
        await moongoose.connect(config.get('moongourl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, ()=> console.log(`App has been started on port ${PORT}...`))
    } catch (e){}
}
start();
