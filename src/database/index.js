const mongoose = require('mongoose');

//conectando ao banco de dados chamado aqui de "noderest"
mongoose.connect("mongodb://localhost/noderest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//padrão de todo projeto, não precisa entender
mongoose.Promise = global.Promise;

module.exports = mongoose;