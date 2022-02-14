// Packages
import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Material
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

//Components
import { DialogComponent } from "../../components/Dialog/DialogComponent";
import { TableComponent } from "../../components/Table/TableComponent";
import { Row, Sorting } from "../../components/Table/TableComponent.model";

//Configs
import { TableConfig } from "./Configs";

//Services
import { ContactsService } from "../../services/ContactsService";

// Styles
import styles from "./Home.module.scss";

const Home: FunctionComponent = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<Row>({
    firstName: "",
    lastName: "",
    company: "",
    phoneNumber: "",
    notes: "",
    id: "",
  });
  const [rows, setRows] = useState<Row[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<Sorting>({
    field: "firstName",
    order: "asc",
  });
  const [companyFilter, setCompanyFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = await ContactsService.getContacts();
      console.log(data);
      if (data) setRows([...data]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRows(
      [...rows].sort((a, b) => {
        if (sorting.order === "asc") {
          return a[sorting.field].localeCompare(b[sorting.field]);
        } else {
          return b[sorting.field].localeCompare(a[sorting.field]);
        }
      })
    );
  }, [sorting]);

  const handleClickOnAddNew = () => {
    setOpen(true);
  };

  const handleChangeOnDialog = (value: string, field: string) => {
    setNewEntry({ ...newEntry, [field]: value });
  };

  const handleDialogClose = (action: "submit" | "cancel") => {
    console.log(newEntry);
    if (action === "submit") {
      if (newEntry.id) {
        let newRows = [...rows];
        let index = newRows.findIndex((element) => element.id === newEntry.id);
        newRows[index] = newEntry;
        setRows(newRows);
      } else setRows([...rows, { ...newEntry, id: rows.length.toString() }]);
    }
    setNewEntry({
      firstName: "",
      lastName: "",
      company: "",
      phoneNumber: "",
      notes: "",
      id: "",
    });
    setOpen(false);
  };

  const handleClickOnEdit = (key: keyof Row | "", id: string) => {
    if (key === "") {
      let row = rows.find((element) => element.id === id);
      if (row) {
        setNewEntry({ ...row });
        setOpen(true);
      }
    }
  };

  const handleChangeOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClickOnHeaderCell = (key: keyof Row | "") => {
    if (key !== "")
      setSorting({
        field: key,
        order: sorting.order === "asc" ? "desc" : "asc",
      });
  };

  const handleClickOnTableRow = (id: string) => {
    console.log(id);
    navigate(`/view-contact/${id}`);
  };

  const handleChangeOnCompanyFilter = (event: SelectChangeEvent<string>) => {
    setCompanyFilter(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <DialogComponent open={open} onClose={handleDialogClose} onChange={handleChangeOnDialog} value={newEntry} />
      <div className={styles["header-wrapper"]}>
        <h1>Contacts</h1>
        <Button variant="contained" onClick={handleClickOnAddNew} className={styles["add-new-button"]}>
          Add new
        </Button>
        <FormControl sx={{ m: 1, minWidth: 180 }} className={styles["company-select"]}>
          <InputLabel id="company-select">Company</InputLabel>
          <Select
            labelId="company-select"
            id="demo-simple-select-autowidth"
            value={companyFilter}
            onChange={handleChangeOnCompanyFilter}
            label="Company"
          >
            <MenuItem value={""}>All</MenuItem>
            {rows
              .filter((element, index) => rows.findIndex((el) => el.company === element.company) === index)
              .map((element) => (
                <MenuItem value={element.company} key={element.company}>
                  {element.company}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Search Contact"
          variant="outlined"
          className={styles["input"]}
          onChange={handleChangeOnSearch}
          type="search"
          value={searchValue}
        />
      </div>
      <TableComponent
        rows={rows.filter(
          (element) =>
            `${element.firstName} ${element.lastName}`.toLowerCase().includes(searchValue.toLowerCase()) &&
            (companyFilter === "" || element.company === companyFilter)
        )}
        onClickCell={handleClickOnEdit}
        onClickHeaderCell={handleClickOnHeaderCell}
        onClickRow={handleClickOnTableRow}
        sorting={sorting}
        config={TableConfig}
      />
    </div>
  );
};

export default Home;
