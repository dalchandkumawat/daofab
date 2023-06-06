const express = require("express");
const app = express();
const port = 4000;

// Load the JSON files
const parentData = require("./data/Parent.json");
const childData = require("./data/Child.json");

// Updating totalAmount from child data kind of preprocessing as it's json data which is static
function updateTotalAmountPaidInParent() {
  parentData.data.forEach((parent) => {
    parent.totalAmountPaid = childData.data
      .filter((child) => child.parentId === parent.id)
      .map((child) => child.paidAmount)
      .reduce((ele, accum) => ele + accum, 0);
  });
}
updateTotalAmountPaidInParent();

app.get("/parents", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const sort = req.query.sort || "id";
  const sortOrder = req.query.sortOrder;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Sort based on order sent in request
  if (sortOrder === "asc") {
    parentData.data.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
  } else {
    parentData.data.sort((a, b) => (a[sort] > b[sort] ? -1 : 1));
  }

  // Slice the data for pagination
  const paginatedData = parentData.data.slice(startIndex, endIndex);
  res.json({ data: paginatedData, length: parentData.data.length });
});

app.get("/children/:parentId", (req, res) => {
  const parentId = parseInt(req.params.parentId);
  const parent = parentData.data.find((item) => item.id === parentId);
  if (parent) {
    let children = childData.data.filter(
      (child) => child.parentId === parentId
    );

    // Dump parent data into child rows sender, receiver
    children = children.map((child) => {
      return {
        ...child,
        sender: parent.sender,
        receiver: parent.receiver,
        totalAmount: parent.totalAmount,
      };
    });

    // Sort the data by ID
    children.sort((a, b) => (a["id"] > b["id"] ? 1 : -1));
    res.json(children);
  } else {
    res.status(404);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
