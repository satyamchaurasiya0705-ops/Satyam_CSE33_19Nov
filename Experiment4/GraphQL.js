const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require("graphql");

const app = express();

// Define Student Type
const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        course: { type: GraphQLString }
    }
});

// Define Query
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        student: {
            type: StudentType,
            resolve() {
                return {
                    name: "Satyam",
                    age: 21,
                    course: "Computer Science"
                };
            }
        }
    }
});

// Create Schema
const schema = new GraphQLSchema({
    query: RootQuery
});

// GraphQL Endpoint
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Start Server
app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
});