import { Link } from "remix";
import React, { useState } from "react";

function Demo() {
  const [value, setValue] = useState("");
  return (
    <>
      <input onChange={(e) => setValue(e.target.value)} value={value} />
      <Link to={`/tracking/${value}`}>
        <button>Hi demo</button>
      </Link>
    </>
  );
}

export default Demo;
