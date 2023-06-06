import { useEffect, useState } from "react";
export function Child() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(document.location.search);
    fetch(`http://localhost:4000/children/${params.get("parentId")}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setApiData(result);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        {loading && <div>Loading...</div>}
        {!loading && apiData && apiData.length === 0 && (
          <div>No Data to show</div>
        )}
        {!loading && apiData && (
          <tbody>
            {apiData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.id}</td>
                <td>{row.sender}</td>
                <td>{row.receiver}</td>
                <td>{row.totalAmount}</td>
                <td>{row.paidAmount}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
export default Child;
