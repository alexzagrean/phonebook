// Packages
import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Material
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//Components
import { DialogComponent } from "../../components/Dialog/DialogComponent";
import { TableComponent } from "../../components/Table/TableComponent";
import { Row, Sorting } from "../../components/Table/TableComponent.model";
import Search from "@mui/icons-material/Search";

//Configs
import { TableConfig } from "./Configs";

//Services
import { ContactsService } from "../../services/ContactsService";

// Styles
import styles from "./Home.module.scss";

const Home: FunctionComponent = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<Row>({
    company: "",
    firstName: "",
    id: "",
    lastName: "",
    notes: "",
    phoneNumber: "",
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

  const handleDialogClose = async (action: "submit" | "cancel", value?: any) => {
    if (action === "submit") {
      if (value.id) {
        await ContactsService.modifyContact(value);
        let newRows = [...rows];
        let index = newRows.findIndex((element) => element.id === value.id);
        newRows[index] = value;
        setRows(newRows);
      } else {
        await ContactsService.createContact(value);
        setRows([...rows, { ...value, id: (rows.length + 1).toString() }]);
      }
    }
    setNewEntry({
      company: "",
      firstName: "",
      id: "",
      lastName: "",
      notes: "",
      phoneNumber: "",
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
    navigate(`/view-contact/${id}`);
  };

  const handleChangeOnCompanyFilter = (event: SelectChangeEvent<string>) => {
    setCompanyFilter(event.target.value);
  };

  const handleClickOnClearAll = () => {
    setCompanyFilter("");
    setSearchValue("");
  };

  const filteredRows = rows.filter(
    (element) =>
      `${element.firstName} ${element.lastName}`.toLowerCase().includes(searchValue.toLowerCase()) &&
      (companyFilter === "" || element.company === companyFilter)
  );

  return (
    <div className={styles.wrapper}>
      <DialogComponent open={open} onClose={handleDialogClose} onChange={handleChangeOnDialog} value={newEntry} />
      <div className={styles["header-wrapper"]}>
        <h1>Contacts</h1>
        <Button variant="contained" onClick={handleClickOnAddNew} className={styles["add-new-button"]}>
          Add new
        </Button>
        <IconButton className={styles["plus-button"]}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
        <div className={styles["filters-wrapper"]}>
          <p>Filter by:</p>
          <FormControl sx={{ m: 1, minWidth: 180 }} className={styles["company-select"]}>
            <InputLabel id="company-select">Company</InputLabel>
            <Select
              id="demo-simple-select-autowidth"
              label="Company"
              labelId="company-select"
              onChange={handleChangeOnCompanyFilter}
              value={companyFilter}
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
          <FormControl variant="outlined" className={styles["input"]}>
            <InputLabel htmlFor="search-input">Search Contact</InputLabel>
            <OutlinedInput
              id="search-input"
              label="Search Contact"
              onChange={handleChangeOnSearch}
              value={searchValue}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <p className={styles["clear-all"]} onClick={handleClickOnClearAll}>
            Clear all
          </p>
        </div>
      </div>
      {filteredRows.length > 0 ? (
        <TableComponent
          config={TableConfig}
          onClickCell={handleClickOnEdit}
          onClickHeaderCell={handleClickOnHeaderCell}
          onClickRow={handleClickOnTableRow}
          rows={filteredRows}
          sorting={sorting}
        />
      ) : searchValue ? (
        <div className={styles["no-results"]}>No results found for "{searchValue}"</div>
      ) : (
        <div className={styles["no-results"]}>No contacts found</div>
      )}
    </div>
  );
};

export default Home;
