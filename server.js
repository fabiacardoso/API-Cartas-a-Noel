const  app  =  require ( "./src/app" )
 porta  const =  8080

app . escuta ( processo . env . PORT  ||  porta ,  ( )  =>  {
    console . log ( `App rodando na porta $ { port } ` )
} )
