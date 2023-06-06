import { useEffect, useState } from "react";

export function Parent() {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortOrder, setSortOrder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:4000/parents?page=${pageNumber}&sortOrder=${
        sortOrder ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setApiData(result);
      });
  }, [pageNumber, sortOrder]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => setSortOrder((order) => !order)}
            >
              ID
            </th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
          </tr>
        </thead>
        {loading && <div>Loading...</div>}
        {!loading && apiData && apiData.data && (
          <tbody>
            {apiData.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.id}</td>
                <td>{row.sender}</td>
                <td>{row.receiver}</td>
                <td>{row.totalAmount}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    (window.location.href = `/children?parentId=${row.id}`)
                  }
                >
                  {row.totalAmountPaid}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!loading && apiData && apiData.length > 0 && (
        <div className="paginator-container">
          {Array.from(
            Array(Math.ceil(apiData.length / 2)),
            (_, i) => i + 1
          ).map((pageN) => (
            <div
              key={`paginator-page-${pageN}`}
              className={
                pageN === pageNumber ? "active page-number" : "page-number"
              }
              onClick={() => setPageNumber(pageN)}
            >
              {pageN}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Parent;
