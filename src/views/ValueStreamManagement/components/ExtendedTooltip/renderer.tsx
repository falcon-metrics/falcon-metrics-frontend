export const renderTooltipByElementType = (node) => {
  switch (node.elementType) {
    case "heading-3":
      return (
        <div style={{ paddingBottom: 12 }}>
          <h3>
            {node.content &&
              node.content[0] &&
              node.content[0].value &&
              node.content[0].value.trim()}
          </h3>
        </div>
      );

    case "paragraph":
      return (
        <div style={{ paddingBottom: 8 }}>
          <p>{renderMarks(node.content)}</p>
        </div>
      );

    case "unordered-list":
      return (
        <div style={{ paddingBottom: 8 }}>
          <ul>
            {node.content &&
              node.content.map((item, index) => (
                <li key={index}>{renderTooltipByElementType(item)}</li>
              ))}
          </ul>
        </div>
      );

    case "list-item":
      return (
        <div style={{ paddingBottom: 8 }}>
          {node.content &&
            node.content.map((item, index) => (
              <div key={index}>{renderTooltipByElementType(item)}</div>
            ))}
        </div>
      );

    case "document":
      return (
        node.content &&
        Array.isArray(node.content) &&
        node.content.map((item, index) => (
          <div key={index} style={{ paddingBottom: 8 }}>
            {renderTooltipByElementType(item)}
          </div>
        ))
      );

    case "hyperlink":
      return (
        <div>
          {node.content[0].value}{" "}
          <a
            href={node.content[0].link ?? ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.content && node.content[0] && node.content[0].text}
          </a>
        </div>
      );

    case "table":
      return (
        <table>
          <tbody>
            {node.content &&
              Array.isArray(node.content) &&
              node.content.map((row, index) => (
                <tr key={index}>
                  {row.content &&
                    Array.isArray(row.content) &&
                    row.content.map((cell, cellIndex) => (
                      <td key={cellIndex}>{renderTooltipByElementType(cell)}</td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      );

    case "table-header-cell":
      return (
        node.content &&
        Array.isArray(node.content) &&
        node.content.map((cell, index) => (
          <td key={index}>
            <b>{renderTooltipByElementType(cell)}</b>
          </td>
        ))
      );

    case "table-cell":
      return (
        node.content &&
        Array.isArray(node.content) &&
        node.content.map((cell, index) => (
          <td key={index}>{renderTooltipByElementType(cell)}</td>
        ))
      );

    default:
      return null;
  }
};

const renderMarks = (content) => {
  return content.map((item, index) => {
    if (item.marks && item.marks.some((mark) => mark.type === "bold")) {
      return (
        <span
          key={index}
          style={{ fontWeight: "bold" }}
          className={
            item.marks ? item.marks.map((mark) => mark.type).join(" ") : ""
          }
        >
          {item.value}
        </span>
      );
    } else if (item.marks && item.marks.some((mark) => mark.type === "code")) {
      return (
        <code
          key={index}
          className={item.marks.map((mark) => mark.type).join(" ")}
        >
          {item.value}
        </code>
      );
    } else {
      return (
        <span
          key={index}
          className={
            item.marks ? item.marks.map((mark) => mark.type).join(" ") : ""
          }
        >
          {item.value}
        </span>
      );
    }
  });
};
