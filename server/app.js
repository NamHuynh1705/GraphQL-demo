const express = require("express")
const {ApolloServer} = require("apollo-server-express")
const mongoose = require("mongoose")

// Load schema & resolvers
const typeDefs = require("./schema/schema")
const resolvers = require("./resolver/resolver");

// Load DB methods
const mongoDataMethods = require("../server/data/db")

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://huynhcongnam:troll01299321346@learngraphql.kpbta7j.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected")
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({mongoDataMethods}),
});

const app = express()
server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});