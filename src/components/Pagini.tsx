import { Pagination } from "@mui/material";
import React, { memo, useCallback } from "react";

interface PaginiProps {
  countPage: number;
  setCurrentPage: (arg0: number) => void;
}

const Pagini = memo((props: PaginiProps) => {
  const { countPage, setCurrentPage } = props;
  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [setCurrentPage]
  );
  return (
    <div>
      <Pagination
        onChange={handleChangePage}
        count={countPage}
        variant="outlined"
        color="primary"
      />
    </div>
  );
});

export default Pagini;
