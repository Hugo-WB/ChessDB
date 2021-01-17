import { Spinner } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { AdvancedSearch, BasicSearch } from "../pages/types";

interface Props {
  search: BasicSearch | AdvancedSearch;
}


const Results = (props: Props) => {
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [request, setRequest] = useState();
  useEffect(() => {
  }, []);
  return (
    <div>
      {results.length == 0 ? (
        <Spinner />
      ) : (
        results.map((game) => {
          <div>potato</div>;
        })
      )}
    </div>
  );
};

export default Results;
