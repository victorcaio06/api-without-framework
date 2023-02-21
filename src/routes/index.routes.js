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

  return executeRouter.controller(request, response);
};

module.exports = handler;
