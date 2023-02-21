const router = require("./user.routes");

const handler = (request, response) => {
  const method = request.method;
  const url = request.url;

  const urlSplit = url.split("/").filter(Boolean);

  const resultRoute = router.filter((item) => {
    return (
      item.method.toLowerCase() === method.toLowerCase() &&
      item.url.toLowerCase().startsWith(`/${urlSplit[0].toLowerCase()}`)
    );
  });

  const executeRouter = resultRoute.find((item) => {
    const routerUrlSplit = item.url.split("/").filter(Boolean);

    return urlSplit.length === routerUrlSplit.length;
  });

  if (!executeRouter) {
    response.statusCode = 404;

    return response.end(
      JSON.stringify({
        message: "Not found!",
      })
    );
  }

  const routerSplitUtl = executeRouter.url.split("/").filter(Boolean);

  const objectParams = {};

  routerSplitUtl.forEach((item, index) => {
    if (item.startsWith(":")) {
      const formatField = item.replace(":", "");

      objectParams[formatField] = urlSplit[index];
    }
  });

  request
    .on("data", (data) => {
      const body = JSON.parse(data);
      
      request.body = body;
    })
    .on("end", () => {
      request.params = objectParams;

      return executeRouter.controller(request, response);
    });
};

module.exports = handler;
