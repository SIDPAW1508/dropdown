function DataTable({ title, data }) {
  return (
    <div>
      <h2>{title}</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;