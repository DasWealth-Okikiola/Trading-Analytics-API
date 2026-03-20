const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trading Strategy Analytics API",
      version: "1.0.0",
      description: "API for tracking and analyzing trading performance",
    },
    servers: [
      {
        url: "https://my-jobs-api-8ybm.onrender.com/api-docs",
        description: "Development server",
      },
    ],
    // Added tags for cleaner UI organization
    tags: [
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Trades", description: "Trade management" },
      { name: "Analytics", description: "Performance insights" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;