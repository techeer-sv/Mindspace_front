import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { CellClickedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ModalWidthAtom, ModalHeightAtom } from '@/recoil/state/resizeAtom';
import { nodeAtom } from '@/recoil/state/nodeAtom';
import { usePostListGetQuery } from '@/hooks/queries/board';

interface PostTableProps {
  OnClickedId: (id: number) => void;
}

function PostTable({ OnClickedId }: PostTableProps) {
  const [rowData, setRowData] = useState([]);
  const selectedNodeInfo = useRecoilValue(nodeAtom);

  const { data: postListData } = usePostListGetQuery(selectedNodeInfo.id);

  useEffect(() => {
    setRowData(postListData);
  }, [postListData, selectedNodeInfo.id]);

  const [columnDefs] = useState([
    { field: 'title' },
    { field: 'userNickname' },
    { field: 'updatedAt' },
  ]);

  const onRowDataClicked = (params: CellClickedEvent) => {
    OnClickedId(params.data.id);
  };

  const modalWidth = useRecoilValue(ModalWidthAtom);
  const modalHeight = useRecoilValue(ModalHeightAtom);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: modalWidth,
        height: modalHeight - 70,
        margin: 'auto auto',
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          minWidth: 100,
          width: 300,
          flex: 1,
        }}
        onCellClicked={onRowDataClicked}
      ></AgGridReact>
    </div>
  );
}

export default PostTable;
