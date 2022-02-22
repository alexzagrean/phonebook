// Packages
import React, { MouseEvent, useEffect, useState } from "react";

//Material
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

// Styles
import styles from "./TableComponent.module.scss";

//Models
import { ButtonProps, Row, Sorting } from "./TableComponent.model";

export const TableComponent = (props: ButtonProps): JSX.Element => {
  const [sorting, setSorting] = useState<Sorting | undefined>();

  useEffect(() => {
    setSorting(props.sorting);
  }, [props.sorting]);

  const handleClickOnRow = (id: string) => {
    props.onClickRow && props.onClickRow(id);
  };

  const handleClickOnHeaderCell = (key: keyof Row | "") => {
    props.onClickHeaderCell && props.onClickHeaderCell(key);
  };

  const handleClickOnCell = (key: keyof Row | "", id: string, event: MouseEvent) => {
    key === "" && event.stopPropagation();
    props.onClickCell && props.onClickCell(key, id);
  };

  return (
    <TableContainer component={Paper} className={styles.wrapper}>
      <Table>
        <TableHead>
          <TableRow>
            {props.config.fields.map((field) => (
              <TableCell onClick={handleClickOnHeaderCell.bind(null, field.name)} key={`headerCell-${field.name}`}>
                {field.label && (
                  <TableSortLabel active={sorting?.field === field.name} direction={sorting?.order}>
                    {field.label}
                    <Box component="span" />
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, rowIndex) => {
            return (
              <TableRow
                hover
                key={rowIndex}
                onClick={handleClickOnRow.bind(null, row.id)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&": { cursor: "pointer" } }}
              >
                {props.config.fields.map((field, fieldIndex) => (
                  <TableCell
                    className={styles.cell}
                    key={`cell-${field.name}`}
                    onClick={handleClickOnCell.bind(null, field.name, row.id)}
                  >
                    {field.name && row[field.name]}
                    {field.renderContent && field.renderContent()}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
